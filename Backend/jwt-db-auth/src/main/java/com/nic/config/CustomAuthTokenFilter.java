package com.nic.config;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthTokenFilter extends OncePerRequestFilter{

	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private CustomUserDetailService userDetailsService;
	
	
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		ObjectMapper mapper = new ObjectMapper();
		
		Map<String,Object> body = new HashMap<>();
		
		
		try
		{
			String token = parseJwt(request);
			if(token != null && jwtUtils.validateJwtToken(token))
			{
				String username = jwtUtils.getUsernameFromJwtToken(token);
				UserDetails userDetails = userDetailsService.loadUserByUsername(username);
				
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
			
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
				SecurityContextHolder.getContext().setAuthentication(authentication);
				
				
			}
			
			
		}
		
		catch(ExpiredJwtException e )
		{
			
			request.setAttribute("exception", "ExpiredJwtException");
		}
		catch(MalformedJwtException e)
		{
			request.setAttribute("exception", "MalformedJwtException");
		}
		catch(UnsupportedJwtException e)
		{
			request.setAttribute("exception", "UnsupportedJwtException");
		}
		catch(IllegalArgumentException e)
		{
			request.setAttribute("exception", "IllegalArgumentException");
		}
		catch(Exception e)
		{
			
		}
		
		filterChain.doFilter(request, response);
		
		
	}
	
	
	private String parseJwt(HttpServletRequest request)
	{
		String jwt = jwtUtils.getJwtFromHeader(request);
		
		return jwt;
	}
	

}
