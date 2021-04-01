
from keras.models import load_model
from keras.preprocessing.text import Tokenizer
from keras.models import model_from_json
import numpy as np
import tensorflow as tf
import os
import random
import string
from api.Model import Model

class TextGenerator:

    def __init__(self):
        self.model_manager = ModelManager()

    def generate_more_text(self, lang):
        self.current_model = self.model_manager.models[lang]
        return self.complete_text(n_chars=100)

    def preprocess(self, texts):
        X = np.array(self.current_model.tokenizer.texts_to_sequences(texts)) - 1
        return tf.one_hot(X, self.current_model.max_id)
    
    def next_char(self, text, temperature=1):
        X_new = self.preprocess([text])
        y_proba = self.current_model.model.predict(X_new)[0, -1:, :]
        rescaled_logits = tf.math.log(y_proba) / temperature
        char_id = tf.random.categorical(rescaled_logits, num_samples=1) + 1
        return self.current_model.tokenizer.sequences_to_texts(char_id.numpy())[0]

    def complete_text(self, n_chars=150, temperature=1):
        input_text = random.choice(string.ascii_letters)
        text = ""
        for i in range(n_chars):
            text += self.next_char(input_text if len(text) == 0 else text, temperature)
        return text

    

