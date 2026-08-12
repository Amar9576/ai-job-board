package com.amar.jobboard.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumeAnalysisResponse {

    private int score;
    private String strengths;
    private String missingSkills;
    private String suggestion;

}