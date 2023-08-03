'use client'
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
// import majorsData from './majorsData.json';
import s from './page.module.css';
const majorsData = [
    {
      name: "Computer Science",
      description:
        "A vast field that explores the depths of computers and computing technologies. This includes understanding the principles of algorithms (step-by-step instructions on how to solve a problem) and data structures (the organization and storage of data), to more advanced topics like how computer systems are built (computer architecture) and the creation of intelligent machines (artificial intelligence).",
    },
    {
      name: "Information Systems",
      description:
        "Centers on how technology can help businesses and organizations operate in a more streamlined and effective way. It's a fascinating combination of business practices and tech-savviness, requiring a solid understanding of both worlds.",
    },
    {
      name: "Software Engineering",
      description:
        "Much like traditional engineering, software engineering is about designing, building, and improving software in a way that ensures it is of high quality, affordable, easy to maintain, and quick to create. It's about applying engineering principles to the world of software, making complex systems manageable and efficient.",
    },
    {
      name: "Cybersecurity",
      description:
        "A crucial field focused on safeguarding systems, networks, and programs from digital threats and attacks. These attacks often have the goal of accessing, altering, or destroying sensitive information, extorting money from users, or disrupting normal business operations. A cybersecurity specialist is like a digital guardian, defending valuable data and systems.",
    },
    {
      name: "Data Science",
      description:
        "An interdisciplinary field that uses scientific methods, processes, algorithms, and systems to mine valuable insights from data, both structured (organized data) and unstructured (disorganized data). A data scientist needs to know how to make predictions from data, which requires a good grasp of statistics, machine learning (computers learning from data), and programming.",
    },
    {
      name: "Network Administration/Engineering",
      description:
        "This field involves designing, implementing, and managing the networks that connect computers within an organization. This includes small local area networks (LANs) that connect computers in a single location, wide area networks (WANs) that connect locations across the world, and other systems that enable data communication.",
    },
    {
      name: "Cloud Computing",
      description:
        "This is all about using the Internet ('the cloud') to provide computing services, such as servers, storage, databases, networking, software, analytics, and intelligence. Cloud computing enables faster technological innovation, more flexible resources, and substantial cost savings.",
    },
    {
      name: "Health Informatics",
      description:
        "Where healthcare, information technology, and business administration meet. This field focuses on managing healthcare information and implementing technology in medical environments. It's about improving healthcare through technology.",
    },
    {
      name: "Artificial Intelligence (AI) and Machine Learning (ML)",
      description:
        "This involves creating and applying algorithms that allow computers to learn from data and make decisions or predictions. It's an exciting and rapidly growing field with a variety of applications, such as making financial predictions, diagnosing health conditions, and even powering self-driving cars.",
    },
    {
      name: "Bioinformatics",
      description:
        "A blend of biology, computer science, information engineering, mathematics, and statistics used to analyze and interpret biological data. Bioinformaticians might work on tasks such as mapping a genome, predicting protein function, or modeling biological systems.",
    },
    {
      name: "Human-Computer Interaction (HCI)",
      description:
        "A specialty focused on improving the interaction between humans and computers. The goal is to make user interfaces—like those on your smartphone or laptop—that are intuitive and user-friendly. HCI professionals want to make technology easy and enjoyable to use.",
    },
    {
      name: "Systems Analysis",
      description:
        "This involves examining an organization's existing computer systems and procedures, then designing solutions to help the organization operate more smoothly and effectively. Systems analysts are like technology detectives, looking for ways to improve efficiency and productivity.",
    },
    {
      name: "Database Administration",
      description:
        "This field is all about the use and management of databases. Database administrators are responsible for storing, organizing, and protecting data, ensuring it's available to users when they need it. They're like the librarians of the digital world.",
    },
    {
      name: "Web Development",
      description:
        "This field is all about designing and building websites. It's usually divided into two main parts: front-end development (creating the parts of a website users interact with) and back-end development (setting up the servers that store a website's data).",
    },
    {
      name: "Digital Media",
      description:
        "This field involves creating and managing digital content, such as images, videos, audio, and interactive elements. This content can be used in a wide variety of ways, from enhancing marketing and advertising campaigns, to improving the design of websites and apps.",
    },
    {
      name: "IT Project Management",
      description:
        "This applies project management principles to IT projects. It involves planning, executing, and overseeing the implementation of IT services and systems. It's about keeping tech projects on time and within budget.",
    },
    {
      name: "Game Development",
      description:
        "A fun and creative field that's all about making video games. This requires knowledge in areas like computer graphics (creating the look of the game), artificial intelligence (making non-player characters seem real), and software engineering (making the game work).",
    },
  ];
  
  const MajorsList = () => {
    const [shownDescIndex, setShownDescIndex] = useState(null);
  
    function showdesc(index) {
      setShownDescIndex((prevIndex) => (prevIndex === index ? null : index));
    }
  
    return (
      <div className={s.container}>
        {majorsData.map((major, index) => (
          <div className={`${s.card} ${index === shownDescIndex ? s.active : ''}`} key={index}>
            <div className={s.name} onClick={() => showdesc(index)}>
              {major.name}
            </div>
            <div className={`${s.description} ${shownDescIndex === index ? s.show : ''}`}>
              {major.description}
            </div>
          </div>
        ))}
      </div>
    );
  };




const MajorsPage = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsUserLoggedIn(Boolean(localStorage.getItem('jwt')));
        }
    }, []);
    if (!isUserLoggedIn) {
        redirect('/')
    }
    return <div className={s.cont}> <MajorsList /> </div>
};

export default MajorsPage;