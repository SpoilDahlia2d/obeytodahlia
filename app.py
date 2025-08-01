from flask import Flask, render_template, jsonify
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/images')
def get_images():
    image_folder = 'static/images'
    files = [f'/static/images/{file}' for file in os.listdir(image_folder) if file.endswith('.png')]
    return jsonify(files)

if __name__ == '__main__':
    app.run(debug=True)
