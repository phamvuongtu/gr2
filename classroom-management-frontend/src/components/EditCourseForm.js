// EditCourseForm.js
import React, { useState, useEffect } from 'react';
import CourseService from '../services/CourseService';

function EditCourseForm({ courseId, onCancel, onSave, refreshCourses }) {
  const [courseName, setCourseName] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [roomDetails, setRoomDetails] = useState({ roomId: '', roomName: '', building: '' });

  useEffect(() => {
    // Fetch course details and room details based on courseId
    CourseService.getCourseById(courseId)
      .then((res) => {
        const { courseName, room } = res.data;
        setCourseName(courseName);
        setRoomDetails({ roomId: room.roomId, roomName: room.roomName, building: room.building });
      })
      .catch((error) => {
        console.error('Error fetching course details:', error);
      });
  }, [courseId]);

//   useEffect(() => {
//     // Log the updated course details as a JSON object
//     console.log({ courseId, courseName, roomDetails });
//   }, [courseId, courseName, roomDetails]);

  const handleSave = async () => {
    try {
      setLoading(true);

      // Create courseDetails object with updated information
      const courseDetails = {
        courseName: courseName,
        room: {
          roomId: roomDetails.roomId,
          roomName: roomDetails.roomName,
          building: roomDetails.building,
        },
      };

      // Call the updateCourse function in CourseService to update the course
      await CourseService.updateCourse(courseId, courseDetails);

      // Notify the parent component about the save
      onSave();

      // Refresh courses after updating the course, if refreshCourses is provided
      if (refreshCourses) {
        refreshCourses();
      }
    } catch (error) {
      console.error('Error updating course:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Edit Course</h3>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter course name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <button className="btn btn-primary" type="button" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-secondary" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditCourseForm;