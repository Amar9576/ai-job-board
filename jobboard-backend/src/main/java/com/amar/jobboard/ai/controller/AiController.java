package com.amar.jobboard.ai.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amar.jobboard.ai.dto.ResumeAnalysisRequest;
import com.amar.jobboard.ai.dto.ResumeAnalysisResponse;
import com.amar.jobboard.ai.service.AiService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;


    @PostMapping("/generate-description")
    public ResponseEntity<String> generateDescription(
            @RequestBody String title) {

        String description =
                aiService.generateJobDescription(title);

        return ResponseEntity.ok(description);
    }


    @PostMapping("/analyze-resume")
    public ResponseEntity<ResumeAnalysisResponse> analyzeResume(
            @RequestBody ResumeAnalysisRequest request) {

        ResumeAnalysisResponse response =
                aiService.analyzeResume(
                        request.getJobDescription(),
                        request.getResume()
                );

        return ResponseEntity.ok(response);
    }
}