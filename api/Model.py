
class Model:

    def __init__(self, model, max_id, tokenizer):
        self.tokenizer = tokenizer
        self.model = model
        self.max_id = max_id