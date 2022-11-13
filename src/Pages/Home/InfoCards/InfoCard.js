import React from 'react';

const InfoCard = ({card}) => {
    const { name, description, icon, bgClass } = card;
    return (
        <div>
            <div className={`card md:card-side shadow-xl p-6 text-white ${bgClass}`}>
                <figure>
                    <img src={icon} alt="Icon"/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;