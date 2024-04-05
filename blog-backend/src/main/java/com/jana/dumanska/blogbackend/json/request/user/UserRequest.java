package com.jana.dumanska.blogbackend.json.request.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserRequest(@NotBlank(message = "name can't be empty!") String name,
                          @NotBlank(message = "name can't be empty!")String surname,
                          @Size(min = 8, message = "password size should be minimum 8 characters")String password,
                          @Size(min = 8, message = "password size should be minimum 8 characters")String confirmedPassword,
                          @Pattern(regexp = "^(?=.{1,64}@)[\\p{L}0-9_-]+(\\.[\\p{L}0-9_-]+)*@[^-][\\p{L}0-9-]+(\\.[\\p{L}0-9-]+)*(\\.[\\p{L}]{2,})$",
                                  message = "wrong email format") String email,
                          String pesel, String passportNo) {}