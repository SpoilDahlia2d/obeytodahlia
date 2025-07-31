from flask import Flask, render_template, send_from_directory
import os
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/images')
def get_images():
    image_folder = 'images'
    valid_extensions = ('.png', '.jpg', '.jpeg', '.gif')
    files = [f for f in os.listdir(image_folder) if f.lower().endswith(valid_extensions)]
    random.shuffle(files)
    return {'images': files}

@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory('images', filename)

if __name__ == '__main__':
    app.run(debug=True)
