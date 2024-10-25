import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddTouristSpot = () => {
    const { register, handleSubmit, setValue } = useForm();
    const { user } = useContext(AuthContext);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("https://b9-a10-server-seven.vercel.app/api/tourist-spots", data);
            console.log(response.data);
            toast.success("Tourist spot added successfully!");
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to add tourist spot.");
        }
    };

    useEffect(() => {
        if (user) {
            setValue("user_email", user.email);
            setValue("user_name", user.displayName);
        }
    }, [user, setValue]);

    return (
        <section className="p-6 bg-white dark:bg-gray-800 text-black dark:text-white container mx-auto my-6 rounded-3xl border-[#6CBF40] border-2">
            <Helmet>
                <title>Roamify | Add Tourist Spot</title>
            </Helmet>
            <form onSubmit={handleSubmit(onSubmit)} noValidate action="" className="container flex flex-col mx-auto space-y-12">
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-white dark:bg-gray-800 text-[#6CBF40] ">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                        <p className="font-medium">Tourist Spot Information</p>
                        <p className="text-xs">Enter the details of the tourist spot:</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full">
                            <label htmlFor="image" className="text-sm">Image URL</label>
                            <input id="image" type="url" placeholder="Image URL" className="w-full p-2 rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:border-gray-300" {...register("image")} />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="tourists_spot_name" className="text-sm">Tourists Spot Name</label>
                            <input id="tourists_spot_name" type="text" placeholder="Tourists Spot Name" className="w-full rounded-md focus:ring focus:ring-opacity-75  focus:dark:ring-violet-600 dark:border-gray-300 p-2" {...register("tourists_spot_name")} />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="country_Name" className="text-sm">Country Name</label>
                            <input id="country_Name" type="text" placeholder="Country Name" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:border-gray-300 p-2" {...register("country_Name")} />
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="location" className="text-sm">Location</label>
                            <input id="location" type="text" placeholder="Location" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:border-gray-300 p-2" {...register("location")} />
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="short_description" className="text-sm">Short Description</label>
                            <textarea id="short_description" placeholder="Short Description" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:border-gray-300 p-2" {...register("short_description")} />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="average_cost" className="text-sm">Average Cost</label>
                            <input id="average_cost" type="text" placeholder="Average Cost" className="w-full rounded-md focus:ring focus:ring-opacity-75  focus:dark:ring-violet-600 dark:border-gray-300 p-2" {...register("average_cost")} />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="seasonality" className="text-sm">Seasonality</label>
                            <input id="seasonality" type="text" placeholder="Seasonality" className="w-full rounded-md focus:ring focus:ring-opacity-75  focus:dark:ring-violet-600 dark:border-gray-300 p-2" {...register("seasonality")} />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="travel_time" className="text-sm">Travel Time</label>
                            <input id="travel_time" type="text" placeholder="Travel Time" className="w-full rounded-md focus:ring focus:ring-opacity-75  focus:dark:ring-violet-600 dark:border-gray-300 p-2" {...register("travel_time")} />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="totalVisitorsPerYear" className="text-sm">Total Visitors Per Year</label>
                            <input id="totalVisitorsPerYear" type="text" placeholder="Total Visitors Per Year" className="w-full rounded-md focus:ring focus:ring-opacity-75  focus:dark:ring-violet-600 dark:border-gray-300 p-2" {...register("totalVisitorsPerYear")} />
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="user_email" className="text-sm">User Email</label>
                            <input id="user_email" type="email" placeholder="User Email" className="w-full rounded-md focus:ring focus:ring-opacity-75  focus:dark:ring-violet-600 dark:border-gray-300 p-2" {...register("user_email")} />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="user_name" className="text-sm">User Name</label>
                            <input id="user_name" type="text" placeholder="User Name" className="w-full rounded-md focus:ring focus:ring-opacity-75  focus:dark:ring-violet-600 dark:border-gray-300 p-2" {...register("user_name")} />
                        </div>
                    </div>
                </fieldset>
                <button type="submit" className="px-4 py-2 bg-[#6CBF40] text-white rounded-md hover:bg-red-600">Add</button>
            </form>
            <ToastContainer />
        </section>
    );
};

export default AddTouristSpot;
