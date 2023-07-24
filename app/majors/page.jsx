'use client'
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import majorsData from './majorsData.json';
import s from './page.module.css';

const MajorsList = () => {
    const majors = Object.entries(majorsData);
    const [shownDescIndex, setShownDescIndex] = useState(null);

    function showdesc(index) {
        setShownDescIndex(index === shownDescIndex ? null : index);
    }

    return (
        <div className={s.container}>
            {majors.map((major, index) => (
                <div className={`${s.card} ${index === shownDescIndex ? s.active : ''}`} key={index}>
                    <div className={s.name} onClick={() => showdesc(index)}>{major[1].name}</div>
                    <div className={`${s.description} ${index === shownDescIndex ? s.show : ''}`}>{major[1].description}</div>
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