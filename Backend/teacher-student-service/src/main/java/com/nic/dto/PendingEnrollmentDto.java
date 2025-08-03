package com.nic.dto;

import com.nic.entity.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PendingEnrollmentDto {

	private String title;
	private int classroomCode;
	private String status;
	
	
	public PendingEnrollmentDto(String title, int classroomCode , String status)
	{
		this.title = title;
		this.classroomCode = classroomCode;
		this.status = status;
	}
}
