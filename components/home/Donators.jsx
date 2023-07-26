import React from 'react';

const Donators = ({ donators }) => {
    return (
        <div className="w-full h-full p-4 bg-white rounded shadow">
            <h3 className="text-4xl mb-2">Top Donators</h3>
            <ul>
                {donators.map((donator, index) => (
                    <li key={index} className="mb-4 text-2xl">
                        <span className="font-bold">{donator.name}</span> donated <span className="font-bold">{donator.amount}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Donators;
