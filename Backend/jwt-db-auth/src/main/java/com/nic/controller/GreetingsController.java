package com.nic.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class GreetingsController {

	@GetMapping("/greet")
	public Map<String,String> greet()
	{
		Map<String,String> response = new HashMap<>();
		
		response.put("message", "Hello Mahesh");
		
		return response;
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/greet-admin")
	public Map<String,String> greetAdmin()
	{
		Map<String,String> response = new HashMap<>();
		response.put("message", "Hello Admin");
		
		return response;
	
	}
	
	@PreAuthorize("hasRole('TEACHER')")
	@GetMapping("/greet-teacher")
	public Map<String,String> greetTeacher()
	{
		Map<String,String> response = new HashMap<>();
		response.put("message", "Hello Teacher");
		
		return response;
	
	}
	
	
	
}
