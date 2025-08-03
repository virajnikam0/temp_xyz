package com.nic.entity;



import java.util.Date;

import com.nic.config.User;

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
@Table(name="classroom_details")
@AllArgsConstructor
@NoArgsConstructor
public class ClassroomDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "classroom_id")
	private int classRoomId;
	
	@Column(name="title")
	private String title;
	
	@Column(name="description")
	private String description;
	
	@Column(name="classroom_code")
	private int classRoomCode;
	
	@Column(name="teacher_id")
	private int teacherId;
	
	@Column(name="created_dts")
	private String createdDts;
	
}
