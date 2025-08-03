package com.nic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nic.dto.AssignmentDto;
import com.nic.entity.Assignment;

public interface AssignmentRepo extends JpaRepository<Assignment, Long>{

	@Query(value="select * from assignment a where a.classroom_id=?1", nativeQuery = true )
	public List<Assignment> getAssignmentsByClassroomId(int classroomId);

	@Query("Select new com.nic.dto.AssignmentDto(a.assignmentId,a.classroomId, a.title,a.description,a.dueDate, a.maxMarks ) from Assignment a where a.assignmentId=?1")
	public AssignmentDto getAssignmentByAssignmentId(int assignmentId);
	
	@Query("From Assignment a where a.assignmentId=?1")
	public Assignment getByAssignmentId(long assignmentId);
	
}
