package com.nic.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nic.config.CustomUserDetails;
import com.nic.config.JwtUtils;
import com.nic.dto.RegisterTeacherDto;
import com.nic.dto.RegisterUserDto;
import com.nic.entity.JwtRequest;
import com.nic.entity.JwtResponse;
import com.nic.entity.ResponseDto;
import com.nic.service.UserService;

import jakarta.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/api/v1")
public class AuthController {

	
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody JwtRequest request)
	{
		Authentication authentication;
		
		try
		{
			authentication = authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(request.getUsername(),
					 																					 request.getPassword()));
		}
		catch(AuthenticationException e)
		{
			Map<String,Object> obj = new HashMap<>();
			
			obj.put("message", "Invalid email or password");
			obj.put("status", HttpStatus.UNAUTHORIZED.value());
			
			
			return new ResponseEntity<Object>(obj,HttpStatus.OK);
			
		}
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		
		String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);
		
		List<String> role = userDetails.getAuthorities().stream()
					.map(item -> item.getAuthority())
					.collect(Collectors.toList());
		
		JwtResponse response = new JwtResponse();
		response.setRole(role);
		response.setUsername(userDetails.getUsername());
		response.setToken(jwtToken);
		response.setStatus(HttpStatus.OK.value());
		
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/register")
	public ResponseDto registerUser(@RequestBody RegisterUserDto user)
	{
		
		return userService.registerUser(user);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/register-teacher")
	public ResponseDto registerTeacher(@RequestBody RegisterUserDto user)
	{
		return userService.registerTeacher(user);
	}
	
//	@PreAuthorize("hasRole('ADMIN')")
//	@GetMapping("/registered-teachers")
//	public ResponseDto getRegisteredTeacher() {
//		System.out.println("Inside Controller");
//		return userService.getRegisteredTeachers();
//	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/registered-teachers")
	public ResponseDto getRegisteredTeachers()
	{
		System.out.println("API Hitt ");
		return userService.getRegisteredTeachers();
	}
	
	
}
