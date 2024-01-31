// CourseListForRoom.js
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import CourseService from '../services/CourseService';
import AddCourseForm from './AddCourseForm';
import EditCourseForm from './EditCourseForm'; // Import EditCourseForm

function CourseListForRoom() {
  const [courses, setCourses] = useState([]);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const { roomId } = useParams();

  const refreshCourses = useCallback(() => {
    CourseService.getCoursesByRoomId(roomId)
      .then((res) => {
        setCourses(res.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, [roomId]);

  useEffect(() => {
    refreshCourses();
  }, [refreshCourses, roomId]);

  const handleEdit = (id) => {
    // Set the editingCourseId to trigger rendering of EditCourseForm
    setEditingCourseId(id);
  };

  const handleCancelEdit = () => {
    // Reset editingCourseId to exit edit mode
    setEditingCourseId(null);
  };

  const handleSaveEdit = () => {
    // Reset editingCourseId after saving changes
    setEditingCourseId(null);
    // Refresh courses after editing
    refreshCourses();
  };

  const handleDelete = async (id) => {
    try {
      await CourseService.deleteCourse(id);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.courseId !== id)
      );
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="course-list-container">
      <h2 className="text-center">Course List</h2>

      {editingCourseId ? (
        <EditCourseForm
          courseId={editingCourseId}
          onCancel={handleCancelEdit}
          onSave={handleSaveEdit}
        />
      ) : (
        <AddCourseForm roomId={roomId} refreshCourses={refreshCourses} />
      )}

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>STT</th>
            <th>Course Name</th>
            <th>Room Name</th>
            <th>Building</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course, index) => (
            <tr key={course.courseId}>
              <td>{index + 1}</td>
              <td>{course.courseName}</td>
              <td>{course.room ? course.room.roomName : 'N/A'}</td>
              <td>{course.room ? course.room.building : 'N/A'}</td>
              <td>
                {/* Edit button */}
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(course.courseId)}
                >
                  Edit
                </button>

                {/* Delete button */}
                <button
                  style={{ marginLeft: '10px' }}
                  onClick={() => handleDelete(course.courseId)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseListForRoom;