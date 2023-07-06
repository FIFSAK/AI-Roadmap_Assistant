'use client'
import { useState } from 'react';
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
                <div className={s.card} key={index}>
                    <div onClick={() => showdesc(index)}>{major[1].name}</div>
                    <div className={index === shownDescIndex ? `${s.show}` : `${s.hide}`}>{major[1].description}</div>
                </div>
            ))}
        </div>
    );
};

const MajorsPage = () => {
    return <div className={s.cont}> <MajorsList /> </div>
};

export default MajorsPage;