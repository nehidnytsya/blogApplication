package com.jana.dumanska.blogbackend.service;

import com.jana.dumanska.blogbackend.customException.UserAlreadyExistsException;
import com.jana.dumanska.blogbackend.customException.UserNotFoundException;
import com.jana.dumanska.blogbackend.entity.UserEntity;
import com.jana.dumanska.blogbackend.json.request.user.UserRequest;
import com.jana.dumanska.blogbackend.json.response.GenericResponse;
import com.jana.dumanska.blogbackend.json.response.ResponseStatus;
import com.jana.dumanska.blogbackend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.apache.commons.lang3.StringUtils.isNotBlank;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void createUser(UserRequest user) {
        Optional<UserEntity> existingUserEmail = userRepository.findByEmail(user.email());
        if (existingUserEmail.isPresent()) {
            throw new UserAlreadyExistsException(user.email());
        }
        if (isNotBlank(user.pesel())) {
            userRepository.findByPesel(user.pesel()).ifPresent(existingUserPesel -> {
                throw new UserAlreadyExistsException(user.pesel());
            });
        } else {
            userRepository.findByPassportNo(user.passportNo()).ifPresent(existingUserPassportNo -> {
                throw new UserAlreadyExistsException(user.passportNo());
            });
        }
        createNewUser(user);
    }

    private void createNewUser(UserRequest userRequest) {

        UserEntity user = new UserEntity(
                userRequest.name(),
                userRequest.surname(),
                passwordEncoder.encode(userRequest.password()),
                true,
                userRequest.email(),
                userRequest.pesel(),
                userRequest.passportNo(),
                "ROLE_USER"
        );
        userRepository.save(user);
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public ResponseEntity<GenericResponse> deleteUserById(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("With id" + userId));
        userRepository.delete(user);
        return new ResponseEntity<>(
                new GenericResponse(ResponseStatus.DELETED.getStatus()), HttpStatus.OK
        );
    }
}
