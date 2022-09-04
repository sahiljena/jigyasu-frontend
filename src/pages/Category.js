import React,{useState,  useEffect} from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Product from '../components/Productcard';
const Category = ({token , setToken, category, endpoint , limit}) =>{

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);


    if(!limit){
        document.title = `${category} - JigYasu`
    }
    
    const fetchListings = async () =>{
        setLoading(true);
        //console.log(endpoint);
        try{
            const response = await fetch(endpoint)
            const tours = await response.json()
            setLoading(false)
            setListings(tours)
            console.log(tours)
        } catch(error){
            setLoading(false)
            console.log("Error Occured");
            console.log(error);
        }
    }
    useEffect(() => {
        if(!token){
            return (navigate('/login'));
        }
        fetchListings()
    }, [token])

    if(limit){
        if(loading){
            return <>
                <h2 className="text-2xl py-3 px-6 text-blue-600 ml-3">{category}</h2>
                <h3 className="text-center text-xl">Loading...</h3>
            </>
        }
        return(
        <>
        <a className="text-2xl py-3 px-6 text-blue-600 ml-3 font-semibold" href={`/${category}`}>{category}</a>
        {listings.length>=1?<div class="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 w-full mt-6 md:px-15 px-5 py-10">
            {
                listings.map((data)=>{
                    var today = new Date();
                    var yyyy = today.getFullYear();
                    let mm = today.getMonth() + 1; // Months start at 0!
                    let dd = today.getDate();

                    if (dd < 10) dd = '0' + dd;
                    if (mm < 10) mm = '0' + mm;

                    var today = mm + '-'+ dd+'-' + yyyy;

                    var gotData = data.expiresBy.split("-");
                    gotData = gotData[1]+"-"+gotData[0]+"-"+gotData[2];

                    var d1 = new Date(gotData);   
                    var d2 = new Date(today);   
                        
                    var diff = d1.getTime() - d2.getTime();   
                        
                    var daydiff = diff / (1000 * 60 * 60 * 24);   
                    //console.log(data);
                    return <>
                        <Product 
                            key={data._id} 
                            nav={data.event_random_code} 
                            img={data.prodcutImg} 
                            title={data.eventName} 
                            description={data.eventDescription} 
                            price={data.expectedPrice} 
                            old={data.hostedBy}
                            expiresBy={daydiff}
                            category={data.category}
                            tags={data.tags}
                            pimg={data.posterImg}
                        />
                    </> 
                })
            }
            <button type="button" class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
            <span class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                <span class="sr-only">Next</span>
            </span>
        </button>
        </div>:<div className="text-xl px-5 py-5 mt-30 text-center">:( Nothing to show!</div>}
        <a className="mb-10 px-10 pb-10 text-blue-400" href={`/${category}`}>more...</a><br /><br />
        </>
        )
    }

    if(loading){
        return (
            <div className="grid justify-items-center items-center h-screen">
                <div>
                    <h3 className="text-center text-xl">Loading..</h3>
                    <p className="text-sm">this might take a few minutes</p>
                </div>
            </div>
        );
    }
    return(
        <>
        <Navbar setToken={setToken} token={token} />
        <h2 className="text-2xl py-3 px-6 text-purple-600">{category}</h2>
        {listings.length>0?<div class="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 w-full mt-6 md:px-15 px-5 py-10">
            {
                listings.map((data)=>{
                    var today = new Date();
                    var yyyy = today.getFullYear();
                    let mm = today.getMonth() + 1; // Months start at 0!
                    let dd = today.getDate();

                    if (dd < 10) dd = '0' + dd;
                    if (mm < 10) mm = '0' + mm;

                    var today = mm + '-'+ dd+'-' + yyyy;

                    var gotData = data.expiresBy.split("-");
                    gotData = gotData[1]+"-"+gotData[0]+"-"+gotData[2];

                    var d1 = new Date(gotData);   
                    var d2 = new Date(today);   
                        
                    var diff = d1.getTime() - d2.getTime();   
                        
                    var daydiff = diff / (1000 * 60 * 60 * 24);   
                    console.log(data);
                    return <>
                        <Product 
                            key={data._id} 
                            nav={data.event_random_code} 
                            img={data.prodcutImg} 
                            title={data.eventName} 
                            description={data.eventDescription} 
                            price={data.expectedPrice} 
                            old={data.hostedBy}
                            expiresBy={daydiff}
                            category={data.category}
                            tags={data.tags}
                            pimg={data.posterImg}
                        />
                    </>
                })
            }
        </div>:<div className="text-xl px-5 py-5 mt-30 text-center">:( Nothing to show!</div>}
        </>
    );
}

export default Category;