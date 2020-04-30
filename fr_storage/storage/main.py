import os
from flask import Flask, jsonify, request, send_from_directory

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
uploadFolder = 'images'

app = Flask(__name__)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def saveFile(file):
    result = { 
        "result": {
            "status": False
        }
    }

    file.save(os.path.join(app.root_path, uploadFolder, file.filename))

    result['result']['status'] = True

    return jsonify(result)

def loadFile(fileName):
    result = { 
        "result": {
            "status": False,
            "image": None
        }
    }

    result['result']['image'] = send_from_directory(os.path.join(app.root_path, uploadFolder), fileName)

    result['result']['status'] = True

    return jsonify(result)

def returnNull():
    result = {
        "result": 'null'
    }
    return jsonify(result)

@app.route('/save', methods=['POST'])
def save():
    if 'file' not in request.files:
        return returnNull()
    
    file = request.files['file']

    if file.filename == '':
        return returnNull()

    if file and allowed_file(file.filename):
        return saveFile(file)

    return returnNull()

@app.route('/load/<fileName>', methods=['GET'])
def load(fileName):
    if len(fileName) > 0:
        return loadFile(fileName)

    return returnNull()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5005, debug=True)
