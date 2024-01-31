import axios from 'axios';

const ROOM_API_BASE_URL = "http://localhost:8080/api/rooms";

const RoomService = {
  getRooms: () => axios.get(ROOM_API_BASE_URL),
  
  createRoom: (room) => axios.post(ROOM_API_BASE_URL, room),
  
  getRoomById: (roomId) => axios.get(`${ROOM_API_BASE_URL}/${roomId}`),
  
  updateRoom: (roomId, room) => axios.put(`${ROOM_API_BASE_URL}/${roomId}`, room),
  
  deleteRoom: (roomId) => axios.delete(`${ROOM_API_BASE_URL}/${roomId}`)
};

export default RoomService;
