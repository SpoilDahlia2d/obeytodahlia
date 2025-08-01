from flask import Flask, render_template, send_from_directory, jsonify
import os
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/images')
def get_images():
    image_dir = os.path.join(app.static_folder, 'images')
    all_images = [
        f'/static/images/{f}' for f in os.listdir(image_dir)
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))
    ]
    random.shuffle(all_images)
    return jsonify(all_images)

if __name__ == '__main__':
    app.run(debug=False)
