package com.example.BusbookingSys.exception;

public class NoBusAvailableException extends RuntimeException {
    public NoBusAvailableException(String message) {
        super(message);
    }
}
