from flask import Flask, request, jsonify, send_from_directory
from fuzzywuzzy import process
import pandas as pd 
#imports

app = Flask(__name__)

# uploading the HAF csv file
df = pd.read_csv('HAF.csv')
choices = df.columns.tolist() #turn the colums into a python list

@app.route('/plsWork', methods=['POST']) #define route for fetch
def search(): #gather JSON string and pass into x
    data = request.get_json()
    x = data.get('query', '')
    results_arr = process.extract(x, choices, limit=3) #results is a list of tuples ex. [('hi', 92), ('no', 66)]
    arr = [word[0] for word in results_arr] 
    return jsonify({'suggestions': arr})

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run()
