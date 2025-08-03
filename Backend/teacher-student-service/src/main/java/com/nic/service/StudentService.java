package com.nic.service;

import com.nic.dto.JoinClassroomDto;
import com.nic.entity.ResponseDto;


public interface StudentService {

	public ResponseDto joinClassroom(JoinClassroomDto joinClassroomDto,String token);
	public ResponseDto getEnrollmentStatus(String token);
	public ResponseDto getPendingEnrollmentsByClassroomId(int classroomId);
	public ResponseDto approveStudentEnrollment(int classroomId, int studentId);
	public ResponseDto rejectStudentEnrollment(int classroomId, int studentId);
	public ResponseDto getApprovedEnrollementsByClassroomId(int classroomId);
	
	public ResponseDto getJoinedClassroomDetailsByStudentId(String authHeader);
	public ResponseDto getAssignmentsByClassroomId(int classroomId);
}
