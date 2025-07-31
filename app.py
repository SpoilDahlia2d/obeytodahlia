from flask import Flask, render_template, jsonify
import os

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/images")
def get_images():
    image_folder = os.path.join("static", "images")
    extensions = (".png", ".jpg", ".jpeg", ".webp")
    images = [f for f in os.listdir(image_folder) if f.lower().endswith(extensions)]
    return jsonify(images)

if __name__ == "__main__":
    app.run(debug=True)
