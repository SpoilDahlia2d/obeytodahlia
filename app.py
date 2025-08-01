from flask import Flask, render_template, send_from_directory, jsonify
import os

app = Flask(__name__, static_folder='static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/images')
def images():
    image_folder = os.path.join(app.static_folder, 'images')
    images = [f for f in os.listdir(image_folder) if f.endswith('.png')]
    return jsonify(images)

if __name__ == '__main__':
    app.run(debug=True)
