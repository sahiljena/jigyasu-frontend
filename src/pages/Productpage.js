import React,{useState,  useEffect} from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Product from '../components/Productcard';
import { useParams } from "react-router-dom";


const ProductPage = ({token , setToken}) =>{
    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);

    const fetchListings = async () =>{
        setLoading(true)
        var endpoint = `https://dr711-backend-2022-01.herokuapp.com/api/event/findbyCode/${params.id}`
        try{
            const response = await fetch(endpoint)
            const tours = await response.json()
            setLoading(false)
            setListings(tours)
            console.log(tours);
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

    // if(listings.length===1){
    //     document.title = `${listings[0].title} - Rs ${listings[0].expectedPrice}`
    // }
    // if(listings){
    //     document.title = `${listings[0].eventName}`;
    // }
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
        {console.log(listings)}
        <Navbar setToken={setToken} token={token} />
        {/* {listings && <span className="text-sm py-3 px-6 text-gray-600 pt-6">../{listings.length>0?<>{listings[0].title} - Rs. {listings[0].expectedPrice}</> :<></>}</span>} */}
        {listings?
                        <Product
                            token={token}
                            eid={listings._id}
                            type={"full"}
                            key={listings.prodcutImg} 
                            nav={listings.event_random_code} 
                            img={listings.prodcutImg} 
                            title={listings.eventName} 
                            description={listings.eventDescription} 
                            price={listings.expectedPrice} 
                            old={listings.hostedBy}
                            expiresBy={listings.expiresBy}
                            category={listings.category}
                            tags={listings.tags}
                            pimg={listings.posterImg}
                            eventEmail={listings.eventEmail}
                            eventPhoneNumber={listings.eventPhoneNumber}
                            partcipants={listings.partcipants}
                        />
        :<div className="text-xl px-5 py-5 mt-30 text-center">:( Nothing to show!</div>}
        </>
    );
}
export default ProductPage