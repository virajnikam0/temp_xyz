package com.nic.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nic.config.JwtUtils;
import com.nic.dto.ClassroomDetailsDto;
import com.nic.entity.ResponseDto;
import com.nic.service.ClassroomService;
import com.nic.service.UserService;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping("/api/v1")
public class TeacherController {

	@Autowired
	private ClassroomService classRoomService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	JwtUtils jwtUtils;
	
//	@RequestBody ClassroomDetailsDto obj, 
	
	@PostMapping("/create-classroom")
	public ResponseDto createClassRoom(@RequestHeader("Authorization") String authHeader, @RequestBody ClassroomDetailsDto obj )
	{
		
		String token = authHeader.replace("Bearer ","");
		
		System.out.println("Token With bearer : "+authHeader);
		Claims payload = jwtUtils.getPayloadFromJwt(authHeader);
		
		System.out.println("Payload : "+payload);
		int userId = Integer.parseInt(payload.get("userid").toString());

		System.out.println("User ID : "+userId);
		
		
		return classRoomService.createClassroom(obj, userId);
	}
	
	
	
	@PreAuthorize("hasRole('TEACHER')")
	@GetMapping("/created-classroom")
	public ResponseDto getMyCreatedClassroom(@RequestHeader("Authorization") String authHeader)
	{
		
		String token = authHeader.replace("Bearer ","");
		Claims payload = jwtUtils.getPayloadFromJwt(token);
		int userId = Integer.parseInt(payload.get("userid").toString());
		
		return userService.getMyCreatedClassroom(userId);
//		return null;

	}
	
	@PreAuthorize("hasAnyRole('TEACHER', 'USER')")
	@GetMapping("/classroom-details/{id}")
	public ResponseDto getClassroomDetails(@PathVariable("id") int classroomId) {
				
		return classRoomService.getClassroomDetails(classroomId);
	}
}
