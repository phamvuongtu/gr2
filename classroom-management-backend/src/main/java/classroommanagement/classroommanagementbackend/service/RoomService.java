package classroommanagement.classroommanagementbackend.service;


import classroommanagement.classroommanagementbackend.entity.Room;
import classroommanagement.classroommanagementbackend.repo.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }
    public List<Room> getAllRoomsOrderedById() {
        return roomRepository.findAll(Sort.by(Sort.Order.asc("roomId")));
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}

