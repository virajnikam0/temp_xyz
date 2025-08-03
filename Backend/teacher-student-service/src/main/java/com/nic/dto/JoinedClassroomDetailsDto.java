package com.nic.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JoinedClassroomDetailsDto {

	private int classroomId;
	private String title;
	private int classroomCode;

	public JoinedClassroomDetailsDto(int classroomId, String title, int classroomCode)
	{
		this.classroomId = classroomId;
		this.title = title;
		this.classroomCode = classroomCode;
	}
}
