package com.nic.config;

//import java.awt.PageAttributes.MediaType;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthEntryPoint implements AuthenticationEntryPoint{

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		// TODO Auto-generated method stub
		
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		
		String message = "";
		int statusCode = -1;
		
		if(request.getAttribute("exception").equals("ExpiredJwtException"))
		{
			message = "JWT token expired";
			statusCode = HttpStatus.BAD_REQUEST.value();
		}
		else if(request.getAttribute("exception").equals("MalformedJwtException"))
		{
			message = "Malformed JWT Token";
			statusCode = HttpStatus.BAD_REQUEST.value();
		}
		else if(request.getAttribute("exception").equals("UnsupportedJwtException"))
		{
			message = "Unsupported JWT Token";
			statusCode = HttpStatus.BAD_REQUEST.value();
		}
		else if(request.getAttribute("exception").equals("IllegalArgumentException"))
		{
			message = "Illegal argument exception";
			statusCode = HttpStatus.BAD_REQUEST.value();
		}
		else 
		{
			message = "Unauthorized access to protected resource";
			statusCode = HttpStatus.UNAUTHORIZED.value();
		}
		
		Map<String,Object> body = new HashMap<>();
		
		body.put("status", statusCode);
		body.put("message", message);
		body.put("path", request.getServletPath());
		
		ObjectMapper mapper = new ObjectMapper();
		mapper.writeValue(response.getOutputStream(), body);
	}

}
