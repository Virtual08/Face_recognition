package com.virtual.facerecognition.controller;

import com.virtual.facerecognition.db.model.Faces;
import com.virtual.facerecognition.db.model.People;
import com.virtual.facerecognition.db.repository.FacesRepository;
import com.virtual.facerecognition.db.repository.PeopleRepository;
import com.virtual.facerecognition.model.Answer;
import com.virtual.facerecognition.model.Answer2;
import com.virtual.facerecognition.model.EmbeddingAnswer;
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

        answer2.getResult().setPersonData(peopleRepository.findById(answer2.getResult().getPersonId()));

        return answer2;
    }

    @PostMapping("/addPerson")
    public void addPerson(@RequestParam("firstName") String firstName, @RequestParam(value = "middleName", required = false) String middleName,
                          @RequestParam("lastName") String lastName, @RequestParam(value = "age", required = false) Integer age,
                          @RequestParam(value = "externalId", required = false) String externalId, @RequestParam("file") MultipartFile file) {

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

        if(!embedding.getResult().getIsFaceIsFoundInImage()) return;

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
    }
}

