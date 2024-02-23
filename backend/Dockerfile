# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Install Git
RUN apt-get update && \
    apt-get install -y git wget unzip build-essential && \
    rm -rf /var/lib/apt/lists/*

RUN pip install setuptools

ENV CXXFLAGS="-std=c++11"

# Move back to the working directory
WORKDIR /app

# Install additional dependencies
RUN pip install fasttext transformers

# Clone IndicLID repository
RUN git clone https://github.com/AI4Bharat/IndicLID.git
WORKDIR /app/IndicLID/Inference

# Create a directory for models
RUN mkdir models
WORKDIR /app/IndicLID/Inference/models

# Download and unzip indiclid-bert.zip
RUN wget https://github.com/AI4Bharat/IndicLID/releases/download/v1.0/indiclid-bert.zip && unzip indiclid-bert.zip

# Download and unzip indiclid-ftn.zip
RUN wget https://github.com/AI4Bharat/IndicLID/releases/download/v1.0/indiclid-ftn.zip && unzip indiclid-ftn.zip

# Download and unzip indiclid-ftr.zip
RUN wget https://github.com/AI4Bharat/IndicLID/releases/download/v1.0/indiclid-ftr.zip && unzip indiclid-ftr.zip

# Set the working directory to /app
WORKDIR /app

# Clone IndicTrans2 repository
RUN git clone https://github.com/AI4Bharat/IndicTrans2.git
WORKDIR /app/IndicTrans2/huggingface_interface

# Install dependencies
RUN pip install nltk sacremoses pandas regex mock 'transformers>=4.33.2' mosestokenizer
RUN python3 -c "import nltk; nltk.download('punkt')"
RUN pip install bitsandbytes scipy accelerate datasets
RUN pip install sentencepiece

# Clone IndicTransTokenizer repository
RUN git clone https://github.com/VarunGumma/IndicTransTokenizer
WORKDIR /app/IndicTrans2/huggingface_interface/IndicTransTokenizer

# Install IndicTransTokenizer
RUN pip install --editable ./

# Move back to the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

#print pip version
RUN echo "Pip version:" && pip --version

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt --use-deprecated=legacy-resolver

# Set the environment variable for Flask
ENV FLASK_APP=app.py

# Expose the port the app runs on
EXPOSE 5000

# Run app.py when the container launches
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app
