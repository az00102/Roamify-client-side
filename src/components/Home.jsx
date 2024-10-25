import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Helmet } from "react-helmet-async";
import axios from "axios"; // Import Axios for making HTTP requests
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import TravelSpots from "./TravelSpots";
import Contact from "./Contact";
import Review from "./Review";
import { useLoaderData } from "react-router-dom";
import Country from "./Country";
import { Bounce, Fade } from "react-awesome-reveal";

const Home = () => {

    const spots = useLoaderData();

    return (
        <div className="">
            <Helmet>
                <title>Roamify | Home</title>
            </Helmet>
            {/* banner section */}
            <section>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className="hero min-h-screen bg-[url('/cox.jpg')]">
                            <div className="hero-overlay bg-opacity-60"></div>
                            <div className="hero-content text-center text-neutral-content">
                                <div className="max-w-md">
                                    <Bounce triggerOnce>
                                        <h1 className="text-4xl font-bold leading-none sm:text-5xl text-white">Explore the World With Us.
                                        </h1>
                                        <p className="px-8 mt-8 mb-12 text-lg text-white">Journey to the unknown, or revel in the comfort of popular tourist spots with our curated guides.</p>
                                    </Bounce>

                                    <div className="flex flex-wrap justify-center">
                                        <a href="#spots" className="px-8 py-3 m-2 text-lg border rounded text-white border-gray-300 font-bold">Explore</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="hero min-h-screen bg-[url('/bd.jpg')]">
                            <div className="hero-overlay bg-opacity-60"></div>
                            <div className="hero-content text-center text-neutral-content">
                                <div className="max-w-lg">
                                    <Bounce triggerOnce><h1 className="text-4xl font-bold leading-none sm:text-5xl text-white">Escape to Breathtaking Destinations.
                                    </h1>
                                        <p className="px-8 mt-8 mb-12 text-lg text-white">From serene beaches to urban escapes, find your perfect getaway with our exclusive travel deals.</p></Bounce>

                                    <div className="flex flex-wrap justify-center">
                                        <a href="#spots" className="px-8 py-3 m-2 text-lg border rounded text-white border-gray-300 font-bold">Explore</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="hero min-h-screen bg-[url('/sw.jpg')]">
                            <div className="hero-overlay bg-opacity-60"></div>
                            <div className="hero-content text-center text-neutral-content">
                                <div className="max-w-md">
                                    <Bounce triggerOnce>
                                        <h1 className="text-4xl font-bold leading-none sm:text-5xl text-white">Discover Your Next Adventure.
                                        </h1>
                                        <p className="px-8 mt-8 mb-12 text-lg text-white">Uncover unique travel experiences and breathtaking landscapes in our hand-picked destinations.</p>
                                    </Bounce>
                                    <div className="flex flex-wrap justify-center">
                                        <a href="#spots" className="px-8 py-3 m-2 text-lg border rounded text-white border-gray-300 font-bold">Explore</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>


            </section>
            <Fade duration={2000}>
                <section id="spots" className="flex flex-col items-center bg-white dark:bg-gray-800 text-black dark:text-white">
                    <div className="flex flex-col text-center w-full mt-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 ">Journey Beyond Borders</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Embark on a Voyage of Discovery Through Captivating Travel Spots, Where Every Corner Offers a New Adventure, From Tranquil Retreats to Thrilling Escapes, Creating Unforgettable Memories Along the Way.</p>
                    </div>
                    <hr />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10 lg:mx-10 p-4 lg:p-">
                        {Array.isArray(spots) && spots.length > 0 ? (
                            spots.slice(0, 6).map((spot) => (
                                <TravelSpots key={spot._id} spot={spot}></TravelSpots>
                            ))
                        ) : (
                            <p>No travel spots available</p>
                        )}
                    </div>

                    {/* <h1>Spot count: {spots.length}</h1> */}
                    <TravelSpots spots={spots} />
                </section>

                <section>
                    <Country></Country>
                </section>
                <section className="bg-white dark:bg-gray-800 text-black dark:text-white">
                    <div className=" hero bg-[url('/crev.jpg')] min-h-[700px]">
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div>
                            <p className="text-center text-4xl font-bold p-6 text-white">See What Our Customers Have to Say</p>
                            <div className="flex justify-center">
                                <Review></Review>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white dark:bg-gray-800 text-black dark:text-white">
                    <Contact></Contact>
                </section>


            </Fade>

        </div>
    );
};

export default Home;