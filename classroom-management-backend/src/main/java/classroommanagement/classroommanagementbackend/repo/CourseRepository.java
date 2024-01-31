package classroommanagement.classroommanagementbackend.repo;

import classroommanagement.classroommanagementbackend.entity.Course;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByRoomRoomId(Long roomId, Sort sort);
}
