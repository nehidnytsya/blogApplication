package com.jana.dumanska.blogbackend.customException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.FORBIDDEN)
public class UserAccessException extends RuntimeException {
    public UserAccessException(String message) {
        super(message);
    }
}
