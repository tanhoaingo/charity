package com.charity.charitysupport.controller;

import java.util.List;

import com.charity.charitysupport.DTO.PostDetails;
import com.charity.charitysupport.DTO.PostResponse;
import com.charity.charitysupport.service.PostService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/post")
@AllArgsConstructor
public class PostController {

	private final PostService postService;

    @PostMapping("/create")
    public ResponseEntity<Void> create(@RequestParam("files") MultipartFile[] files, @RequestParam("description") String[] description,
            @RequestParam("title") String title, @RequestParam("organization") String organization,
            @RequestParam("expectation") String expectation, @RequestParam("expirationDate") String expirationDate,
            @RequestParam("type") String type, @RequestParam("content") String content) {
                postService.create(files, description, title, organization, expectation, expirationDate, type, content);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<PostResponse>> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(postService.getAll());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<PostDetails> getById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(postService.getById(id));
    }
}
