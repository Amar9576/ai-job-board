package com.amar.jobboard.application.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.amar.jobboard.application.dto.JobApplicationResponse;
import com.amar.jobboard.application.entity.JobApplication;
import com.amar.jobboard.application.service.ApplicationService;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/apply")
    public ResponseEntity<JobApplicationResponse> applyForJob(
            @RequestParam Long jobId,
            @RequestParam Long userId) {

        JobApplicationResponse response =
                applicationService.applyForJob(jobId, userId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<JobApplicationResponse>> getMyApplications(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                applicationService.getMyApplications(userId)
        );
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<JobApplicationResponse>> getApplicationsForJob(
            @PathVariable Long jobId) {

        return ResponseEntity.ok(
                applicationService.getApplicationsForJob(jobId)
        );
    }
    @PutMapping("/{applicationId}/status")
    public ResponseEntity<JobApplication> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam String status) {

        JobApplication application =
                applicationService.updateApplicationStatus(
                        applicationId,
                        status
                );

        return ResponseEntity.ok(application);
    }
}