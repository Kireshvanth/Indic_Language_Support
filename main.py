from Notebooks.IndicLID.Inference.ai4bharat.IndicLID import IndicLID
from flask import Flask, request, jsonify,redirect, url_for
from flask_cors import CORS, cross_origin
import torch
from transformers import AutoModelForSeq2SeqLM, BitsAndBytesConfig
from transformers import AutoModelForCausalLM, AutoTokenizer
from IndicTransTokenizer import IndicProcessor, IndicTransTokenizer
from functools import lru_cache
import os
import easyocr
import assemblyai as aai
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/*": {"origins": "*"}})

BATCH_SIZE = 4
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
quantization = None

tokenizer_chatbot = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model_chatbot = AutoModelForCausalLM.from_pretrained(
    "microsoft/DialoGPT-medium")
# Function for getting chatbot response

def get_Chat_response(text):

    # Let's chat for 5 lines
    for step in range(5):
        # encode the new user input, add the eos_token and return a tensor in Pytorch
        new_user_input_ids = tokenizer_chatbot.encode(
            str(text) + tokenizer_chatbot.eos_token, return_tensors='pt')

        # append the new user input tokens to the chat history
        bot_input_ids = torch.cat(
            [chat_history_ids, new_user_input_ids], dim=-1) if step > 0 else new_user_input_ids

        # generated a response while limiting the total chat history to 1000 tokens,
        chat_history_ids = model_chatbot.generate(
            bot_input_ids, max_length=1000, pad_token_id=tokenizer_chatbot.eos_token_id)

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
        batch = input_sentences[i: i + BATCH_SIZE]

        # Preprocess the batch and extract entity mappings
        batch = ip.preprocess_batch(
            batch, src_lang=src_lang, tgt_lang=tgt_lang)

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
        generated_tokens = tokenizer.batch_decode(
            generated_tokens.detach().cpu().tolist(), src=False)

        # Postprocess the translations, including entity replacement
        translations += ip.postprocess_batch(generated_tokens, lang=tgt_lang)

        del inputs
        torch.cuda.empty_cache()

    return translations

## Function to extract text from image (OCR)
@app.route('/extract_text', methods=['POST'])
def extract_text():
    print(request)
    print(request.files)
    
    if 'file' not in request.files:
        ## this is to redirect if file is not found
        return jsonify({'resp': "File not found"})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'resp': "File not defined"})

    # Save the uploaded image
    image_path = 'uploads/uploaded_image.jpg'
    file.save(image_path)
    
    print(f"Image path: {image_path}")  # Add this line for debugging
    # Perform OCR on the uploaded image
    

    try:
        # Initialize the OCR reader
        reader = easyocr.Reader(['en'])
        
        # Perform OCR
        result = reader.readtext(image_path)
        # Extract text from OCR result
        extracted_text = ' '.join([entry[1] for entry in result])
        print("Text content from OCR :",extracted_text)

        return jsonify({'resp': extracted_text})
    except Exception as e:
        return jsonify({'resp': f"Error performing OCR: {str(e)}"})

## Function to extract text from audio :
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'wav', 'flac', 'mp3'}

@app.route('/getVoiceContent', methods=['POST'])
def getVoiceContents():
    if 'file' not in request.files:
        return jsonify({'resp': "File not found"})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'resp': "File not defined"})
    # Check if the file has an allowed extension
    if file and allowed_file(file.filename):
        # Save the file
        filename = secure_filename(file.filename)
        file.save(filename)
        print(filename)

        try:
            aai.settings.api_key = "84c9af3b84754f81ad3190a16dabdc14"
            transcriber = aai.Transcriber()

            transcript = transcriber.transcribe(filename)

            print(transcript.text)

            return jsonify({'resp': transcript.text})
        except Exception as e:
            return jsonify({'resp': f"Error performing Text extraction from audio: {str(e)}"})
    else:
        return jsonify({'resp': 'File format not supported'})

# Function model to detect language
os.chdir('./Notebooks/IndicLID/Inference')
print(os.getcwd())
IndicLID_model = IndicLID(input_threshold=0.5, roman_lid_threshold=0.6)
os.chdir('../../../')

# Initialize translation models for both directions
en_indic_ckpt_dir = "ai4bharat/indictrans2-en-indic-1B"
en_indic_tokenizer, en_indic_model = initialize_model_and_tokenizer(
    en_indic_ckpt_dir, "en-indic", quantization)

indic_en_ckpt_dir = "ai4bharat/indictrans2-indic-en-1B"
indic_en_tokenizer, indic_en_model = initialize_model_and_tokenizer(
    indic_en_ckpt_dir, "indic-en", "")

# @lru_cache(maxsize=128)


@app.route('/', methods=['GET'])
@cross_origin()
def home():
    return "Welcome to the translation app!"

# Route for Indic to English translation


@app.route('/translate/indic-to-english', methods=['POST'])
@cross_origin()
def indic_to_english_translation():
    data = request.json
    input_sentences = data.get('sentences', [])
    src_lang = data.get('src_lang', 'hin_Deva')
    ip = IndicProcessor(inference=True)
    translations = batch_translate(
        input_sentences, src_lang, "eng_Latn", indic_en_model, indic_en_tokenizer, ip)

    return jsonify({'translations': translations})

# Route for English to Indic translation


@app.route('/translate/english-to-indic', methods=['POST'])
@cross_origin()
def english_to_indic_translation():
    data = request.json
    input_sentences = data.get('sentences', [])
    tgt_lang = data.get('tgt_lang', 'hin_Deva')
    ip = IndicProcessor(inference=True)
    translations = batch_translate(
        input_sentences, "eng_Latn", tgt_lang, en_indic_model, en_indic_tokenizer, ip)
    return jsonify({'translations': translations})

# Route for chatbots response


@app.route('/chatbot', methods=['POST'])
@cross_origin()
def chatbotResponse():
    data = request.json
    input_msg = data.get('msg', '')
    bot_reply = get_Chat_response(input_msg)
    return jsonify({'reply': bot_reply})

# Route for language detection


@app.route('/detect-language', methods=['POST'])
@cross_origin()
def detectLang():
    data = request.json
    input_text = data.get('text', '')
    detected_lang = IndicLID_model.batch_predict([input_text], 1)[0][1]
    if detected_lang =='tam_Tamil':
        detected_lang = 'tam_Taml'
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
