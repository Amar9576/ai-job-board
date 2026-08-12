package com.amar.jobboard.ai.service.impl;

import org.springframework.stereotype.Service;

import com.amar.jobboard.ai.dto.ResumeAnalysisResponse;
import com.amar.jobboard.ai.service.AiService;

@Service
public class AiServiceImpl implements AiService {

	@Override
	public String generateJobDescription(String title) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResumeAnalysisResponse analyzeResume(
	        String jobDescription,
	        String resume) {

	    String resumeText = resume.toLowerCase();
	    String jobText = jobDescription.toLowerCase();

	    int score = 0;

	    StringBuilder strengths = new StringBuilder();
	    StringBuilder missingSkills = new StringBuilder();

	    String[] skills = {
	            "java",
	            "spring boot",
	            "spring",
	            "rest",
	            "mysql",
	            "git",
	            "react",
	            "javascript"
	    };

	    int matchedSkills = 0;

	    for (String skill : skills) {

	        if (jobText.contains(skill)) {

	            if (resumeText.contains(skill)) {

	                matchedSkills++;

	                if (strengths.length() > 0) {
	                    strengths.append(", ");
	                }

	                strengths.append(skill);
	            } else {

	                if (missingSkills.length() > 0) {
	                    missingSkills.append(", ");
	                }

	                missingSkills.append(skill);
	            }
	        }
	    }

	    if (matchedSkills > 0) {

	        score = matchedSkills * 10;

	    }

	    if (score > 100) {
	        score = 100;
	    }

	    String suggestions;

	    if (score >= 80) {

	        suggestions =
	                "Your resume matches the job requirements well. " +
	                "Focus on highlighting your projects and practical experience.";

	    } else if (score >= 50) {

	        suggestions =
	                "Your resume has a moderate skill match. " +
	                "Consider improving the missing technical skills.";

	    } else {

	        suggestions =
	                "Your resume has a low skill match. " +
	                "Add relevant skills and projects mentioned in the job description.";
	    }

	    return new ResumeAnalysisResponse(
	            score,
	            strengths.toString(),
	            missingSkills.toString(),
	            suggestions
	    );
	}
}