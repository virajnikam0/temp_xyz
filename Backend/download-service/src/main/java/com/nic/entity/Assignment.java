package com.nic.entity;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;

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
@Table(name="assignment")
@AllArgsConstructor
@NoArgsConstructor
public class Assignment {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "assignment_id")
	private long assignmentId;
	
	@Column(name = "classroom_id")
	private int classroomId;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "max_marks")
	private int maxMarks;
	
	@Column(name = "due_date")
	private String dueDate;
	
	@Column(name = "file_path")
	private String filePath;
	
}
