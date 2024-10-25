import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const TouristSpotCard = () => {
    const { countryName } = useParams();
    const [touristSpots, setTouristSpots] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for storing error

    useEffect(() => {
        const fetchTouristSpots = async () => {
            try {
                let response;
                if (countryName) {
                    response = await axios.get(`https://b9-a10-server-seven.vercel.app/api/tourist-spots`);
                    const filteredSpots = response.data.filter(spot => spot.country_Name === countryName);
                    setTouristSpots(filteredSpots);
                } else {
                    response = await axios.get(`https://b9-a10-server-seven.vercel.app/api/tourist-spots`);
                    setTouristSpots(response.data);
                }
                // Simulate loading for 1 second
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching tourist spots:', error);
                setError(error); // Set error state if there's an error
            }
        };

        fetchTouristSpots();
    }, [countryName]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center items-center h-screen">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#6CBF40]"></div>
            </div>
        </div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white dark:bg-gray-800 text-black dark:text-white">
            {touristSpots.length === 0 ? (
                <div className='text-center w-screen h-[670px] flex justify-center items-center text-6xl'>Sorry! no tourist spots available for {countryName}.</div>
            ) : (
                touristSpots.map(spot => (
                    <div key={spot._id} className="card shadow-xl border-solid border-2 border-green-500 mx-6 my-10">
                        <figure>
                            <img src={spot.image} alt={spot.tourists_spot_name} className="w-full" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{spot.tourists_spot_name}</h2>
                            <p>Country: {spot.country_Name}</p>
                            <p>Location: {spot.location}</p>
                            <p>Description: {spot.short_description}</p>
                            <p>Cost: {spot.average_cost}</p>
                            <p>Seasonality: {spot.seasonality}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/viewdetail/${spot._id}`} className="btn bg-[#6CBF40] text-white">View Details</Link>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TouristSpotCard;
