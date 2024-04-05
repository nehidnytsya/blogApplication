package com.jana.dumanska.blogbackend.customException;

import java.time.LocalDateTime;

public record ErrorDetails(LocalDateTime timestamp, String message, String details) {}
