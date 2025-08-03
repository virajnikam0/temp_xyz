package com.nic.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EnrollmentDto {

	private int studentId;
	private String studentName;
	String emailId;
	private String status;
	
	public EnrollmentDto(int studentId, String studentName, String emailId, String status) {
		this.studentId = studentId;
		this.studentName = studentName;
		this.emailId = emailId;
		this.status = status;
	}
	
	
}
