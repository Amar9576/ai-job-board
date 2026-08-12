package com.amar.jobboard.mapper;

import org.springframework.stereotype.Component;

import com.amar.jobboard.dto.JobRequest;
import com.amar.jobboard.dto.JobResponse;
import com.amar.jobboard.entity.Job;
import com.amar.jobboard.entity.User;

@Component
public class JobMapper {

    public Job toEntity(JobRequest request, User recruiter) {

        return Job.builder()
                .title(request.getTitle())
                .company(request.getCompany())
                .location(request.getLocation())
                .description(request.getDescription())
                .salary(request.getSalary())
                .jobType(request.getJobType())
                .experience(request.getExperience())
                .recruiter(recruiter)
                .build();
    }

    public JobResponse toResponse(Job job) {

        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .company(job.getCompany())
                .location(job.getLocation())
                .description(job.getDescription())
                .salary(job.getSalary())
                .jobType(job.getJobType())
                .experience(job.getExperience())
                .recruiterEmail(job.getRecruiter().getEmail())
                .createdAt(job.getCreatedAt())
                .build();
    }
}