package com.amar.jobboard.application.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.amar.jobboard.application.entity.JobApplication;
import com.amar.jobboard.entity.Job;
import com.amar.jobboard.entity.User;

public interface JobApplicationRepository
        extends JpaRepository<JobApplication, Long> {

    boolean existsByJobAndUser(Job job, User user);

    List<JobApplication> findByUser(User user);

    List<JobApplication> findByJob(Job job);
}