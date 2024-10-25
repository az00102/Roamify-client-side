import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../providers/AuthProvider';

const MyList = () => {
    const { user } = useContext(AuthContext); // Accessing the user from AuthContext
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [spotToDelete, setSpotToDelete] = useState(null);

    useEffect(() => {
        fetchSpots(); // Fetch spots when component mounts
    }, []);

    const fetchSpots = async () => {
        try {
            const response = await axios.get('https://b9-a10-server-seven.vercel.app/api/tourist-spots');
            // Filter spots based on user's email and display name
            const filteredSpots = response.data.filter(spot => spot.user_email === user.email && spot.user_name === user.displayName);
            setSpots(filteredSpots);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tourist spots:', error);
            setLoading(false);
        }
    };

    const deleteSpot = async () => {
        if (spotToDelete) {
            try {
                await axios.delete(`https://b9-a10-server-seven.vercel.app/api/tourist-spots/${spotToDelete}`);
                setShowModal(false);
                const updatedSpots = spots.filter(spot => spot._id !== spotToDelete);
                setSpots(updatedSpots);
                toast.success('Spot deleted successfully!');
            } catch (error) {
                console.error('Error deleting tourist spot:', error);
                setShowModal(false);
                toast.error('Failed to delete spot.');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#6CBF40]"></div>
            </div>
        );
    }

    return (
        <section className="p-2 sm:p-6 bg-white dark:bg-gray-800 text-black dark:text-white">
            <Helmet>
                <title>Roamify | My List</title>
            </Helmet>
            <h1 className="text-lg sm:text-2xl font-bold mb-4">My Tourist Spots</h1>
            {spots.length === 0 ? (
                <div className="flex justify-center items-center h-screen">
                    <p className="text-5xl">You haven't added any tourist spots yet!</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-[#6CBF40] text-center text-base sm:text-lg">
                        <thead>
                            <tr>
                                <th className="p-2 sm:p-4">Name</th>
                                <th className="p-2 sm:p-4">Cost</th>
                                <th className="p-2 sm:p-4">Visitors/year</th>
                                <th className="p-2 sm:p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {spots.map((spot) => (
                                <tr key={spot._id} className="border-t border-[#6CBF40]">
                                    <td className="p-1 sm:p-2">{spot.tourists_spot_name}</td>
                                    <td className="p-1 sm:p-2">{spot.average_cost}</td>
                                    <td className="p-1 sm:p-2">{spot.totalVisitorsPerYear}</td>
                                    <td className="p-1 sm:p-2">
                                        <Link to={`/updatespotform/${spot._id}`} className="inline-block bg-blue-500 text-white py-1 px-2 rounded-lg mr-2">Update</Link>
                                        <button className="bg-red-500 text-white py-1 px-2 rounded-lg" onClick={() => {
                                            setSpotToDelete(spot._id);
                                            setShowModal(true);
                                        }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-white dark:bg-gray-50 dark:text-gray-800">
                        <h2 className="text-xl font-semibold leading-tight tracking-wide">Are you sure you want to delete this spot?</h2>
                        <div className="flex justify-end gap-3 mt-6">
                            <button className="px-6 py-2 rounded-sm" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="px-6 py-2 rounded-sm bg-red-500 text-white shadow-sm" onClick={deleteSpot}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </section>
    );

};

export default MyList;
