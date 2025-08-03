package com.nic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nic.config.User;
import com.nic.dto.RegisterTeacherDto;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	
	
	public User findByEmail(String email);
	
	@Query(value="SELECT name,email from User where role = 'ROLE_TEACHER'", nativeQuery = true)
	public List<RegisterTeacherDto> getRegisteredTeachers();
	
}
