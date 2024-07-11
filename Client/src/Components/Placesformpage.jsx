import { useEffect, useState } from "react";
import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Perks from './Perks.jsx';
import Photosuploader from './Photosuploader.jsx';
import axios from 'axios';
import Bookedplaces from "./Bookedplaces.jsx";

const Placesformpage = () => {  
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [addedphotos, setAddedphotos] = useState('');
    const [perks, setPerks] = useState([]);
    const [extrainfo, setExtrainfo] = useState('');
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [maxguests, setMaxguests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    // Function to delete place
    function deletefunction() {
        axios.delete(`/place/delete/${id}`).then(res => {
            console.log(res);
            setRedirect(true);
        }).catch(error => {
            console.error('Error deleting place:', error);
        });
    }

    useEffect(() => {
        if (!id) return; // If no ID, skip fetching data

        // Fetch place data for editing
        axios.get(`/account/places/${id}`).then(response => {
            const { data } = response;
            console.log(data);
            setTitle(data.title);
            setAddress(data.address);
            setDescription(data.description);
            setAddedphotos(data.photos);
            setPerks(data.perks);
            setExtrainfo(data.extraInfo);
            setCheckin(data.checkIn);
            setCheckout(data.checkOut);
            setMaxguests(data.maxGuests);
            setPrice(data.price);
        }).catch(error => {
            console.error('Error fetching place data:', error);
        });
    }, [id]);

    // Function to create header elements
    function inputHeader(text) {
        return <h2 className='text-2xl mt-4'>{text}</h2>;
    }

    // Function to create paragraph elements
    function inputText(text) {
        return <p className='text-gray-500 text-sm'>{text}</p>;
    }

    // Function to combine header and description
    function preinput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputText(description)}
            </>
        );
    }

    // Function to handle form submission
    const saveplace = async (e) => {
        e.preventDefault();

        // Create place data object
        const placedata = {
            title,
            address,
            addedphotos,
            description,
            perks,
            checkin: checkin || null,  // Set to null if empty
            checkout: checkout || null, // Set to null if empty
            extrainfo,
            maxguests,
            price
        };

        try {
            if (id) {
                // Update existing place
                await axios.put('/addplaces/', { id, ...placedata });
            } else {
                // Add new place
                await axios.post('/addplaces', placedata);
            }
            setRedirect(true);
        } catch (error) {
            console.error('Error saving place:', error);
        }
    };

    // Redirect to the places page if needed
    if (redirect) {
        return <Navigate to={'/user/account/places'} />;
    }

    return (
        <>
            <div>
                <form onSubmit={saveplace}>
                    {preinput('Title', 'Title for your place. Should be short and catchy as in advertisement')}
                    <input
                        type="text"
                        placeholder="Title, for example: Web is my favorite"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    
                    {preinput('Address', 'Address to this place')}
                    <input
                        type="text"
                        placeholder='Address'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    
                    <Photosuploader addedphotos={addedphotos} onChange={setAddedphotos} />
                    
                    {preinput('Description', 'Description of your place')}
                    <textarea
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Description'
                    />
                    
                    {preinput('Perks', 'Select perks of your place')}
                    <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                        <Perks selected={perks} onChange={setPerks} />
                    </div>
                    
                    {preinput('Extra-Info', 'House rules, etc.')}
                    <textarea
                        required
                        value={extrainfo}
                        onChange={(e) => setExtrainfo(e.target.value)}
                    />
                    
                    {preinput('Check In & Out times', 'Add check-in and check-out times. Remember to have some window for cleaning the room between guests')}
                    <div className='grid gap-2 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 mb-8'>
                        <div className='flex'>
                            <div className='py-4 px-4'>
                                <label>Check in:</label>
                                <input
                                    type="date"
                                    value={checkin}
                                    onChange={(e) => setCheckin(e.target.value)}
                                    required={!id} // Make required only if adding a new place
                                />
                            </div>
                            <div className='py-4 px-4 border-l'>
                                <label>Check out:</label>
                                <input
                                    type="date"
                                    value={checkout}
                                    onChange={(e) => setCheckout(e.target.value)}
                                    required={!id} // Make required only if adding a new place
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                            <input
                                type="number"
                                required
                                placeholder='1'
                                value={maxguests}
                                onChange={(e) => setMaxguests(e.target.value)}
                            />
                        </div>
                        <div>
                            <h3 className='mt-2 -mb-1'>Price</h3>
                            <input
                                required
                                type="number"
                                placeholder='100'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className='primary'>Save</button>
                    <button
                        className="text-center bg-red-500 my-5 text-white w-full p-2 rounded-2xl"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent default form submission
                            deletefunction();
                        }}
                    >
                        Delete
                    </button>
                </form>
            </div>
            <Bookedplaces id={id} />
        </>
    );
};

export default Placesformpage;
