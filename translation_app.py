from flask import Flask, request, jsonify
import torch
from transformers import AutoModelForSeq2SeqLM, BitsAndBytesConfig
from transformers import AutoModelForCausalLM, AutoTokenizer
from IndicTransTokenizer import IndicProcessor, IndicTransTokenizer
from functools import lru_cache
import os

app = Flask(__name__)

BATCH_SIZE = 4
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
quantization = None

tokenizer_chatbot = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model_chatbot = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")
# Function for getting chatbot response
def get_Chat_response(text):

    # Let's chat for 5 lines 
    for step in range(5) :
        # encode the new user input, add the eos_token and return a tensor in Pytorch
        new_user_input_ids = tokenizer_chatbot.encode(str(text) + tokenizer_chatbot.eos_token, return_tensors='pt')

        # append the new user input tokens to the chat history
        bot_input_ids = torch.cat([chat_history_ids, new_user_input_ids], dim=-1) if step > 0 else new_user_input_ids

        # generated a response while limiting the total chat history to 1000 tokens, 
        chat_history_ids = model_chatbot.generate(bot_input_ids, max_length=1000, pad_token_id=tokenizer_chatbot.eos_token_id)

        # pretty print last ouput tokens from bot
        return tokenizer_chatbot.decode(chat_history_ids[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True)
    
# Function to initialize the translation model and tokenizer
def initialize_model_and_tokenizer(ckpt_dir, direction, quantization):
    if quantization == "4-bit":
        qconfig = BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_use_double_quant=True,
            bnb_4bit_compute_dtype=torch.bfloat16,
        )
    elif quantization == "8-bit":
        qconfig = BitsAndBytesConfig(
            load_in_8bit=True,
            bnb_8bit_use_double_quant=True,
            bnb_8bit_compute_dtype=torch.bfloat16,
        )
    else:
        qconfig = None

    tokenizer = IndicTransTokenizer(direction=direction)
    model = AutoModelForSeq2SeqLM.from_pretrained(
        ckpt_dir,
        trust_remote_code=True,
        low_cpu_mem_usage=True,
        quantization_config=qconfig,
    )

    if qconfig == None:
        model = model.to(DEVICE)
        if DEVICE == "cuda":
            model.half()

    model.eval()

    return tokenizer, model

# Function for batch translation
def batch_translate(input_sentences, src_lang, tgt_lang, model, tokenizer, ip):
    translations = []
    for i in range(0, len(input_sentences), BATCH_SIZE):
        batch = input_sentences[i : i + BATCH_SIZE]

        # Preprocess the batch and extract entity mappings
        batch = ip.preprocess_batch(batch, src_lang=src_lang, tgt_lang=tgt_lang)

        # Tokenize the batch and generate input encodings
        inputs = tokenizer(
            batch,
            src=True,
            truncation=True,
            padding="longest",
            return_tensors="pt",
            return_attention_mask=True,
        ).to(DEVICE)

        # Generate translations using the model
        with torch.no_grad():
            generated_tokens = model.generate(
                **inputs,
                use_cache=True,
                min_length=0,
                max_length=256,
                num_beams=5,
                num_return_sequences=1,
            )

        # Decode the generated tokens into text
        generated_tokens = tokenizer.batch_decode(generated_tokens.detach().cpu().tolist(), src=False)

        # Postprocess the translations, including entity replacement
        translations += ip.postprocess_batch(generated_tokens, lang=tgt_lang)

        del inputs
        torch.cuda.empty_cache()

    return translations

# Function model to detect language
os.chdir('./Notebooks/IndicLID/Inference')
print(os.getcwd())
from Notebooks.IndicLID.Inference.ai4bharat.IndicLID import IndicLID
IndicLID_model = IndicLID(input_threshold = 0.5, roman_lid_threshold = 0.6)
os.chdir('../../../')

# Initialize translation models for both directions
en_indic_ckpt_dir = "ai4bharat/indictrans2-en-indic-1B"
en_indic_tokenizer, en_indic_model = initialize_model_and_tokenizer(en_indic_ckpt_dir, "en-indic", quantization)

indic_en_ckpt_dir = "ai4bharat/indictrans2-indic-en-1B"
indic_en_tokenizer, indic_en_model = initialize_model_and_tokenizer(indic_en_ckpt_dir, "indic-en", "")

# @lru_cache(maxsize=128)
@app.route('/', methods=['GET'])
def home():
    return "Welcome to the translation app!"

# Route for Indic to English translation
@app.route('/translate/indic-to-english', methods=['POST'])
def indic_to_english_translation():
    data = request.json
    input_sentences = data.get('sentences', [])
    ip = IndicProcessor(inference=True)
    translations = batch_translate(input_sentences, "hin_Deva", "eng_Latn",indic_en_model, indic_en_tokenizer, ip)

    return jsonify({'translations': translations})

# Route for English to Indic translation
@app.route('/translate/english-to-indic', methods=['POST'])
def english_to_indic_translation():
    data = request.json
    input_sentences = data.get('sentences', [])
    ip = IndicProcessor(inference=True)
    translations = batch_translate(input_sentences, "eng_Latn", "hin_Deva",en_indic_model, en_indic_tokenizer, ip)

    return jsonify({'translations': translations})

# Route for chatbots response
@app.route('/chatbot', methods=['POST'])
def chatbotResponse():
    data = request.json
    input_msg = data.get('msg','')
    bot_reply = get_Chat_response(input_msg)
    return jsonify({'reply': bot_reply})

# Route for language detection
@app.route('/detect-language', methods=['POST'])
def detectLang():
    data = request.json
    input_text = data.get('text','')
    detected_lang = IndicLID_model.batch_predict([input_text], 1)[0][1]
    return jsonify({'lang': detected_lang})

# @lru_cache(maxsize=128)  # Set an appropriate cache size
# def translate_english_to_indic(sentences):
#     ip = IndicProcessor(inference=True)
#     translations = batch_translate(sentences, "eng_Latn", "hin_Deva", en_indic_model, en_indic_tokenizer, ip)
#     return translations

# @app.route('/translate/english-to-indic', methods=['POST'])
# def english_to_indic_translation():
#     data = request.json
#     input_sentences = data.get('sentences', [])

#     # Use the cached translation function
#     translations = translate_english_to_indic(tuple(input_sentences))

#     return jsonify({'translations': translations})



if __name__ == '__main__':
    app.run(port=3001)  # You can specify any port you prefer
