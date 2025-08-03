package com.nic.entity;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="student_enrollment") 
@AllArgsConstructor
@NoArgsConstructor
public class StudentEnrollment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "enrollment_id")
	private long enrollmentId ;
	
	@Column(name = "classroom_id")
	private int classroomId;
	

	@Column(name = "student_id")
	private int studentId;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "enrollment_date")
	private String enrollmentDate;
	
	
}
