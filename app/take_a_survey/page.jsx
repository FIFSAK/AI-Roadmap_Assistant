'use client'
import React, { useState } from 'react';

const questions = [
  "Do you enjoy solving complex mathematical problems?",
  "Are you comfortable working with numbers and statistics?",
  "Do you have strong attention to detail?",
  "Are you creative and enjoy designing or drawing?",
  "Do you like working with people and helping them solve their problems?",
  "Do you prefer working in a team or independently?",
  "Are you interested in how software applications work or more fascinated by how the hardware operates?",
  "Do you enjoy reading and writing more than playing with gadgets?",
  "Are you interested in exploring new technological trends like Artificial Intelligence and Machine Learning?",
  "Do you prefer a role that involves a lot of analysis and problem solving?",
  "Are you more interested in web development (working on websites and web applications) or mobile development (creating apps for smartphones and tablets)?",
  "Do you like to play video games? Would you be interested in creating them?",
  "Do you have good communication skills and would like a role that involves a lot of interaction with clients and team members?",
  "Do you enjoy taking a large amount of information and organizing it in a meaningful way?",
  "Are you intrigued by cyber security and the thought of protecting systems from threats?",
  "Do you enjoy learning new languages (like programming languages)?",
  "Are you interested in the business side of technology, like project management or business analysis?",
  "Would you prefer a job that is constantly evolving and requires continuous learning?",
  "Are you comfortable with abstraction and conceptualizing ideas?",
  "Do you like to troubleshoot and fix things when they go wrong?"
];

const SurveyPage = () => {
  const [responses, setResponses] = useState(Array(questions.length).fill(''));
  const [modalText, setModalText] = useState('');
  const [showModal, setShowModal] = useState(false); 

  const handleResponseChange = (index, response) => {
    setResponses(prevResponses => {
      const newResponses = [...prevResponses];
      newResponses[index] = response;
      return newResponses;
    });
  };
  const handleSubmit = async () => {
    const allQuestionsAnswered = responses.every(response => response !== '');
    if (!allQuestionsAnswered) {
      setModalText("Please answer all questions");
      setShowModal(true);
      return;
    }
  
    const jwt = localStorage.getItem('jwt');

    const response = await fetch('http://127.0.0.1:8000/receive_answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}` // Added this line
      },
      body: JSON.stringify({ answers: responses }),
    });

    if (response.ok) {
      const responseBody = await response.json();  
      if (responseBody.message) {
        setModalText(responseBody.message);
        setShowModal(true);
      } else {
        console.log("Unexpected server response:", responseBody);
      }
    } else {
      console.log("Error sending responses");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>Survey</h1>
      {questions.map((question, index) => (
        <div key={index} style={{ marginBottom: "20px", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
          <p style={{ fontWeight: "bold" }}>{question}</p>
          {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map(response => (
            <label key={response} style={{ display: "block", margin: "5px 0" }}>
              <input
                type="radio"
                value={response}
                checked={responses[index] === response}
                onChange={() => handleResponseChange(index, response)}
                style={{ marginRight: "10px" }}
              />
              {response}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} style={{ display: "block", margin: "0 auto", padding: "10px 20px", background: "#007BFF", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Submit
      </button>
      {showModal && 
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "5px", width: "80%", maxWidth: "500px" }}>
            <h2>Message:</h2>
            <p>{modalText}</p>
            <button onClick={() => setShowModal(false)} style={{ display: "block", margin: "20px auto", padding: "10px 20px", background: "#007BFF", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
              Close
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default SurveyPage;
