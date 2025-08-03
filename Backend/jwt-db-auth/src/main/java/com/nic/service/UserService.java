package com.nic.service;

import com.nic.config.User;
import com.nic.dto.RegisterTeacherDto;
import com.nic.dto.RegisterUserDto;
import com.nic.entity.ResponseDto;

public interface UserService {
	
	public ResponseDto registerUser(RegisterUserDto user);
	public ResponseDto registerTeacher(RegisterUserDto user);
	public User getUserDetailsByEmail(String email);
    public ResponseDto getRegisteredTeachers();
}
