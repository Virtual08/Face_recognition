package com.virtual.facerecognition.db.repository;

import com.virtual.facerecognition.db.model.Faces;
import org.springframework.data.repository.CrudRepository;

public interface FacesRepository extends CrudRepository<Faces, Integer> {

}
