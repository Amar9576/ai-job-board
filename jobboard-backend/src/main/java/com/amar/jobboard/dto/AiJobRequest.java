package com.amar.jobboard.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class AiJobRequest {
	
	 @NotBlank(message = "Job title is required")
	    private String title;

}
