package com.nic.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nic.config.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	
	
	public User findByEmail(String email);

}


