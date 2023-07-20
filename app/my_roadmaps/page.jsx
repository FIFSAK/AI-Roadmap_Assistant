'use client'
import axios from 'axios';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import Loading from './Loading';

const useRoadmaps = (email) => {
  const [roadmaps, setRoadmaps] = useState(null);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await axios.get(`https://roadmap-back-zntr.onrender.com/user_roadmaps?email=${email}`);
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

  const deleteRoadmap = async (index) => {
    try {
      const res = await axios.delete(`https://roadmap-back-zntr.onrender.com/delete_roadmap?email=${email}&index=${index}`);
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

const UserRoadmaps = async () => {
  try {
      const { email } = await axios.post('http://127.0.0.1:8000/user_email', {
      email: session.user.email
    })
  } catch (err) {
    console.error(err)
  }
  const { roadmaps, deleteRoadmap } = useRoadmaps(email);
  const [shownRoadmapIndex, setShownRoadmapIndex] = useState(null);
  if (!email) {
    if (typeof window !== 'undefined') {
      window.location.href = "/"; // replace /login with your login page's path
    }
    return null; // Don't render the component
  }

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

// Outside your component, declare these styles:

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
  marginBottom: "20px", // Move marginBottom here from titleStyle
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
  alignSelf: "center", // Ensure the button aligns with the center of the title
  marginLeft: "20px",
};
const contentStyle = {
  color: "#4f4f4f",
  lineHeight: "1.5",
  whiteSpace: "pre-wrap", // This will respect your '\n' new lines in the text
};

export default UserRoadmaps;
