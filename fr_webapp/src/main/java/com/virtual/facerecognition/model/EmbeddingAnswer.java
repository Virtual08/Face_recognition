package com.virtual.facerecognition.model;

import java.util.ArrayList;
import java.util.List;

public class EmbeddingAnswer {
    private boolean faceIsFoundInImage;

    private List<Double> faceEmbedding;

    public boolean getIsFaceIsFoundInImage() {
        return faceIsFoundInImage;
    }

    public void setFaceIsFoundInImage(boolean faceIsFoundInImage) {
        this.faceIsFoundInImage = faceIsFoundInImage;
    }

    public List<Double> getFaceEmbedding() {
        return faceEmbedding;
    }

    public void setFaceEmbedding(List<Double> faceEmbedding) {
        this.faceEmbedding = faceEmbedding;
    }
}
