package com.amar.jobboard.exception;
import com.amar.jobboard.dto.ErrorResponse;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(EmailAlreadyExistException.class)
	public ResponseEntity<Map<String, Object>>handleEmailAlreadyExists(
			EmailAlreadyExistException ex){
		
		Map<String ,Object>response = new HashMap<>();
		response.put("timeStamp", LocalDateTime.now());
		response.put("status", 409);
		response.put("Mesaage",ex.getMessage());
		
		return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
		
		
	}
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String ,String >>handleValidation(
			MethodArgumentNotValidException ex){
		Map<String, String> errors = new HashMap<>();
		
		ex.getBindingResult().getFieldErrors()
		.forEach(error->errors.put(error.getField(),error.getDefaultMessage()));
		
		return ResponseEntity.badRequest().body(errors);
		
	}
	@ExceptionHandler(JobNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleJobNotFoundException(
	        JobNotFoundException ex,
	        HttpServletRequest request) {

		ErrorResponse response = ErrorResponse.builder()
		        .timestamp(LocalDateTime.now())
		        .status(HttpStatus.NOT_FOUND.value())
		        .error("Not Found")
		        .message(ex.getMessage())
		        .path(request.getRequestURI())
		        .build();
	    return ResponseEntity.status(HttpStatus.NOT_FOUND)
	            .body(response);
	}
	  @ExceptionHandler(RuntimeException.class)
	    public ResponseEntity<ApiErrorResponse> handleRuntimeException(
	            RuntimeException ex) {

	        return ResponseEntity
	                .status(HttpStatus.BAD_REQUEST)
	                .body(new ApiErrorResponse(ex.getMessage()));
	    }
}