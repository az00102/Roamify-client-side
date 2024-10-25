import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AllTouristSpots = () => {
    const [spots, setSpots] = useState([]);
    const [sortOrder, setSortOrder] = useState('ascending');
    const [loading, setLoading] = useState(true);  // State to manage loading

    useEffect(() => {
        fetchSpots();
    }, []);

    const fetchSpots = async () => {
        try {
            const response = await axios.get('https://b9-a10-server-seven.vercel.app/api/tourist-spots');
            const sortedSpots = sortSpots(response.data, sortOrder);
            setTimeout(() => {
                setSpots(sortedSpots);
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Error fetching tourist spots:', error);
            setLoading(false);
        }
    };

    const sortSpots = (spots, order) => {
        return spots.sort((a, b) => {
            const costA = parseFloat(a.average_cost.replace(/[^0-9.]/g, ''));
            const costB = parseFloat(b.average_cost.replace(/[^0-9.]/g, ''));
            return order === 'ascending' ? costA - costB : costB - costA;
        });
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
        setSpots(sortSpots([...spots], order));
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center items-center h-screen">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#6CBF40]"></div>
            </div>
        </div>;
    }

    return (
        <section className="p-6 bg-white dark:bg-gray-800 text-black dark:text-white">
            <Helmet>
                <title>Roamify | All Tourist Spots</title>
            </Helmet>
            <div className="flex justify-between items-center mb-4 ">
                <h1 className="text-xl font-bold">All Tourist Spots</h1>
                <select
                    value={sortOrder}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="select select-bordered text-white bg-[#6CBF40]"
                >
                    <option value="ascending">Sort by Cost: Low to High</option>
                    <option value="descending">Sort by Cost: High to Low</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {spots.map((spot) => (
                    <div key={spot._id} className="card shadow-xl border-solid border-2 border-green-500">
                        <figure className="h-2/3">
                            <img src={spot.image} alt={spot.tourists_spot_name} className="w-full" />
                        </figure>
                        <div className="card-body bg-white dark:bg-gray-800 text-black dark:text-white">
                            <h2 className="card-title">{spot.tourists_spot_name}</h2>
                            <p>Cost: {spot.average_cost}</p>
                            <p>Visitors/year: {spot.totalVisitorsPerYear}</p>
                            <p>Travel Time: {spot.travel_time}</p>
                            <p>Seasonality: {spot.seasonality}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/viewdetail/${spot._id}`} className="btn bg-[#6CBF40] text-white">View Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AllTouristSpots;
