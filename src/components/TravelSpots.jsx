import { Link } from "react-router-dom";

const TravelSpots = ({ spot }) => {

    // Check if spot is defined
    if (!spot) {
        return;
    }

    const { _id, image, tourists_spot_name, country_Name, location, short_description, average_cost, seasonality, travel_time, totalVisitorsPerYear, user_email, user_name } = spot;

    return (
        <div className=" cardgrid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            <div key={_id} className="card bg-base-100 shadow-xl border-solid border-2 border-green-500 ">
                <figure className="h-1/3">
                    <img className="w-full" src={image} alt={tourists_spot_name} />
                </figure>
                <div className="card-body bg-white dark:bg-gray-800 text-black dark:text-white">
                    <div className="flex flex-col gap-3">
                        {/* Add more content here using the destructured properties */}
                        <p className="font-bold text-xl">{tourists_spot_name}</p>
                        {/* <p>{short_description}</p> */}
                        <p>{country_Name}, {location}</p>
                        <p>{average_cost}</p>
                        {/* <p>{seasonality}</p> */}
                        <p>{travel_time}</p>
                        {/* <p>{totalVisitorsPerYear}</p>
                        <p>{user_email}</p>
                        <p>{user_name}</p> */}
                        {/* Add more relevant information */}
                        <hr />
                        <div className="flex justify-between">
                            {/* Add more relevant information */}
                        </div>
                    </div>
                    <div className="card-actions justify-end">
                        <Link to={`/viewdetail/${_id}`} className="btn bg-[#6CBF40] text-white">View Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelSpots;

// az@bjj.com sadwa