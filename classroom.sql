CREATE TABLE rooms (
  room_id SERIAL PRIMARY KEY,
  room_name VARCHAR(255) NOT NULL,
  building VARCHAR(255) DEFAULT 'Unknown'
);

CREATE TABLE courses (
  course_id SERIAL PRIMARY KEY,
  course_name VARCHAR(255) NOT NULL,
  room_id INT REFERENCES rooms(room_id) ON DELETE CASCADE
);