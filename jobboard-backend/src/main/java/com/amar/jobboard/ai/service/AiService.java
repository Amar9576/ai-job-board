package com.amar.jobboard.ai.service;

import com.amar.jobboard.ai.dto.ResumeAnalysisResponse;

public interface AiService {
	String generateJobDescription(String title);
	ResumeAnalysisResponse analyzeResume(
            String jobDescription,
            String resume
    );

}
