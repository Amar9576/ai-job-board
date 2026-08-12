package com.amar.jobboard.controller;

import java.security.Principal;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.amar.jobboard.dto.JobRequest;
import com.amar.jobboard.dto.JobResponse;
import com.amar.jobboard.service.JobService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    // Create Job
    @PostMapping
    public ResponseEntity<JobResponse> createJob(
            @Valid @RequestBody JobRequest request,
            Principal principal) {

        JobResponse response = jobService.createJob(
                request,
                principal.getName());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // Get All Jobs with Pagination
    @GetMapping
    public ResponseEntity<Page<JobResponse>> getAllJobs(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "5") int size) {

        return ResponseEntity.ok(
                jobService.getAllJobs(page, size));
    }

    // Get Job By Id
    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJobById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                jobService.getJobById(id));
    }

    // Search Jobs with Pagination
    @GetMapping("/search")
    public ResponseEntity<Page<JobResponse>> searchJobs(

            @RequestParam String keyword,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "5") int size) {

        return ResponseEntity.ok(
                jobService.searchJobs(keyword, page, size));
    }

    // Update Job
    @PutMapping("/{id}")
    public ResponseEntity<JobResponse> updateJob(
            @PathVariable Long id,
            @Valid @RequestBody JobRequest request) {

        JobResponse response =
                jobService.updateJob(id, request);

        return ResponseEntity.ok(response);
    }

    // Delete Job
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(
            @PathVariable Long id) {

        jobService.deleteJob(id);

        return ResponseEntity.ok("Job deleted successfully.");
    }
}