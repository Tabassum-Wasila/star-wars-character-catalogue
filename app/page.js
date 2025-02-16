"use client"
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/app/components/Navbar";
import CharacterCards from "./components/CharacterCards";

export default function Home() {
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const allPeople = useRef([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCharacters = async () => {
    let url = 'https://swapi.dev/api/people/';
    while(url){
      try{
        let res = await axios.get(url);
        console.log(res.data);
        allPeople.current = [...allPeople.current, ...res.data.results];
        url = res.data.next;
      }
      catch(error){
        console.error("Error fetching character data: ", error);
      }
      filterCharacters();
    }
  };
  useEffect( () => {
    fetchCharacters();
    console.log("Characters: " + allPeople); 
  }, []);

  const filterCharacters = (search = "") => {
    if(search == "")
        search = searchTerm;
    let people = allPeople.current;
    people = people.filter((person) => person.name.toUpperCase().includes(search.toUpperCase()));
    setFilteredCharacters(people);
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterCharacters(e.target.value);
  }

  return (
    <>
      <Navbar/>
      <div className="min-h-full absolute flex flex-col justify-evenly text-gray-300 self-center items-center">
        <div className="text-gray-900 font-semibold w-1/4">
          <input 
            type="text"
            placeholder="Type to Search..."
            value={searchTerm}
            onChange={handleSearch}
            autoFocus={true}
            className="w-full p-2 m-2 rounded-lg bg-gray-300"
          />
        </div>
          <CharacterCards allCharacters={filteredCharacters}/>
        </div>
    </>
  );
}
