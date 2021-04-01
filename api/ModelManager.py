from api.Model import Model

class ModelManager: 

    models = {
        "python" : Model(model="model", max_id="max_id", tokenizer="tokenizer"),
        "swift": Model(model="model", max_id="max_id", tokenizer="tokenizer"),
    }

    def __init__(self):
        print("intialising text generator")
        model_fetcher = ModelFetcher()
        for key in self.models.keys(): 
            tokenizer = model_fetcher.getTokenizer(key)
            model = model_fetcher.getModel(key)
            max_id = len(tokenizer.word_index)
            self.models[key] = Model(model=model, max_id=max_id, tokenizer=tokenizer)
