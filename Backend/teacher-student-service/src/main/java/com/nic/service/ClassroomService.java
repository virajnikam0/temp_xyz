package com.nic.service;

import com.nic.dto.ClassroomDetailsDto;
import com.nic.entity.ResponseDto;

public interface ClassroomService {

	public ResponseDto createClassroom(ClassroomDetailsDto obj, int userId);
	
	public ResponseDto getClassroomDetails(int classroomId);
}
