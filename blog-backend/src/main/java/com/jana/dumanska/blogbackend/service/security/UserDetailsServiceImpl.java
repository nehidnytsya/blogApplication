package com.jana.dumanska.blogbackend.service.security;


import com.jana.dumanska.blogbackend.entity.UserEntity;
import com.jana.dumanska.blogbackend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserEntity> user = userRepository.findByEmail(username);
        user.orElseThrow(() -> new UsernameNotFoundException(username));

        return user.map(UserDetailsImpl::new).get();
    }
}
