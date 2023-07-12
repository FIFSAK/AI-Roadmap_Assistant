'use client'

import axios from 'axios';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { useEffect, useState } from 'react';


const useMessages = (email) => {
  const [roadmaps, setRoadmaps] = useState(null);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/user_roadmaps?email=${email}`);
        console.log(res.status)
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

const UserRoadmaps = (props) => {
  const { email } = props.searchParams;
  const roadmaps = useMessages(email);

  if (roadmaps === null) {
    return <p>Loading...</p>;
  }

  if (!roadmaps || roadmaps.length === 0) {
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
