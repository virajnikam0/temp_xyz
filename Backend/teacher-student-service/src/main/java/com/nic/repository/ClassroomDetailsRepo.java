package com.nic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nic.entity.ClassroomDetails;



public interface ClassroomDetailsRepo extends JpaRepository<ClassroomDetails, Integer>{

	@Query(value="SELECT * FROM classroom_details c where c.teacher_id=?1 ", nativeQuery = true)
	public List<ClassroomDetails> getClassroomByUserId(int userId);
	
	@Query(value="select * from classroom_details c where c.classroom_id=?1",nativeQuery = true)
	public ClassroomDetails getClassroomDetailsByClassroomId(int classroomId);
	
	@Query(value="FROM ClassroomDetails c where c.classRoomCode=?1 ")
	public ClassroomDetails getClassroomByClassroomCode(String classroomCode);
}
