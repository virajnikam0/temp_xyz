package com.nic.config;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nic.dto.ErrorResponse;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

	private final ObjectMapper objectMapper = new ObjectMapper();
	
	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
			AccessDeniedException accessDeniedException) throws IOException, ServletException {
		
		ErrorResponse error = new ErrorResponse();
		error.setMessage("Unauthorized Access to protected resource");
		error.setStatusCode(HttpStatus.UNAUTHORIZED.value());
		error.setPath(request.getServletPath());
		error.setTime(new Date().toLocaleString());
		
		response.setContentType("application/json");
		response.setStatus(HttpStatus.UNAUTHORIZED.value());
		
		 response.getWriter().write(objectMapper.writeValueAsString(error));
		
	}

}
