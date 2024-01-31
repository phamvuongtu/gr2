import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomService from '../services/RoomService';

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    RoomService.getRooms().then((res) => {
      setRooms(res.data);
    });
  }, []);

  // Navigate to the "Add new Lecture Hall" page
  const addRoom = () => {
    navigate("/add-rooms");
  }

  const handleUpdate = (roomId) => {
    navigate(`/add-rooms/${roomId}`);
  }

  const handleDelete = async (roomId) => {
    try {
      await RoomService.deleteRoom(roomId);
      setRooms((prevRooms) => prevRooms.filter((room) => room.roomId !== roomId));
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const handleView = (roomId) => {
    navigate(`/courses/room/${roomId}`);
  };  

  return (
    <div className="classroom-list-container">
      <h2 className='text-center'>Lecture Hall Management</h2>

      <div className="row">
        <div className="col-md-12">
          <button className="btn btn-primary w-100" onClick={addRoom}>
            Add new Lecture Hall
          </button>
        </div>
      </div>
      <br />

      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>No</th>
            <th>Name of lecture hall</th>
            <th>Building</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room, index) => (
            <tr key={room.roomId}>
              <td>{index + 1}</td>
              <td>{room.roomName}</td>
              <td>{room.building}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleUpdate(room.roomId)}>Edit </button>
                <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(room.roomId)} className="btn btn-danger">Delete </button>
                <button style={{ marginLeft: "10px" }} onClick={() => handleView(room.roomId)} className="btn btn-info">View </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RoomList;