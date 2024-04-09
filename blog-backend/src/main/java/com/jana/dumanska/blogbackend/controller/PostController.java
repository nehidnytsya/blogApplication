package com.jana.dumanska.blogbackend.controller;

import com.jana.dumanska.blogbackend.json.request.post.PostRequest;
import com.jana.dumanska.blogbackend.json.response.GenericResponse;
import com.jana.dumanska.blogbackend.json.response.post.PostResponse;
import com.jana.dumanska.blogbackend.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping(value = "/v1/post/{userId}", produces = "application/json")
    public ResponseEntity<PostResponse> getAllPosts(@PathVariable(name = "userId") Long userId) {
        return postService.findAllPosts(userId);
    }

    @PostMapping(value = "/v1/post", produces = "application/json")
    public ResponseEntity<GenericResponse> createPost(@RequestBody PostRequest postRequest) {
        return postService.createPost(postRequest);
    }

    @DeleteMapping(value = "/v1/post/{postId}", produces = "application/json")
    public ResponseEntity<GenericResponse> deletePost(@PathVariable(name = "postId") Long postId) {
        return postService.deletePost(postId);
    }
}
