package com.nic.controller;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import com.nic.entity.Assignment;
import com.nic.repository.AssignmentRepo;

@RestController
@RequestMapping("/api/v1")
public class DownloadAssignmentController {

	
	@Autowired
	private AssignmentRepo assignmentRepo;
	
	@GetMapping("/download-assignment/{id}")
	public ResponseEntity<Resource> downloadTeacherAssignment(@PathVariable("id") int assignmentId)
	{
		
		
		Assignment assignment = assignmentRepo.getByAssignmentId(assignmentId);
		
		String filePath = assignment.getFilePath()+"\\" + assignment.getAssignmentId() + "\\Assignment.pdf";
		Path path = Paths.get(filePath).normalize();
		Resource resource = null;
		try {
			resource = new UrlResource(path.toUri());
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		return ResponseEntity.ok()
				 .contentType(MediaType.APPLICATION_PDF)
				 .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"Assignment.pdf\"")
				 .body(resource);
	}
	
}
