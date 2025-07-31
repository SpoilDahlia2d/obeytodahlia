 from flask import Flask, render_template, send_from_directory
import os
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/images')
def images():
    folder = os.path.join(app.static_folder, 'images')
    files = [f for f in os.listdir(folder) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
    random.shuffle(files)
    return {'images': files}

@app.route('/static/images/<filename>')
def serve_image(filename):
    return send_from_directory(os.path.join(app.static_folder, 'images'), filename)

if __name__ == '__main__':
    app.run(debug=True)
