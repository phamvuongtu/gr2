import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RoomService from '../services/RoomService';

function AddRoomForm({ onAdd }) {
  // State to track form inputs
  const [name, setName] = useState('');
  const [building, setBuilding] = useState('');
  const navigate = useNavigate();
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      // Fetch room details and populate the form if roomId is present
      RoomService.getRoomById(roomId).then((res) => {
        const room = res.data;
        setName(room.roomName);
        setBuilding(room.building);
      });
    }
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRoom = {
      roomName: name,
      building,
    };

    try {
      if (roomId) {
        // If roomId is present, it's an update operation
        await RoomService.updateRoom(roomId, newRoom);
      } else {
        // If roomId is not present, it's a new room creation
        await RoomService.createRoom(newRoom);
      }

      // Clear form inputs after submission
      setName('');
      setBuilding('');
      
      // Navigate back to the previous page
      navigate(-1);
    } catch (error) {
      console.error('Error creating/updating room: ', error);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    // Navigate back to the previous page
    navigate(-1);
  };

  return (
    <div className="card col-md-6 offset-md-3 offset-md-3">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Room Name: </label>
          <input placeholder="Room Name" name="roomName" className="form-control"
            value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Building: </label>
          <input placeholder="Building" name="building" className="form-control"
            value={building} onChange={(e) => setBuilding(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-success me-2" onClick={handleSubmit}>Save</button>
        <button type="button" className="btn btn-danger" onClick={handleCancel} style={{ marginLeft: "10px" }}>Cancel</button>
      </form>
    </div>
  );
}

export default AddRoomForm;