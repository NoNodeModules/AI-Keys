from flask_restful import Api, Resource, reqparse
import os
from api.TextBank import TextBank

text_bank = TextBank()

class ApiHandler(Resource):

  def __init__(self):
    print("initialising api handler")
    self.text_generator = text_bank

  def get(self, lang):
    text = self.text_generator.get_text(lang)

    return {
      'resultStatus': 'SUCCESS',
      'message': text
      }

  def post(self, lang):
    print(self)
    parser = reqparse.RequestParser()
    parser.add_argument('type', type=str)
    parser.add_argument('message', type=str)

    args = parser.parse_args()

    print(args)

    request_type = args['type']
    request_json = args['message']
    ret_status = request_type
    ret_msg = request_json

    if ret_msg:
      message = "Your Message Requested: {}".format(ret_msg)
    else:
      message = "No Msg"
    
    final_ret = {"status": "Success", "message": message}

    return final_ret