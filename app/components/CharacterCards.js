import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function CharacterCards({allCharacters = []}) {
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [characters, setCharacters] = useState([]);
    const totalPages = Math.ceil(allCharacters.length/itemsPerPage);
    const router = useRouter();

    useEffect( () => 
        handlePagination()
    , [totalPages]);

    const handlePagination = (targetPage = 1) => {
        console.log(allCharacters);
        let arr = allCharacters.slice((targetPage - 1)*itemsPerPage, itemsPerPage*targetPage);
        setCharacters(arr);
        setCurrentPage(targetPage);
    }

    return (
        <div>
            <main className="flex flex-row flex-wrap gap-5 justify-center">
            { 
                characters.map((char, index) => 
                    <div key={char.name} 
                        className="flex flex-col justify-center items-center gap-4 px-8 rounded-lg mx-2 py-6 bg-gray-800"
                    >
                        <h1 className="font-semibold text-lg min-w-48 py-12 bg-gray-700 text-center hover:underline" 
                            onClick={()=>router.push(`character/${index + 1}`)}
                        >
                            {char.name}
                        </h1>
                        <h3>Height: {char.height} cm</h3>
                        <h3>Gender: {char.gender}</h3>
                        <h3>Birth Year: {char.birth_year}</h3>
                    </div>
                )
            }
            </main>
            <footer className="mt-2 flex flex-col gap-2 items-center">
                <h3>Showing {currentPage} of {totalPages} Pages</h3>
                <div className="text-gray-900">
                    <button 
                        className={`rounded-md bg-gray-400 p-2 m-1 ${currentPage == 1 ? "text-gray-600" : ""}`} 
                        onClick={() => handlePagination(currentPage - 1)}
                        disabled = {currentPage == 1}
                    >
                        {"<< Previous"}
                    </button>
                    {
                        Array.from({length: totalPages}, (_, index) => 
                            <button 
                                key={index} 
                                onClick={() => handlePagination(index + 1)}
                                className={`px-2 py-1 m-1 rounded-md bg-gray-400 ${currentPage == index + 1 ? "bg-gray-600" : "bg-gray-300"}`}
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
            </footer>
        </div>
    )
}
