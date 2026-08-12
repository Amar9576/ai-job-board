package com.amar.jobboard.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.amar.jobboard.dto.JobRequest;
import com.amar.jobboard.dto.JobResponse;
import com.amar.jobboard.entity.Job;
import com.amar.jobboard.entity.User;
import com.amar.jobboard.exception.JobNotFoundException;
import com.amar.jobboard.mapper.JobMapper;
import com.amar.jobboard.repository.JobRepository;
import com.amar.jobboard.repository.UserRepository;
import com.amar.jobboard.service.JobService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;

    private final UserRepository userRepository;

    private final JobMapper jobMapper;

    @Override
    public JobResponse createJob(JobRequest request, String recruiterEmail) {

        User recruiter = userRepository.findByEmail(recruiterEmail)
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));

        Job job = jobMapper.toEntity(request, recruiter);

        Job savedJob = jobRepository.save(job);

        return jobMapper.toResponse(savedJob);
    }

    @Override
    public Page<JobResponse> getAllJobs(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return jobRepository
                .findAll(pageable)
                .map(jobMapper::toResponse);
    }

    @Override
    public JobResponse getJobById(Long id) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new JobNotFoundException("Job not found with id : " + id));

        return jobMapper.toResponse(job);
    }

    @Override
    public Page<JobResponse> searchJobs(
            String keyword,
            int page,
            int size) {

        Pageable pageable = PageRequest.of(page, size);

        return jobRepository
                .findByTitleContainingIgnoreCase(keyword, pageable)
                .map(jobMapper::toResponse);
    }

    @Override
    public JobResponse updateJob(Long id, JobRequest request) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new JobNotFoundException("Job not found with id : " + id));

        job.setTitle(request.getTitle());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());
        job.setDescription(request.getDescription());
        job.setSalary(request.getSalary());

        Job updatedJob = jobRepository.save(job);

        return jobMapper.toResponse(updatedJob);
    }

    @Override
    public void deleteJob(Long id) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new JobNotFoundException("Job not found with id : " + id));

        jobRepository.delete(job);
    }
}