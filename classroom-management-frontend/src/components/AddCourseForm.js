import React, { useState, useEffect } from 'react';
import CourseService from '../services/CourseService';
import RoomService from '../services/RoomService';

function AddCourseForm({ roomId, refreshCourses }) {
  const [courseName, setCourseName] = useState('');
  const [loading, setLoading] = useState(false);
  const [roomDetails, setRoomDetails] = useState({ roomName: '', building: '' });

  useEffect(() => {
    // Fetch room details based on roomId
    RoomService.getRoomById(roomId)
      .then((res) => {
        const { roomName, building } = res.data;
        setRoomDetails({ roomName, building });
      })
      .catch((error) => {
        console.error('Error fetching room details:', error);
      });
  }, [roomId]);

  const handleAddCourse = async () => {
    try {
      setLoading(true);

      // Assuming courseDetails is an object containing courseName, roomId, roomName, and building
      const courseDetails = {
        courseName: courseName,
        roomId: roomId,
        room: {
          roomId: roomId,
          roomName: roomDetails.roomName,
          building: roomDetails.building,
        },
      };

      // Call the createCourse function in CourseService to add a new course
      await CourseService.createCourse(courseDetails);


      // Refresh courses after adding a new course
      refreshCourses();

      // Clear the input field
      setCourseName('');
    } catch (error) {
      console.error('Error adding course:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Add a New Course</h3>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter course name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleAddCourse}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Course'}
        </button>
      </div>
    </div>
  );
}

export default AddCourseForm;
