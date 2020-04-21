import face_recognition
import numpy as np
import json
from flask import Flask, jsonify, request


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


app = Flask(__name__)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def getRecognitionResult(file_stream, faces):
    face_found = False

    unknown_face_encodings = getFaceEncoding(file_stream)

    if len(unknown_face_encodings) == 0:
        result = { 
            "result": {
                "faceIsFoundInImage": face_found,
                "personId": "null"
            }
        }
        return result

    face_found = True

    known_face_encodings = [json.loads(face["embedding"]) for face in faces]

    ### I can write 'for' and return all recognized people

    face_distances = face_recognition.face_distance(known_face_encodings, unknown_face_encodings[0])

    if np.min(face_distances) > 0.6: ### Just 0.6. Without some kind logic. I think it's better to use face_compare
        result = { 
            "result": {
                "faceIsFoundInImage": face_found,
                "personId": "null"
            }
        }
        return result

    bestMatchIndex = np.argmin(face_distances)
    personId = faces[bestMatchIndex]["personId"]

    result = { 
        "result": {
            "faceIsFoundInImage": face_found,
            "personId": personId
        }
    }
    return jsonify(result)

def getFaceEncoding(file_stream):
    img = face_recognition.load_image_file(file_stream)
    return face_recognition.face_encodings(img)

def returnNull():
    result = {
        "result": 'null'
    }

    return jsonify(result)

def getEmbedding(file_stream):
    unknown_face_encodings = getFaceEncoding(file_stream)

    if len(unknown_face_encodings) == 0:
        result = { 
            "result": {
                "faceIsFoundInImage": False,
                "faceEmbedding": 'null'
            }
        }
        return jsonify(result)

    if len(unknown_face_encodings) > 1: ### TODO Answer is incorrect
        result = { 
            "result": {
                "faceIsFoundInImage": False,
                "faceEmbedding": 'null'
            }
        }
        return jsonify(result)

    result = { 
        "result": {
            "faceIsFoundInImage": True,
            "faceEmbedding": unknown_face_encodings[0].tolist()
        }
    }

    return jsonify(result)


@app.route('/recognize', methods=['POST'])
def recognize():
    if 'file' not in request.files:
        return returnNull()

    file = request.files['file']

    if file.filename == '':
        return returnNull()

    faces = json.loads(request.values['faces'])
    # app.logger.info(faces)

    if len(faces) == 0:
        return returnNull()

    if file and allowed_file(file.filename):
        return getRecognitionResult(file, faces)

    return request

@app.route('/getEmbedding', methods=['POST'])
def formEmbedding():
    if 'file' not in request.files:
        return returnNull()
    
    file = request.files['file']

    if file.filename == '':
        return returnNull()

    if file and allowed_file(file.filename):
        return getEmbedding(file)

    return request

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)