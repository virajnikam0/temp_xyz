package com.nic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TeacherStudentServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TeacherStudentServiceApplication.class, args);
		System.out.println("<------------------------------------- teacher-student-service started --------------------------------------------->");
	}

}
