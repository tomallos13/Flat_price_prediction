from flask import Flask, request, jsonify, render_template, url_for
import util
import os


template_dir = os.path.abspath('../client/')
app = Flask(__name__, template_folder=template_dir, static_url_path='', static_folder='../client/static')


@app.route('/')
def home():
    print('here')
    return render_template('app.html')

@app.route('/get_street_names')
def get_street_names():
    response = jsonify({
        'street': util.get_street_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    sqr = float(request.form['sqr'])
    street = request.form['street']
    rooms = float(request.form['rooms'])
    floor = float(request.form['floor'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(street,sqr,rooms,floor)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/favicon.ico') 
def favicon():
    return url_for('static', filename='data:,')


if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run(debug=True)
    