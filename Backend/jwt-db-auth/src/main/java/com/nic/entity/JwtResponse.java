package com.nic.entity;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {

	private String token;
	
	private String username;
	
	private List<String> role;
	
	private int status;
	
}
