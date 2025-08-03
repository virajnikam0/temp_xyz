package com.nic.service;

import java.io.File;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nic.dto.AssignmentDto;
import com.nic.entity.Assignment;
import com.nic.entity.ResponseDto;
import com.nic.repository.AssignmentRepo;

import jakarta.transaction.Transactional;

@Service
public class AssignmentServiceImpl implements AssignmentService {
	
	 @Autowired
	  private ModelMapper modelMapper;
	 
	 @Autowired
	 private AssignmentRepo assignmentRepo;

	@Transactional
	@Override
	public ResponseDto createAssignment(AssignmentDto assignmentDto, MultipartFile pdfFile) {
		
		 ResponseDto response=new ResponseDto();
		 System.out.println("assignment details : "+assignmentDto);
		
		System.out.println("File name : "+pdfFile.getName());
		System.out.println("File Size : "+pdfFile.getSize());
		
		
		Assignment entity = modelMapper.map(assignmentDto, Assignment.class);
		entity.setMaxMarks((int)assignmentDto.getMarks());
		
		
		
		SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd");
		
//		String formattedDate = formater.format(assignmentDto.getDueDate());
//	     System.out.println("Date formatted : "+formattedDate);
	     entity.setAssignmentId(0);

//	     entity.setDueDate(formattedDate);
	     
	     
	     String path="D:\\Drive(F)\\Sunbeam LMS\\lms\\lms_data\\"+assignmentDto.getClassroomId();


	     entity.setFilePath(path);
	     
	     
		 assignmentRepo.save(entity);
		 
		 
		 try
		 {
			 File directory=new File(path + "\\" + entity.getAssignmentId());
			 if(!directory.exists()) {
					boolean created=directory.mkdirs();
					System.out.println("directory created");
					
			}
			 
			 Path filePath = Paths.get(path + "\\" + entity.getAssignmentId() + "\\Assignment.pdf");
			 
			 
			 pdfFile.transferTo(filePath.toFile());
			 
		 }
		 catch(IOException e)
		 {
			 response.setMessage("Failed to create assignment");
			 response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
			 return response;
		 }
		 
		
		
		response.setStatusCode(HttpStatus.OK.value());
		response.setMessage("Assignment created successfully");
 
		return response;
	}

	@Override
	public List<Assignment> getAllAssignments(int classroomId) {
		List<Assignment> assignment = new ArrayList<>();
		assignment=assignmentRepo.getAssignmentsByClassroomId(classroomId);

//		GetAssignmentDto getAssignments=new GetAssignmentDto();
//		getAssignments.set;		

		return assignment;
	}
	
	public AssignmentDto getAssignmentDetailsByAssignmentId(int assignmentId)
	{
		return assignmentRepo.getAssignmentByAssignmentId(assignmentId);
	}
	
}
