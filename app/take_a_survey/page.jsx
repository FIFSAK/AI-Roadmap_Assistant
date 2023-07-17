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

  const handleResponseChange = (index, response) => {
    setResponses(prevResponses => {
      const newResponses = [...prevResponses];
      newResponses[index] = response;
      return newResponses;
    });
  };

  return (
    <div>
      <h1>Survey</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{question}</p>
          {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map(response => (
            <label key={response}>
              <input
                type="radio"
                value={response}
                checked={responses[index] === response}
                onChange={() => handleResponseChange(index, response)}
              />
              {response}
            </label>
          ))}
        </div>
      ))}
      <button onClick={() => console.log(responses)}>Submit</button>
    </div>
  );
};

export default SurveyPage;
