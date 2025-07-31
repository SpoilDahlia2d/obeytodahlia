from flask import Flask, render_template, jsonify
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/images')
def images():
    img_folder = os.path.join(app.static_folder, 'images')
    files = os.listdir(img_folder)
    images = [f for f in files if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))]
    return jsonify(images)

if __name__ == '__main__':
    app.run(debug=True)
