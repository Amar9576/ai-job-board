package com.amar.jobboard.application.service;

import java.util.List;

import com.amar.jobboard.application.dto.JobApplicationResponse;
import com.amar.jobboard.application.entity.JobApplication;

public interface ApplicationService {

    JobApplicationResponse applyForJob(Long jobId, Long userId);

    List<JobApplicationResponse> getMyApplications(Long userId);

    List<JobApplicationResponse> getApplicationsForJob(Long jobId);
    JobApplication updateApplicationStatus(
            Long applicationId,
            String status
    );
}