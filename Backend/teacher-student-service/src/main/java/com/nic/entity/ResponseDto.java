package com.nic.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDto {

	private String status;
	private int statusCode;
	private Object data;
	private String message;
	
}
