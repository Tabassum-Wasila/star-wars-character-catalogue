'use client'

import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/app/components/Navbar";
import CharacterCards from "./components/CharacterCards";

export default function Home() {
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let allPeople = useRef([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCharacters = async () => {
    let url = 'https://swapi.dev/api/people/';
    allPeople.current = [];
    while(url){
      try{
        let res = await axios.get(url);
        allPeople.current = [...allPeople.current, ...res.data.results];
        url = res.data.next;
        if(isLoading)
          setIsLoading(false);
      }
      catch(error){
        console.error("Error fetching character data: ", error);
      }
      setFilteredCharacters(allPeople.current);
    }
    console.log(allPeople);
  };
  useEffect( () => {
    document.title = 'Star Wars Characters';
    fetchCharacters();
  }, []);

  const filterCharacters = (search = "") => {
    let people = allPeople.current;
    people = people.filter((person) => person.name.toUpperCase().includes(search.toUpperCase()));
    setFilteredCharacters(people);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      filterCharacters(searchTerm);
    }, 300);
    return () => clearTimeout(timeout);
  }  ,[searchTerm]);

  return (
    <>
      <Navbar/>
      <div className="m-auto min-h-full min-w-full absolute flex flex-col mt-4 gap-4 text-gray-300 items-center">
        {isLoading && (
            <h1 className="rounded-lg p-12 text-xl">Loading Characters, please wait...</h1>
        )}
        {!isLoading && (
          <>
            <div className="text-gray-900 font-semibold max-w-md">
              <input 
                type="text"
                placeholder="Type to Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus={true}
                className="w-full p-2 my-2 rounded-lg bg-gray-300"
              />
            </div>
              <CharacterCards allCharacters={filteredCharacters}/>
          </>
        )}
        </div>
    </>
  );
}
