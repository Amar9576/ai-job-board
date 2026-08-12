package com.amar.jobboard.service;

import org.springframework.data.domain.Page;

import com.amar.jobboard.dto.JobRequest;
import com.amar.jobboard.dto.JobResponse;

public interface JobService {

    JobResponse createJob(JobRequest request, String recruiterEmail);

    JobResponse updateJob(Long id, JobRequest request);

    void deleteJob(Long id);

    Page<JobResponse> getAllJobs(int page, int size);

    JobResponse getJobById(Long id);

    Page<JobResponse> searchJobs(String keyword, int page, int size);
}