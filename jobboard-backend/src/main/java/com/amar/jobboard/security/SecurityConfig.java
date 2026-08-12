package com.amar.jobboard.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http

            .cors(cors ->
                cors.configurationSource(
                    corsConfigurationSource()))

            .csrf(csrf ->
                csrf.disable())

            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS))

            .authorizeHttpRequests(auth -> auth

                .requestMatchers("/api/auth/**")
                .permitAll()

                .requestMatchers(
                    "/swagger-ui/**",
                    "/v3/api-docs/**"
                )
                .permitAll()

                // =========================
                // RECRUITER JOB APIs
                // =========================

                .requestMatchers(
                    HttpMethod.POST,
                    "/api/jobs"
                )
                .hasRole("RECRUITER")

                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/jobs/**"
                )
                .hasRole("RECRUITER")

                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/jobs/**"
                )
                .hasRole("RECRUITER")


                // =========================
                // JOB SEEKER APPLICATION
                // =========================

                .requestMatchers(
                    HttpMethod.POST,
                    "/api/applications/apply"
                )
                .hasRole("JOB_SEEKER")


                // =========================
                // RECRUITER APPLICATIONS
                // =========================

                .requestMatchers(
                    HttpMethod.GET,
                    "/api/applications/job/**"
                )
                .hasRole("RECRUITER")

                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/applications/*/status"
                )
                .hasRole("RECRUITER")


                // =========================
                // JOB SEEKER APPLICATIONS
                // =========================

                .requestMatchers(
                    HttpMethod.GET,
                    "/api/applications/user/**"
                )
                .hasRole("JOB_SEEKER")


                // =========================
                // PUBLIC TO LOGGED-IN USERS
                // =========================

                .requestMatchers(
                    HttpMethod.GET,
                    "/api/jobs",
                    "/api/jobs/**"
                )
                .authenticated()

                .anyRequest()
                .authenticated()
            )

            .httpBasic(Customizer.withDefaults());

        http.addFilterBefore(
            jwtAuthenticationFilter,
            UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }


    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
            List.of("http://localhost:5173")
        );

        configuration.setAllowedMethods(
            List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
            )
        );

        configuration.setAllowedHeaders(
            List.of("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
            "/**",
            configuration
        );

        return source;
    }
}