import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function CharacterCards({allCharacters = []}) {
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [characters, setCharacters] = useState([]);
    const totalPages = Math.ceil(allCharacters.length/itemsPerPage);

    useEffect( () => 
        handlePagination()
    , [allCharacters]);

    const handlePagination = (targetPage = 1) => {
        let arr = allCharacters.slice((targetPage - 1)*itemsPerPage, itemsPerPage*targetPage);
        setCharacters(arr);
        setCurrentPage(targetPage);
    }

    return (
        <main>
            <div className="flex flex-row flex-wrap gap-5 justify-center mx-10">
            { 
                characters.map((char) => 
                    <div key={char.name} 
                        className="flex flex-col justify-center items-center gap-6 px-8 rounded-lg py-4 bg-gray-800"
                    >
                        <Link
                            href={`character/${char.url.slice(29, -1)}`} 
                            className="font-semibold text-lg min-w-48 py-8 bg-gray-700 text-center hover:underline hover:cursor-pointer" 
                        >
                            {char.name}
                        </Link>
                        <h3>Height: {char.height} cm</h3>
                        <h3>Gender: {char.gender}</h3>
                        <h3>Birth Year: {char.birth_year}</h3>
                    </div>
                )
            }
            </div>
            {
                allCharacters.length > 0 &&
                    <div className="mt-2 flex flex-col gap-2 items-center">
                        <h3>Showing {currentPage} of {totalPages} Pages</h3>
                        <div className="text-gray-900">
                            <button 
                                className={`rounded-md bg-gray-400 p-2 m-1 ${currentPage == 1 ? "text-gray-600" : ""}`} 
                                onClick={() => handlePagination(currentPage - 1)}
                                disabled = {currentPage == 1}
                            >
                                {"<< Prev"}
                            </button>
                            {
                                Array.from({length: totalPages}, (_, index) => 
                                    <button 
                                        key={index} 
                                        onClick={() => handlePagination(index + 1)}
                                        className={`p-2 m-1 rounded-md bg-gray-400 ${currentPage == index + 1 ? "bg-gray-600" : "bg-gray-300"}`}
                                    >
                                        {index + 1}
                                    </button>
                                )
                            }
                            <button 
                                className={`rounded-md bg-gray-400 p-2 ${currentPage == totalPages ? "text-gray-600" : "bg-gray-300"}`} 
                                onClick={() => handlePagination(currentPage + 1)}
                                disabled = {currentPage == totalPages}
                            >
                                {"Next >>"}
                            </button>
                        </div>
                    </div>
            }
            {allCharacters.length == 0 &&
                <h1 className="text-lg">No data found.</h1>
            }
        </main>
    )
}
