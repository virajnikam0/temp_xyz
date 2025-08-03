package com.nic.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetAssignmentDto {
	private long assignmentId;
	private int classroomId;
	private String title;
	private String description;
	private int maxMarks;
	private String dueDate;
}
