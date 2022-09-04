import React,{useState,  useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';

const Searchbar = ({token}) =>{

    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);

    const fetchListings = async () =>{
        setLoading(true)
        var endpoint = `https://dr711-backend-2022-01.herokuapp.com/api/event/search?q=${query}`
        try{
            const response = await fetch(endpoint)
            const tours = await response.json()
            console.log(tours)
            setLoading(false)
            setListings(tours)
        } catch(error){
            setLoading(false)
            console.log("Error Occured");
            console.log(error);
        }
    }
    useEffect(() => {
        if(!token){
            //console.log("HAHA");
            return (navigate('/login'));
        }
    }, [token])

    const handleSearch = (e) =>{
        setQuery(e.target.value);
        console.log(e.target.value);
        if(query.length>2){
            fetchListings();
        }
        
    }
    const handleBackSpace = (e) =>{
        if(e.keyCode === 8){
            setListings([]);
        }
    }

    return (
        <>
        <div className="flex flex-col">
            <div className="flex border-2 rounded sticky top-0">
                <input type="text" className="px-4 py-2 w-full md:w-auto outline-0" placeholder="Search..." onChange={handleSearch} value={query} onKeyDown={handleBackSpace} />
                <button className="flex items-center justify-center px-4 border-0">
                    <svg className="w-6 h-6 text-gray-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                    </svg>
                </button>
            </div>
            <div className="overflow-visible h-0 z-10">
                {listings.length>0?<div className="bg-slate-100 px-2 py-2">
                    {listings && listings.map((data)=>{
                        return<a href={`/event/${data.event_random_code}`}><div className="overflow-auto flex mt-4 rounded bg-gray-200 text-gray-600 px-4 py-4 w-80">{data.eventName.split(" ").slice(0, 4).join(" ")}...</div></a>
                    })}
                </div>:null}
            </div>
        </div>
        
        </> 
    );
}

export default Searchbar;