from api.TextGenerator import TextGenerator

class TextBank: 

    models = {
       "python" : [],
        "swift": [], 
    }

    def __init__ (self):
        self.text_generator = TextGenerator()
        for key in self.models.keys(): 
            self.models[key].append(self.text_generator.generate_more_text(key))

    def get_text(self, lang):
        # To be replaced with async call
        self.models[lang].append(self.text_generator.generate_more_text(lang))
        return self.models[lang].pop()
