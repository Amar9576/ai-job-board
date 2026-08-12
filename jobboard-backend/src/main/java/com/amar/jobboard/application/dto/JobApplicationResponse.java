package com.amar.jobboard.application.dto;

import java.time.LocalDateTime;

public class JobApplicationResponse {

    private Long id;
    private Long jobId;
    private String jobTitle;
    private Long userId;
    private String status;
    private LocalDateTime appliedAt;
  

    public JobApplicationResponse() {
    }

    public JobApplicationResponse(
            Long id,
            Long jobId,
            String jobTitle,
            Long userId,
            String status,
            LocalDateTime appliedAt
           ) {

        this.id = id;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.userId = userId;
        this.status = status;
        this.appliedAt = appliedAt;
       		
    };
    public Long getId() {
        return id;
    }

    public Long getJobId() {
        return jobId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public Long getUserId() {
        return userId;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }
    
}