package com.virtual.facerecognition.db.repository;

import com.virtual.facerecognition.db.model.People;
import org.springframework.data.repository.CrudRepository;

public interface PeopleRepository extends CrudRepository<People, Integer> {

}
