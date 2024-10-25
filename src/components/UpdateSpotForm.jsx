import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateSpotForm = () => {
    const { id } = useParams(); // Get the spot ID from the URL params
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        fetchSpotData();
    }, []);

    const fetchSpotData = async () => {
        try {
            const response = await axios.get(`https://b9-a10-server-seven.vercel.app/api/tourist-spots/${id}`);
            // Set form values using setValue
            Object.keys(response.data).forEach(key => {
                setValue(key, response.data[key]);
            });
        } catch (error) {
            console.error('Error fetching spot data:', error);
        }
    };

    const onSubmit = async (data) => {
        try {
            await axios.put(`https://b9-a10-server-seven.vercel.app/api/tourist-spots/${id}`, data);
            // Optionally, you can redirect the user to another page after successful update
            // history.push('/my-list');
            toast.success('Spot updated successfully!');
        } catch (error) {
            console.error('Error updating spot:', error);
            alert('Failed to update spot.');
        }
    };


    return (
        <div className="container mx-auto my-10">
            <h1 className="text-2xl font-bold mb-5">Update Tourist Spot</h1>
            <div className='border-t-2 border-b-2 border-[#6CBF40] rounded-t-2xl rounded-b-2xl p-6'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block  text-sm font-bold mb-2" htmlFor="image">
                            Image URL
                        </label>
                        <input
                            {...register('image')}
                            className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                            id="image"
                            type="text"
                            placeholder="Image URL"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block  text-sm font-bold mb-2" htmlFor="tourists_spot_name">
                            Tourist Spot Name
                        </label>
                        <input
                            {...register('tourists_spot_name')}
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="tourists_spot_name"
                            type="text"
                            placeholder="Tourist Spot Name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="country_Name">
                            Country Name
                        </label>
                        <input
                            {...register('country_Name')}
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="country_Name"
                            type="text"
                            placeholder="Country Name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="location">
                            Location
                        </label>
                        <input
                            {...register('location')}
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="location"
                            type="text"
                            placeholder="Location"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="short_description">
                            Short Description
                        </label>
                        <input
                            {...register('short_description')}
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="short_description"
                            type="text"
                            placeholder="Short Description"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="average_cost">
                            Average Cost
                        </label>
                        <input
                            {...register('average_cost')}
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="average_cost"
                            type="text"
                            placeholder="Average Cost"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="seasonality">
                            Seasonality
                        </label>
                        <input
                            {...register('seasonality')}
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="seasonality"
                            type="text"
                            placeholder="Seasonality"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="travel_time">
                            Travel Time
                        </label>
                        <input
                            {...register('travel_time')}
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="travel_time"
                            type="text"
                            placeholder="Travel Time"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="totalVisitorsPerYear">
                            Total Visitors Per Year
                        </label>
                        <input
                            {...register('totalVisitorsPerYear')}
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="totalVisitorsPerYear"
                            type="number"
                            placeholder="Total Visitors Per Year"
                        />
                    </div>
                    <button
                        className="bg-[#6CBF40] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="submit"
                    >
                        Update
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UpdateSpotForm;
