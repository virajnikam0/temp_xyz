package com.nic.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nic.repository.UserRepository;

@Service
public class CustomUserDetailService implements UserDetailsService  {

	@Autowired
	private UserRepository userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = userRepo.findByEmail(username);
		
		if(user == null)
		{
			
			throw new UsernameNotFoundException("Username not found");
		}
		
		return new CustomUserDetails(user);
	}

	
	
}
