package com.nic.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.nic.config.JwtUtils;
import com.nic.dto.AssignmentDto;
import com.nic.dto.EnrollmentDto;
import com.nic.dto.JoinClassroomDto;
import com.nic.dto.JoinedClassroomDetailsDto;
import com.nic.dto.PendingEnrollmentDto;
import com.nic.entity.Assignment;
import com.nic.entity.ClassroomDetails;
import com.nic.entity.ResponseDto;
import com.nic.entity.StudentEnrollment;
import com.nic.repository.AssignmentRepo;
import com.nic.repository.ClassroomDetailsRepo;
import com.nic.repository.StudentEnrollmentRepo;

import io.jsonwebtoken.Claims;
import jakarta.transaction.Transactional;

@Service
public class StudentServiceImpl implements StudentService{

	@Autowired
	private StudentEnrollmentRepo studentEnrollmentRepo;
	
	@Autowired
	private ClassroomDetailsRepo classroomDetailsRepo;
	
	@Autowired
	private AssignmentRepo assignmentRepo;
	
	@Autowired
	JwtUtils jwtUtils;
	
	@Transactional
	@Override
	public ResponseDto joinClassroom(JoinClassroomDto joinClassroomDto, String authHeader) {
		
		ResponseDto response = new ResponseDto();
		
		ClassroomDetails classroom = classroomDetailsRepo.getClassroomByClassroomCode(joinClassroomDto.getClassroomCode());
		
		if(classroom == null) {
			response.setStatus("Not Found");
			response.setStatusCode(HttpStatus.NOT_FOUND.value());
			response.setMessage("Invalid classroom code : " + joinClassroomDto.getClassroomCode() );
		}
		else 
		{
			
			
			String token = authHeader.replace("Bearer ","").trim();
			Claims payload = jwtUtils.getPayloadFromJwt(token);
			
			
			int userId = Integer.parseInt(payload.get("userid").toString());
			
			
			
			StudentEnrollment alreadyEnroll = studentEnrollmentRepo.getEnrollmentDetailsByClassroomIdAndStudentId(classroom.getClassRoomId(), userId);
			
			if(alreadyEnroll == null)
			{
				StudentEnrollment enrollment = new StudentEnrollment();
				
				enrollment.setClassroomId(classroom.getClassRoomId());
				enrollment.setStudentId(userId);
				enrollment.setStatus("D");
				enrollment.setEnrollmentDate(LocalDate.now().toString());
				
				studentEnrollmentRepo.save(enrollment);
				
				response.setStatus("Success");
				response.setStatusCode(HttpStatus.OK.value());
				response.setMessage("Enrollment pending");
			}
			else 
			{
				response.setStatus("danger");
				response.setStatusCode(HttpStatus.CONFLICT.value());
				response.setMessage("Enrollment already exist");
			}
		
			
			
			
		}
		
		return response;
	}

	@Transactional
	@Override
	public ResponseDto getEnrollmentStatus(String authHeader) {
		
		String token = authHeader.replace("Bearer ","").trim();
		Claims payload = jwtUtils.getPayloadFromJwt(token);
		
		
		int userId = Integer.parseInt(payload.get("userid").toString());
		
		
		List<PendingEnrollmentDto> pendingEnrollments=studentEnrollmentRepo.getPendingEnrollmentDetails(userId);
		
		ResponseDto response=new ResponseDto();
		response.setData(pendingEnrollments);
		response.setMessage("pending enrollments fetched successfully");
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		return response;
	}

	@Transactional
	@Override
	public ResponseDto getPendingEnrollmentsByClassroomId(int classroomId) {
		
		List<EnrollmentDto> enrollments=studentEnrollmentRepo.getPendingEnrollmentsByClassroomId(classroomId);
		ResponseDto response=new ResponseDto();
		response.setData(enrollments);
		response.setMessage("pending enrollments fetched successfully");
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		return response;
	}

	@Transactional
	@Override
	public ResponseDto getApprovedEnrollementsByClassroomId(int classroomId) {
		
		List<EnrollmentDto> enrollments=studentEnrollmentRepo.getApprovedEnrollmentsByClassroomId(classroomId);
		ResponseDto response=new ResponseDto();
		response.setData(enrollments);
		response.setMessage("Approved enrollments fetched successfully");
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		return response;
	}
	

	@Transactional
	@Override
	public ResponseDto approveStudentEnrollment(int classroomId, int studentId) {
		
		
		StudentEnrollment enrollment = studentEnrollmentRepo.getEnrollmentDetailsByClassroomIdAndStudentId(classroomId, studentId);
		
		
		
		enrollment.setStatus("A");
		
		ResponseDto response=new ResponseDto();
		response.setMessage("Enrollment accepted successfully");
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		
		return response;
	}

	@Transactional
	@Override
	public ResponseDto rejectStudentEnrollment(int classroomId, int studentId) {
		
		
		
		StudentEnrollment enrollment = studentEnrollmentRepo.getEnrollmentDetailsByClassroomIdAndStudentId(classroomId, studentId);
		
		
		
		enrollment.setStatus("R");
		
		ResponseDto response=new ResponseDto();
		response.setMessage("Enrollment rejected successfully");
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		
		return response;
	}

	@Override
	public ResponseDto getJoinedClassroomDetailsByStudentId(String authHeader) {
		
		String token = authHeader.replace("Bearer ","").trim();
		Claims payload = jwtUtils.getPayloadFromJwt(token);
		
		
		int userId = Integer.parseInt(payload.get("userid").toString());
		
		List<JoinedClassroomDetailsDto> joinedClassrooms = studentEnrollmentRepo.getJoinedClassroomDetailsByStudentId(userId);
		
		ResponseDto response = new ResponseDto();
		
		response.setData(joinedClassrooms);
		response.setMessage("Joined classroom fetched successfully");
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		
		return response;
		
	}

	@Transactional
	@Override
	public ResponseDto getAssignmentsByClassroomId(int classroomId) {
		// TODO Auto-generated method stub
		
		List<Assignment> assignments = assignmentRepo.getAssignmentsByClassroomId(classroomId);
 		
		ResponseDto response = new ResponseDto();
		
		response.setData(assignments);
		response.setMessage("Assignments fetched successfully");
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		
		return response;
	}

	

}
