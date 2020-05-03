package com.virtual.facerecognition.model;

import com.virtual.facerecognition.db.model.People;

public class AddPersonAnswer {
    private Iterable<People> people;

    private Integer error;

    public AddPersonAnswer (Iterable<People> people) {
        this.people = people;
    }

    public AddPersonAnswer (Iterable<People> people, Integer error) {
        this.people = people;
        this.error = error;
    }

    public Iterable<People> getPeople() {
        return people;
    }

    public void setPeople(Iterable<People> people) {
        this.people = people;
    }

    public Integer getError() {
        return error;
    }

    public void setError(Integer error) {
        this.error = error;
    }
}
