package com.nic.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AssignmentDto {
	
   private long assignmentId;
   private int classroomId;
   private String title;
   private String description;
   private String dueDate;
   private int marks;

   public AssignmentDto(long assignmentId, int classroomId, String title, String description, String dueDate, int marks) {
	super();
	this.assignmentId = assignmentId;
	this.classroomId = classroomId;
	this.title = title;
	this.description = description;
	this.dueDate = dueDate;
	this.marks = marks;
}
   
   
  
}
