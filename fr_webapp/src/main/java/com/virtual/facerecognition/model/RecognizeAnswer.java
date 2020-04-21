package com.virtual.facerecognition.model;

import com.virtual.facerecognition.db.model.People;

import java.util.Optional;

public class RecognizeAnswer {
    private boolean faceIsFoundInImage;

    private Integer personId;

    private Optional<People> personData;

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

    public Optional<People> getPersonData() {
        return personData;
    }

    public void setPersonData(Optional<People> personData) {
        this.personData = personData;
    }
}
