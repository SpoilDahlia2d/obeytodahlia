from flask import Flask, render_template, send_from_directory, jsonify
import os
import random

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/images")
def get_images():
    folder = os.path.join(app.static_folder, "images")
    files = [f"/static/images/{f}" for f in os.listdir(folder) if f.lower().endswith(".png")]
    random.shuffle(files)
    return jsonify(files)

@app.route("/static/images/<path:filename>")
def custom_static(filename):
    return send_from_directory("static/images", filename)

if __name__ == "__main__":
    app.run(debug=True)
