package com.virtual.facerecognition.controller;

import com.virtual.facerecognition.db.model.Faces;
import com.virtual.facerecognition.db.model.People;
import com.virtual.facerecognition.db.repository.FacesRepository;
import com.virtual.facerecognition.db.repository.PeopleRepository;
import com.virtual.facerecognition.model.Answer;
import com.virtual.facerecognition.model.Answer2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
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

    @Value("${fr.logic.api.url}")
    private String frLogicApiUrl;

    @PostMapping("/recognize")
    public Answer2 recognize(@RequestParam("file") MultipartFile file) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "multipart/form-data");
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        body.add("faces", facesRepository.findAll());

        body.add("file", file.getResource());
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();

        Answer2 answer2 = restTemplate.postForEntity(frLogicApiUrl + "/recognize", requestEntity, Answer2.class).getBody();

        if(answer2 == null || !answer2.getResult().getFaceIsFoundInImage() || answer2.getResult().getPersonId() == null) return new Answer2();

        answer2.getResult().setPersonData(peopleRepository.findById(answer2.getResult().getPersonId()));

        return answer2;
    }

    @PostMapping("/addPerson")
    public Iterable<People> addPerson(@RequestParam String firstName, @RequestParam(required = false) String middleName,
                                      @RequestParam String lastName, @RequestParam(required = false) Integer age,
                                      @RequestParam(required = false) String externalId, @RequestParam MultipartFile file) {

        Answer embedding = null;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "multipart/form-data");
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        body.add("file", file.getResource());
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        embedding = restTemplate.postForEntity(frLogicApiUrl + "/getEmbedding",
                requestEntity, Answer.class)
                .getBody();

        if(!embedding.getResult().getFaceIsFoundInImage()) return null;

        System.out.println(embedding.getResult().getFaceEmbedding());

        People people = new People();
        people.setFirstName(firstName);
        if(middleName != null)
            people.setMiddleName(middleName);
        people.setLastName(lastName);
        if(age != null)
            people.setAge(age);
        if(externalId != null)
            people.setExternalId(externalId);

        peopleRepository.save(people);

        try {
            Faces faces = new Faces();
            faces.setPersonId(people.getPersonId());
            faces.setEmbedding(embedding.getResult().getFaceEmbedding().toString());

            facesRepository.save(faces);
        } catch (Exception e) {
            peopleRepository.delete(people);
            System.err.println(e);
        }

        return peopleRepository.findAll();
    }

    @GetMapping("/getPeople")
    public Iterable<People> getPeople() {
        return peopleRepository.findAll();
    }

    @DeleteMapping("/deletePerson/{personId}")
    public Iterable<People> deletePerson(@PathVariable Integer personId) {
        peopleRepository.deleteById(personId);

        return peopleRepository.findAll();
    }
}

