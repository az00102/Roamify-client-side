import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Country = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://b9-a10-server-seven.vercel.app/api/countries');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    return (
        <section className="body-font bg-white dark:bg-gray-800 text-black dark:text-white">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 ">Explore Exotic Destinations</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Embark on a Journey of Cultural Richness and Natural Beauty, Uncovering the Charm and Authenticity of Diverse Landscapes and Traditions Across the Globe.</p>
                </div>
                <div className="flex flex-wrap -m-4">
                    {countries.map(country => (
                        <div key={country._id} className="lg:w-1/3 sm:w-1/2 p-4 flex">
                            <Link to={`/tourist-spots/${country.name}`} className="w-full">
                                <div className="flex flex-col w-full h-full">
                                    <div className="flex relative h-full"> {/* Set a fixed height, adjust as needed */}
                                        <img alt="gallery" className="absolute inset-0 w-full h-full object-cover object-center" src={country.image} />
                                        <div className="absolute top-0 left-0 m-4 bg-white px-2 py-1 rounded-md">
                                            <span className="text-[#6CBF40] text-base font-bold">{country.name}</span>
                                        </div>
                                        <div className="px-8 py-10 relative z-0 w-full border-4 border-[#6CBF40] bg-white text-black opacity-0 hover:opacity-100">
                                            <h2 className="tracking-widest text-xl title-font font-medium text-[#6CBF40] mb-1">{country.name}</h2>

                                            <p className="leading-relaxed">{country.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
};

export default Country;
