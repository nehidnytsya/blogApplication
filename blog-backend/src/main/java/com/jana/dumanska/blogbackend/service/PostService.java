package com.jana.dumanska.blogbackend.service;

import com.jana.dumanska.blogbackend.customException.PostNotFoundException;
import com.jana.dumanska.blogbackend.customException.UserNotFoundException;
import com.jana.dumanska.blogbackend.entity.PostEntity;
import com.jana.dumanska.blogbackend.entity.UserEntity;
import com.jana.dumanska.blogbackend.json.request.post.PostRequest;
import com.jana.dumanska.blogbackend.json.response.GenericResponse;
import com.jana.dumanska.blogbackend.json.response.ResponseStatus;
import com.jana.dumanska.blogbackend.json.response.post.PartPostResponse;
import com.jana.dumanska.blogbackend.json.response.post.PostResponse;
import com.jana.dumanska.blogbackend.repository.PostRepository;
import com.jana.dumanska.blogbackend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ResponseEntity<PostResponse> findAllPosts(Long userId) {
        List<PostEntity> posts = postRepository.findAll();
        List<PartPostResponse> partPostResponse = new ArrayList<>();
        posts.forEach(post -> {
            partPostResponse.add(new PartPostResponse(
                    post.getUser().getId() == userId ? post.getId() : -1,
                    post.getContent()
            ));
        });
        return new ResponseEntity<>(
                new PostResponse(partPostResponse), HttpStatus.OK
        );
    }

    @Transactional
    public ResponseEntity<GenericResponse> createPost(PostRequest postRequest) {
        UserEntity user = userRepository.findById(postRequest.userId())
                .orElseThrow(() -> new UserNotFoundException("With id="+postRequest.userId()));
        PostEntity post = new PostEntity(postRequest.content(), user);
        user.addPost(post);
        //if posts will be duplicated -> remove
        postRepository.save(post);
        return new ResponseEntity<>(
                new GenericResponse(ResponseStatus.CREATED.getStatus()), HttpStatus.OK
        );
    }

    @Transactional
    public ResponseEntity<GenericResponse> deletePost(Long postId) {
        PostEntity post = postRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException("With id=" + postId));
        postRepository.delete(post);
        return new ResponseEntity<>(
                new GenericResponse(ResponseStatus.DELETED.getStatus()), HttpStatus.OK
        );
    }
}
