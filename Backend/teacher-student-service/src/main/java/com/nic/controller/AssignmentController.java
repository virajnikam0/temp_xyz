package com.nic.controller;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nic.dto.AssignmentDto;
import com.nic.dto.GetAssignmentDto;
import com.nic.entity.Assignment;
import com.nic.entity.ResponseDto;
import com.nic.repository.AssignmentRepo;
import com.nic.service.AssignmentService;

@RestController
@RequestMapping("/api/v1")
public class AssignmentController {
 
	
	@Autowired
	private AssignmentService assignmentService;
	
	@Autowired
	private AssignmentRepo assignmentRepo;
	
	 
	
	
	@PreAuthorize("hasRole('TEACHER')")
	@PostMapping(value = "/create-assignment", consumes = {"multipart/form-data"})
	public ResponseDto createAssignment(
		@RequestPart("assignmentDto") AssignmentDto assignmentDto,
		@RequestParam("assignment") MultipartFile pdfFile
	)
	{
		
				
		return assignmentService.createAssignment(assignmentDto, pdfFile);
			
	}	
	
	@PreAuthorize("hasRole('TEACHER')")
	@GetMapping("/classroom-assignment/{id}")
	public List<Assignment> getAssignments(@PathVariable("id") int classroomId) {
		return assignmentService.getAllAssignments(classroomId);
	}
	
	
	@PreAuthorize("hasAnyRole('TEACHER', 'USER')")
	@GetMapping("/assignment/{id}")
	public AssignmentDto getAssignmentDetailsByAssignmentId(@PathVariable("id") int assignmentId)
	{
		return assignmentService.getAssignmentDetailsByAssignmentId(assignmentId);
	}
	
	@PreAuthorize("hasRole('Teacher')")
	@GetMapping("/download-assignment/{id}")
	public ResponseEntity<Resource> downloadAssignment(@PathVariable("id") int assignmentId)
	{
		System.out.println("API Hitt : "+assignmentId);
		Assignment assignment = assignmentRepo.getByAssignmentId(assignmentId);
		
		try {
				String filePath = assignment.getFilePath()+"\\" + assignment.getAssignmentId() + "\\Assignment.pdf";
				Path path = Paths.get(filePath).normalize();
				
				Resource resource = new UrlResource(path.toUri());
				
				return ResponseEntity.ok()
									 .contentType(MediaType.APPLICATION_PDF)
									 .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"Assignment.pdf\"")
									 .body(resource);
			
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		return null;
	}
	
}
