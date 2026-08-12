package com.amar.jobboard.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class JobRequest {

    @NotBlank(message = "Job title is required")
    private String title;

    @NotBlank(message = "Company is required")
    private String company;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Salary is required")
    private Double salary;

    @NotBlank(message = "Job type is required")
    private String jobType;

    @NotBlank(message = "Experience is required")
    private String experience;
}