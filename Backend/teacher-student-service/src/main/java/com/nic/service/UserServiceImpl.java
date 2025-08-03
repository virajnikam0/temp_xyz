package com.nic.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.nic.config.User;
import com.nic.dto.RegisterUserDto;
import com.nic.entity.ClassroomDetails;
import com.nic.entity.ResponseDto;
import com.nic.repository.ClassroomDetailsRepo;
import com.nic.repository.UserRepository;



@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private ClassroomDetailsRepo classRoomRepo;
	
	public User getUserDetailsByEmail(String email)
	{
		
		return userRepo.findByEmail(email);
		
	}
	
	
	@Override
	public ResponseDto registerUser(RegisterUserDto user) {
		
//		UserEntity userObj = userRepo.save(user);
		
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		User userObj = new User();
		userObj.setName(user.getName());
		userObj.setEmail(user.getEmail());
		userObj.setPassword(encoder.encode(user.getPassword()));
		userObj.setRole("ROLE_USER");
		
		userRepo.save(userObj);
		
		ResponseDto response = new ResponseDto();
		
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		response.setMessage("User registered successfully");
		
		
		return response;
	}

	@Override
	public ResponseDto registerTeacher(RegisterUserDto user) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		User userObj = new User();
		userObj.setName(user.getName());
		userObj.setEmail(user.getEmail());
		userObj.setPassword(encoder.encode(user.getPassword()));
		userObj.setRole("ROLE_TEACHER");
		
		userRepo.save(userObj);
		
		ResponseDto response = new ResponseDto();
		
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		response.setMessage("Teacher registered successfully");
		
		
		return response;
	}


	@Override
	public ResponseDto getMyCreatedClassroom(int userId) {
		
		List<ClassroomDetails> classRoomsDetails = classRoomRepo.getClassroomByUserId(userId);

		
		ResponseDto response = new ResponseDto();
		
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		response.setMessage("Teacher registered successfully");
		response.setData(classRoomsDetails);
		
		return response;
		
	}
	
	

}
