package com.jana.dumanska.blogbackend.controller;


import com.jana.dumanska.blogbackend.json.request.user.UserRequest;
import com.jana.dumanska.blogbackend.json.response.GenericResponse;
import com.jana.dumanska.blogbackend.json.response.ResponseStatus;
import com.jana.dumanska.blogbackend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/v1/user", produces = "application/json")
    public ResponseEntity<GenericResponse> register(@Valid @RequestBody UserRequest user) {
        userService.createUser(user);
        return new ResponseEntity<>(
                new GenericResponse(ResponseStatus.CREATED.getStatus()), HttpStatus.CREATED
        );
    }

    @DeleteMapping(value = "/v1/user/{userId}", produces = "application/json")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<GenericResponse> deleteUserById(@PathVariable(name = "userId") Long userId) {
        return userService.deleteUserById(userId);
    }
}
