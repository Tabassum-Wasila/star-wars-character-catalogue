'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios';

export default function characterDetails() {

  const param = useParams();

  const seeParam = () => {
    console.log("Param");
    console.log(param.id);
  }
  const [details, setDetails] = useState({});
  const fetchCharacterDetails = async () => {
    let url = 'https://swapi.dev/api/people/' + param.id;
    try{
        let res = await axios.get(url);
        console.log(res.data);
        setDetails(res.data);
    }
      catch(error){
        console.error("Error fetching character details: ", error);
    }
  }

  useEffect( () => {
      fetchCharacterDetails();
      console.log(details);
    }, []);

  return (
    <div>
    {
        Object.entries(details).map(([key, value]) => 
            <h1 key={key} className="capitalize">{`${key.replace(/_/g, " ")} : ${value}`}</h1>
        )
    }
    </div>
  )
}
