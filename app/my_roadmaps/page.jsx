'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import Loading from './Loading';

const useRoadmaps = () => {
  const [roadmaps, setRoadmaps] = useState(null);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const jwt = localStorage.getItem('jwt');
        const res = await axios.get('https://roadmap-back-zntr.onrender.com/user_roadmaps', {
          headers: {
              'Authorization': `Bearer ${jwt}`
          }
      });
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
  }, []);

  const deleteRoadmap = async (index) => {
    try {
      const jwt = localStorage.getItem('jwt');
      const res = await axios.delete('https://roadmap-back-zntr.onrender.com/delete_roadmap', {
        headers: {
          'Authorization': `Bearer ${jwt}`
        },
        data: {
          index: index,
        }
      });
      if (res.status === 200) {
        setRoadmaps(prevRoadmaps => prevRoadmaps.filter((_, i) => i !== index));
      } else {
        console.error('Error:', res.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  return { roadmaps, deleteRoadmap };
  };
  

const UserRoadmaps = () => {
  const { roadmaps, deleteRoadmap } = useRoadmaps();
  const [shownRoadmapIndex, setShownRoadmapIndex] = useState(null);

  if (roadmaps === null) {
    return <Loading />;
  }

  if (!roadmaps || roadmaps.length === 0) {
    return <p>No roadmaps found</p>;
  }

  const formatRoadmapText = (text) => {
    const formattedText = text.replace(/\n/g, '<br />')
      .replace(/(http:\/\/|https:\/\/|www\.)[\w.-]+(\.[\w.-]+)+([\w.,@?^=%&:;\/~+#-]*[\w@?^=%&\/~+#-])?/g, '<a href="$&" target="_blank" rel="noopener noreferrer">$&</a>');
    return { __html: formattedText };
  };

  const showRoadmap = (index) => {
    setShownRoadmapIndex(index === shownRoadmapIndex ? null : index);
  };

  return (
    <div style={{ padding: "50px", backgroundColor: "#f3f3f3", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#4f4f4f", marginBottom: "50px" }}>User Roadmaps</h1>
      {roadmaps.map((roadmap, index) => (
        <div style={cardStyle} key={index}>
          <div style={titleRowStyle}>
            <h2 style={titleStyle} onClick={() => showRoadmap(index)}>
              Roadmap {index + 1}
            </h2>
            <button style={deleteButtonStyle} onClick={() => deleteRoadmap(index)}>Delete</button>
          </div>
          {shownRoadmapIndex === index && <p style={contentStyle}>{parse(formatRoadmapText(roadmap).__html)}</p>}
        </div>
      ))}
    </div>
  );
};

const cardStyle = {
  backgroundColor: "white",
  borderRadius: "15px",
  boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
  marginBottom: "30px",
  padding: "20px",
};

const titleRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const titleStyle = {
  cursor: "pointer",
  color: "#3f51b5",
};

const deleteButtonStyle = {
  backgroundColor: "red",
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "5px 10px",
  cursor: "pointer",
  alignSelf: "center",
  marginLeft: "20px",
};

const contentStyle = {
  color: "#4f4f4f",
  lineHeight: "1.5",
  whiteSpace: "pre-wrap",
};

export default UserRoadmaps;