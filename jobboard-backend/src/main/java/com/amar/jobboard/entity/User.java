package com.amar.jobboard.entity;

import java.time.LocalDateTime;

import com.amar.jobboard.enums.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name ="users")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id ;
	
	@Column(nullable = false, length = 40)
	private String firstName;
	
	@Column(nullable = false, length = 40)
	private String lastName;
	
	@Column(nullable = false, unique = true,  length = 40)
	private String email;
	
	@Column(nullable = false, length = 100)
	private String password;
	
	@Enumerated(EnumType.STRING)
	@Column (nullable = false)
	private Role role;
	
	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;
	
	@Column(nullable = false)
	private LocalDateTime updatedAt;
	
	@PrePersist
	public void onCreate() {
		this.createdAt=LocalDateTime.now();
		this.updatedAt=LocalDateTime.now();
		
	}
	@PreUpdate
	public void onUpdate() {
	    this.updatedAt = LocalDateTime.now();
	}
	

}
