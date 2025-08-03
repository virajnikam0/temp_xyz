package com.nic.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.nic.dto.AssignmentDto;
import com.nic.dto.GetAssignmentDto;
import com.nic.entity.Assignment;
import com.nic.entity.ResponseDto;

public interface AssignmentService {
  public ResponseDto createAssignment(AssignmentDto dto,MultipartFile pdfFile);

  public List<Assignment> getAllAssignments(int classroomId); 
  
  public AssignmentDto getAssignmentDetailsByAssignmentId(int assignmentId);
}
