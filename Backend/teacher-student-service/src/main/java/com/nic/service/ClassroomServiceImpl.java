package com.nic.service;

import java.io.File;
import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.cors.CorsConfigurationSource;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.nic.dto.ClassroomDetailsDto;
import com.nic.entity.ClassroomDetails;
import com.nic.entity.ResponseDto;
import com.nic.repository.ClassroomDetailsRepo;

import jakarta.transaction.Transactional;

@Service
public class ClassroomServiceImpl implements ClassroomService{

    private final CorsConfigurationSource corsConfigurationSource;
	
	@Autowired
	private ClassroomDetailsRepo classroomDetailsRepo;

    ClassroomServiceImpl(CorsConfigurationSource corsConfigurationSource) {
        this.corsConfigurationSource = corsConfigurationSource;
    }

	@Transactional
	@Override
	public ResponseDto createClassroom(ClassroomDetailsDto obj, int userId) {
		
		LocalDateTime currentDts = LocalDateTime.now(); 
		
		ClassroomDetails classRoom = new ClassroomDetails();
		
		classRoom.setTitle(obj.getTitle());
		classRoom.setDescription(obj.getDescription());
		classRoom.setClassRoomCode(obj.getClassroomCode());
		classRoom.setCreatedDts(currentDts.toString() );
		classRoom.setTeacherId(userId);
		
		classRoom = classroomDetailsRepo.save(classRoom);
		
		String path="D:\\Drive(F)\\Sunbeam LMS\\lms\\lms_data\\"+classRoom.getClassRoomId();
		
		File directory=new File(path);
		
		if(!directory.exists()) {
			boolean created=directory.mkdirs();
			System.out.println("directory created");
			
		}
		else {
			System.out.println("directory exist");
		}
		
		ResponseDto response = new ResponseDto();
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		response.setMessage("Classroom created successfully");
		response.setData(classRoom);
		
		return response;
	}

	@Override
	public ResponseDto getClassroomDetails(int classroomId) {
		ClassroomDetails classroom=new ClassroomDetails();
		classroom=classroomDetailsRepo.getClassroomDetailsByClassroomId(classroomId);
		ResponseDto response = new ResponseDto();
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		response.setMessage("classroom details fetched successfully");
		response.setData(classroom);
		
		return response;
	}

}
