package com.nic.dto;

import com.nic.entity.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassroomDetailsDto {

	private String title;
	private String description;
	private int classroomCode;
	
}
