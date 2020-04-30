package com.virtual.facerecognition.db.repository;

import com.virtual.facerecognition.db.model.Faces;
import com.virtual.facerecognition.db.model.Images;
import org.springframework.data.repository.CrudRepository;

public interface ImagesRepository extends CrudRepository<Images, Integer>
{
}
