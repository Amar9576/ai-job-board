package com.amar.jobboard.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JobResponse {

    private Long id;

    private String title;

    private String company;

    private String location;

    private String description;

    private Double salary;

    private String jobType;

    private String experience;

    private String recruiterEmail;

    private LocalDateTime createdAt;
}