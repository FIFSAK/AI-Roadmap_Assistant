'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

const useMessages = (email) => {
  const [roadmaps, setRoadmaps] = useState(null);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await axios.get(`https://roadmap-back-zntr.onrender.com/docs#/default/get_user_roadmaps_user_roadmaps_get?email=${email}`);
        if (res.status === 200) {
          setRoadmaps(res.data.roadmaps);
          console.log(res.data.roadmaps)
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

const UserRoadmaps = ({ searchParams }) => {
  const { email } = searchParams;
  const roadmaps = useMessages(email);

  if (roadmaps === null) {
    return <p>Loading...</p>;
  }

  if (!roadmaps || roadmaps.length === 0) {
    return <p>No roadmaps found</p>;
  }

  const formatRoadmapText = (text) => {
    const formattedText = text.replace(/\n/g, '<br />')
      .replace(/(http:\/\/|https:\/\/|www\.)[\w.-]+(\.[\w.-]+)+([\w.,@?^=%&:;\/~+#-]*[\w@?^=%&\/~+#-])?/g, '<a href="$&" target="_blank" rel="noopener noreferrer">$&</a>');
    return { __html: formattedText };
  };

  return (
    <div>
      <h1>User Roadmaps</h1>
      {roadmaps.map((roadmap, index) => (
        <div key={index}>
          <h2>Roadmap {index + 1}</h2>
          <p>{parse(formatRoadmapText(roadmap).__html)}</p>
        </div>
      ))}
    </div>
  );
};

export default UserRoadmaps;
