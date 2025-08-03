package com.nic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JwtDbAuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(JwtDbAuthApplication.class, args);
		System.out.println("<================================================= SERVER STARTED AT PORT 8090 =================================================>");
	}

}
