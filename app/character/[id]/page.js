'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios';
import Navbar from '@/app/components/Navbar';

export default function characterDetails() {
    const param = useParams();
    const [details, setDetails] = useState({});

    useEffect( () => {
        document.title = 'Character Details'
        fetchCharacterDetails();
    }, []);
  
    const fetchCharacterDetails = async () => {
        console.log(param.id);
        let url = 'https://swapi.dev/api/people/' + param.id;
        try{
            const res = await axios.get(url);
            setDetails({...res.data, homeworld: "", films: []});
            document.title = `${res.data.name} Details`;
            const homeworldRes = await axios.get(res.data.homeworld); 
            setDetails(prev => ({...prev, homeworld: homeworldRes.data.name}));
            fetchFilms(res.data.films);
        }
        catch(error){
            console.error("Error fetching character details: ", error);
        }
    }

    const fetchFilms = async (urls) => {
        let films = [];
        for(const url of urls){
            let film = await axios.get(url);
            films = [...films, film.data.title];
            setDetails((prev) => ({...prev, films: films}));
        }
    }

  return (
    <>
        <Navbar/>
        <div className="mt-2 sm:mt-10 max-w-lg bg-gray-500 m-auto flex flex-col items-center md:gap-4 gap-2 p-4 border-2 shadow-md border-gray-300 text-gray-200">
            <h1 className="font-semibold text-lg min-w-72 py-12 bg-gray-700 text-center">{details.name}</h1>
            <h3>Height: {details.height} cm</h3>
            <h3 className="capitalize">Gender: {details.gender}</h3>
            <h3>Mass: {details.mass}</h3>
            <h3>Birth Year: {details.birth_year}</h3>
            <h3>Home World: {details.homeworld}</h3>
            <h3>Films:</h3>
            { details.films && <div className="border rounded-md flex flex-col items-center">
                {
                    details.films.map((film) => 
                        <h3 key={film} className="w-full m-auto border p-4 text-center">{film}</h3>
                    )
                }
                </div>
            }
        </div>
    </>
  )
}
