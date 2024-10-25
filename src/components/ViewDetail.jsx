import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ViewDetail = () => {
    const { spotId } = useParams();
    const [spot, setSpot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSpotData = async () => {
            try {
                const response = await axios.get(`https://b9-a10-server-seven.vercel.app/api/tourist-spots/${spotId}`);
                // Simulate loading for 1 second
                setTimeout(() => {
                    setSpot(response.data);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching spot data:', error);
                setError('Failed to fetch spot');
                setLoading(false);
            }
        };

        if (spotId) {
            fetchSpotData();
        }
    }, [spotId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#6CBF40]"></div>
            </div>
        );
    }


    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='flex flex-col lg:flex-row gap-20 lg:gap-32 lg:p-10 items-center container mx-auto my-6'>
            <img className='max-h-[564px]' src={spot?.image} alt={spot?.tourists_spot_name} />
            <div className='mx-6 lg:max-w-[50%] flex flex-col gap-4'>
                <h1 className='font-bold text-3xl'>{spot?.tourists_spot_name}</h1>
                <h3>Location: {spot?.country_Name}, {spot?.location}</h3>
                <hr />
                <h3>Average Cost: {spot?.average_cost}</h3>
                <h3>Seasonality: {spot?.seasonality}</h3>
                <h3>Travel Time: {spot?.travel_time}</h3>
                <hr />
                <p><span className='font-bold my-3'>Short Description: </span>{spot?.short_description}</p>
                <hr />
                <div className='flex flex-col gap-2'>
                    <p>Total Visitors Per Year: {spot?.totalVisitorsPerYear}</p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ViewDetail;
