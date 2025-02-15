"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const itemsPerPage = 12;
  const allPeople = useRef([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  let startIndex = (currentPage - 1)*itemsPerPage;
  const totalPages = Math.ceil(filteredCharacters.length/itemsPerPage);

  const router = useRouter();


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
    handlePagination(1, people);
  }
  
  const handlePagination = (targetPage, people = "") => {
    if(people == "")
        people = filteredCharacters;
    people = people.slice((targetPage - 1)*itemsPerPage, itemsPerPage*targetPage);
    setCharacters(people);
    console.log(startIndex);
    console.log(itemsPerPage*currentPage);
    setCurrentPage(targetPage);
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterCharacters(e.target.value);
  }

  return (
    <>
      <div className="py-2 bg-sky-900 flex items-center">
        <h1 className="m-auto text-lg text-gray-300">Star Wars Characters Catalogue</h1>
      </div>
      <div className="bg-gray-500 min-h-full absolute flex flex-col justify-evenly text-gray-300 self-center items-center">
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
        <main className="flex flex-row flex-wrap gap-5 justify-center">
          { 
            characters.map((char, index) => 
              <div key={char.name} className="flex flex-col justify-center items-center gap-4 px-8 rounded-lg mx-2 py-6 bg-gray-800">
                <h1 className="font-semibold text-lg min-w-48 py-12 bg-gray-700 text-center hover:underline" onClick={()=>router.push(`character/${index + 1}`)}>{char.name}</h1>
                <h3>Height: {char.height} cm</h3>
                <h3>Gender: {char.gender}</h3>
                <h3>Birth Year: {char.birth_year}</h3>
              </div>
            )
          }
        </main>
        <footer className="mt-2 flex flex-col gap-2 items-center text-gray-900">
          
          <h3>Showing {currentPage} of {totalPages} Pages</h3>
          <div>
            <button className={`rounded-md bg-gray-400 p-2 m-1 ${currentPage == 1 ? "text-gray-600" : ""}`} onClick={() => handlePagination(currentPage - 1)}
              disabled = {currentPage == 1}
            >
              {"<< Previous"}
            </button>
            {
              Array.from({length: totalPages}, (_, index) => 
                <button key={index} onClick={() => handlePagination(index + 1)}
                className={`px-2 py-1 m-1 rounded-md bg-gray-400 ${currentPage == index + 1 ? "bg-gray-600" : "bg-gray-300"}`}
                  >
                    {index + 1}
                </button>
            )}
            <button className={`rounded-md bg-gray-400 p-2 ${currentPage == totalPages ? "text-gray-600" : "bg-gray-300"}`} onClick={() => handlePagination(currentPage + 1)}
              disabled = {currentPage == totalPages}
            >
              {"Next >>"}
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}
