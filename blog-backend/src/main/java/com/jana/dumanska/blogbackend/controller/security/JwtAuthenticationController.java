package com.jana.dumanska.blogbackend.controller.security;

import com.jana.dumanska.blogbackend.json.response.jwt.JwtResponse;
import com.jana.dumanska.blogbackend.service.security.JwtService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JwtAuthenticationController {

    private final JwtService jwtService;

    public JwtAuthenticationController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping(value = "/v1/authenticate", produces = "application/json")
    public JwtResponse authenticate(Authentication authentication) {
        return new JwtResponse(jwtService.createToken(authentication));
    }
}
