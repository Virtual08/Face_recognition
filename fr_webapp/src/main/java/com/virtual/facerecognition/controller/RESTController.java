package com.virtual.facerecognition.controller;

import com.virtual.facerecognition.db.model.Faces;
import com.virtual.facerecognition.db.model.Images;
import com.virtual.facerecognition.db.model.People;
import com.virtual.facerecognition.db.repository.FacesRepository;
import com.virtual.facerecognition.db.repository.ImagesRepository;
import com.virtual.facerecognition.db.repository.PeopleRepository;
import com.virtual.facerecognition.model.Answer;
import com.virtual.facerecognition.model.EmbeddingAnswer;
import com.virtual.facerecognition.model.RecognizeAnswer;
import com.virtual.facerecognition.model.StatusAnswer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(origins = "*")
@RestController
public class RESTController {

    @Autowired
    private PeopleRepository peopleRepository;

    @Autowired
    private FacesRepository facesRepository;

    @Autowired
    private ImagesRepository imagesRepository;

    @Value("${fr.logic.api.url}")
    private String frLogicApiUrl;

    @Value("${fr.storage.api.url}")
    private String frStorageApiUrl;

    @PostMapping("/recognize")
    public Answer recognize(@RequestParam("file") MultipartFile file) throws IOException {
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        body.add("faces", facesRepository.findAll());

        body.add("file", file.getResource());
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, getHeaders(MediaType.MULTIPART_FORM_DATA));

        Answer<RecognizeAnswer> answer = new RestTemplate().exchange(frLogicApiUrl + "/recognize",HttpMethod.POST ,requestEntity, new ParameterizedTypeReference<Answer<RecognizeAnswer>>(){}).getBody();

        if(!answer.getResult().getFaceIsFoundInImage() || answer.getResult().getPersonId() == null) return answer;

        answer.getResult().setPersonData(peopleRepository.findById(answer.getResult().getPersonId()));

        return answer;
    }

    @PostMapping("/addPerson")
    public Iterable<People> addPerson(@RequestParam String firstName, @RequestParam(required = false) String middleName,
                                      @RequestParam String lastName, @RequestParam(required = false) Integer age,
                                      @RequestParam(required = false) String externalId, @RequestParam MultipartFile file) {
        MultiValueMap<String, Object> bodyStorage = new LinkedMultiValueMap<>();

        bodyStorage.add("file", file.getResource());
        HttpEntity<MultiValueMap<String, Object>> requestEntityForStorage = new HttpEntity<>(bodyStorage, getHeaders(MediaType.MULTIPART_FORM_DATA));

        Answer<StatusAnswer> status = new RestTemplate().exchange(frStorageApiUrl + "/save", HttpMethod.POST, requestEntityForStorage, new ParameterizedTypeReference<Answer<StatusAnswer>>(){}).getBody();

        if(status.getResult() == null || !status.getResult().getStatus()) return null;

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        body.add("file", file.getResource());
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, getHeaders(MediaType.MULTIPART_FORM_DATA));

        Answer<EmbeddingAnswer> embedding = new RestTemplate().exchange(frLogicApiUrl + "/getEmbedding", HttpMethod.POST, requestEntity, new ParameterizedTypeReference<Answer<EmbeddingAnswer>>(){}).getBody();

        if(!embedding.getResult().getFaceIsFoundInImage()) return null;


        People people = new People();
        people.setFirstName(firstName);
        if(middleName != null)
            people.setMiddleName(middleName);
        people.setLastName(lastName);
        if(age != null)
            people.setAge(age);
        if(externalId != null)
            people.setExternalId(externalId);

        Faces face = new Faces();
        face.setEmbedding(embedding.getResult().getFaceEmbedding().toString());
        people.setFaces(face);

        Images image = new Images();
        image.setFileName(file.getOriginalFilename());
        people.setImages(image);

        peopleRepository.save(people);

        return peopleRepository.findAll();
    }

    @GetMapping("/getPeople")
    public Iterable<People> getPeople() {
        return peopleRepository.findAll();
    }

    @DeleteMapping("/deletePerson/{personId}")
    public Iterable<People> deletePerson(@PathVariable Integer personId) {
        Iterable<Images> images = imagesRepository.findByPersonId(personId);

        for (Images image:images) {
            HttpEntity<MultiValueMap<String, Object>> requestEntityForStorage = new HttpEntity<>(new HttpHeaders());

            Answer<StatusAnswer> status = new RestTemplate().exchange(frStorageApiUrl + "/delete/" + image.getFileName(), HttpMethod.DELETE, requestEntityForStorage, new ParameterizedTypeReference<Answer<StatusAnswer>>(){}).getBody();

            if(!status.getResult().getStatus()) return null;
        }

        peopleRepository.deleteById(personId);

        return peopleRepository.findAll();
    }

    private HttpHeaders getHeaders(MediaType mediaType) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);
        return headers;
    }
}

