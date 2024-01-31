import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoomList from './components/RoomList';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AddRoomForm from './components/AddRoomForm';
import CourseListForRoom from './components/CourseListForRoom';

function App() {
  return (
    <>
    <Header />
    <Router>
      <div className="container-fluid d-flex" style={{paddingTop: '70px', paddingBottom: '70px' }}>
        <div className="menu-container bg-light" style={{ width: '200px', height: 'max' }}>
          <ul>
            <li><a href="/">Lecture Hall Management</a></li>
          </ul>
        </div>
        <div className="container mt-4" style={{ marginLeft: '20px'}}>
          <Routes>
            <Route path="/" element={<RoomList />}/>
            <Route path="/rooms" element={<RoomList />}/>
            <Route path="/add-rooms" element={<AddRoomForm />}/>
            <Route path="/add-rooms/:roomId" element={<AddRoomForm />} />
            <Route path="/courses/room/:roomId" element={<CourseListForRoom />} />
          </Routes>
        </div>
      </div>
    </Router>
    <Footer />
    </>
  );
}

export default App;