import axios from 'axios';

const COURSE_API_BASE_URL = 'http://localhost:8080/api/courses';

const CourseService = {
  getAllCourses: () => axios.get(COURSE_API_BASE_URL),
  
  getCourseById: (courseId) => axios.get(`${COURSE_API_BASE_URL}/${courseId}`),
  
  createCourse: (course) => axios.post(COURSE_API_BASE_URL, course),
  
  updateCourse: (courseId, updatedCourse) => axios.put(`${COURSE_API_BASE_URL}/${courseId}`, updatedCourse),
  
  deleteCourse: (courseId) => axios.delete(`${COURSE_API_BASE_URL}/${courseId}`),
  
  getCoursesByRoomId: (roomId) => axios.get(`${COURSE_API_BASE_URL}/room/${roomId}`)
};

export default CourseService;
