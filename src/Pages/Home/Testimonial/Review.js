import React from 'react';

const Review = ({review}) => {
    const { name, img, userReview, location} = review;
    return (
        <div>
            <div className="card shadow-lg">
                <div className="card-body">
                    <p>{userReview}</p>
                    <div className="card-actions">
                        <div className="flex items-center gap-4 mt-8">
                            <div className="w-[75px] rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                                <img src={img} alt={name} />
                            </div>
                            <div>
                                <h5 className='text-lg'>{name}</h5>
                                <p>{location}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;