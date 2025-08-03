package com.nic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DownloadServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DownloadServiceApplication.class, args);
		System.out.println("<----------------------------------------------- SERVER STARTED AT PORT 8093 --------------------------------------------------------->");
	}

}
