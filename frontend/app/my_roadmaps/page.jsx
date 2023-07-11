'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useMessages = (email) => {
    const [roadmaps, setRoadmaps] = useState(null);
  
    useEffect(() => {
      const fetchRoadmaps = async () => {
        console.log(email)
        try {
            const res = await axios.get(`http://127.0.0.1:8000/user_roadmaps?email=${email}`);

          
            if (res.status === 200) {
                setRoadmaps(res.data.roadmaps);
          } else {
            console.error('Error:', res.status);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
  
      fetchRoadmaps();
    }, [email]);
  
    return roadmaps;
};

const UserRoadmaps = ({ email }) => {
    const roadmaps = useMessages(email);
  
    if (roadmaps === null) {
      return <p>Loading...</p>;
    }
  
    if (roadmaps.length === 0) {
      return <p>No roadmaps found</p>;
    }
  
    return (
      <div>
        <h1>User Roadmaps</h1>
        {roadmaps.map((roadmap, index) => (
          <div key={index}>
            <h2>Roadmap {index + 1}</h2>
            <p>{roadmap}</p>
          </div>
        ))}
      </div>
    );
};

export default UserRoadmaps;
