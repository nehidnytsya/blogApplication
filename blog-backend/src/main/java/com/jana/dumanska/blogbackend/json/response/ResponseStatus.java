package com.jana.dumanska.blogbackend.json.response;


public enum ResponseStatus {

    CREATED("created"),
    DELETED("deleted");

    private final String status;

    ResponseStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
