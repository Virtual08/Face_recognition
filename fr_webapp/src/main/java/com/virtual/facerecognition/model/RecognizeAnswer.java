package com.virtual.facerecognition.model;

public class RecognizeAnswer {
    private boolean faceIsFoundInImage;

    private Integer personId;

    public boolean getIsFaceIsFoundInImage() {
        return faceIsFoundInImage;
    }

    public void setFaceIsFoundInImage(boolean faceIsFoundInImage) {
        this.faceIsFoundInImage = faceIsFoundInImage;
    }

    public Integer getPersonId() {
        return personId;
    }

    public void setPersonId(Integer personId) {
        this.personId = personId;
    }
}
