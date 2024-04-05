package com.jana.dumanska.blogbackend.repository;


import com.jana.dumanska.blogbackend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByPesel(String pesel);

    Optional<UserEntity> findByPassportNo(String passportNo);
}
