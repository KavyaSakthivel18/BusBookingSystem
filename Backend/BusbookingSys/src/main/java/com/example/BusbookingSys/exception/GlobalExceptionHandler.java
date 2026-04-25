package com.example.BusbookingSys.exception;
import com.example.BusbookingSys.dto.response.*;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ApiResponse<?> handleNotFound(ResourceNotFoundException ex) {
        return new ApiResponse<>(false, ex.getMessage(), null);
    }

    @ExceptionHandler(SeatAlreadyBookedException.class)
    public ApiResponse<?> handleSeatError(SeatAlreadyBookedException ex) {
        return new ApiResponse<>(false, ex.getMessage(), null);
    }
}