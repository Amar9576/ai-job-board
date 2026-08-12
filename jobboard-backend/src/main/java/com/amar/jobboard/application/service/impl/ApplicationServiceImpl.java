package com.amar.jobboard.application.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.amar.jobboard.application.dto.JobApplicationResponse;
import com.amar.jobboard.application.entity.JobApplication;
import com.amar.jobboard.application.repository.JobApplicationRepository;
import com.amar.jobboard.application.service.ApplicationService;
import com.amar.jobboard.entity.Job;
import com.amar.jobboard.entity.User;
import com.amar.jobboard.repository.JobRepository;
import com.amar.jobboard.repository.UserRepository;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public ApplicationServiceImpl(
            JobApplicationRepository applicationRepository,
            JobRepository jobRepository,
            UserRepository userRepository) {

        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    @Override
    public JobApplicationResponse applyForJob(Long jobId, Long userId) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        boolean alreadyApplied =
                applicationRepository.existsByJobAndUser(job, user);

        System.out.println("Already Applied? : " + alreadyApplied);

        if (alreadyApplied) {

            throw new RuntimeException(
                    "You have already applied for this job");
        }

        JobApplication application = new JobApplication();

        application.setJob(job);
        application.setUser(user);
        application.setStatus("APPLIED");
        application.setAppliedAt(LocalDateTime.now());

        JobApplication savedApplication =
                applicationRepository.save(application);

        return convertToResponse(savedApplication);
    }

    @Override
    public List<JobApplicationResponse> getMyApplications(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return applicationRepository.findByUser(user)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public List<JobApplicationResponse> getApplicationsForJob(Long jobId) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        return applicationRepository.findByJob(job)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    private JobApplicationResponse convertToResponse(
            JobApplication application) {

        return new JobApplicationResponse(
                application.getId(),
                application.getJob().getId(),
                application.getJob().getTitle(),
                application.getUser().getId(),
                application.getStatus(),
                application.getAppliedAt()
        );
    }

    @Override
    public JobApplication updateApplicationStatus(
            Long applicationId,
            String status) {

        JobApplication application =
                applicationRepository.findById(applicationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Application not found"));

        application.setStatus(status);

        return applicationRepository.save(application);
    }
}