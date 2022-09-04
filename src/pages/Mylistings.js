import React,{useState,  useEffect} from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Product from '../components/Productcard';
const MyListings = ({token , setToken }) =>{

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [userData, setUserData] = useState({});
    

    const fetchMyData = async () =>{
        setLoading(true)
        try{
            const response = await fetch('https://dr711-backend-2022-01.herokuapp.com/api/user/me',{
                headers:{
                    'Authorization' : `Bearer ${token}`
                }
            })
            const tours = await response.json()
            //console.log(tours)
            setLoading(false)
            setUserData(tours)
        } catch(error){
            setLoading(false)
            console.log("Error Occured");
            console.log(error);
        }
    }
    const fetchUserEvents = async () =>{
        if(userData._id)
        {
            setLoading(true)
            try{
                const response = await fetch(`https://srmcheck-api.azurewebsites.net/api/user/find/${userData?._id}`,{
                    headers:{
                        'Authorization' : `Bearer ${token}`
                    }
                })
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
    }
    useEffect(() => {
        if(!token){
            return (navigate('/login'));
        }
        if(!userData._id){
            fetchMyData();
        }
        if(userData._id){
            fetchUserEvents();
        }
    }, [token, userData])

    const handleDelete = async (id) =>{
        setLoading(true)
        try{
            const response = await fetch('https://dr711-backend-2022-01.herokuapp.com/api/listings/delete',{
                method:"POST",
                headers:{
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    id:id
                })
            })
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
        {userData && listings && <div className="p-2 max-w-6xl margin-auto rounded  m-auto mt-10 p-2">
            <div className="flex gap-2 p-3 bg-blue-900 rounded-xl text-white">
                <div className="rounded-full">
                    <img className="rounded-full w-24" src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`}/>
                </div>
                <div>
                    <p className="font-semibold text-xl ml-10"> 🙎‍♂️ {userData?.name}</p>
                    <p className="font-semibold text-sm ml-10"> 🎓 {(userData?.college)?.toUpperCase()}</p>
                    <p className="text-sm ml-10"> 📧 {userData?.email}</p>
                    <p className="text-sm ml-10">📞 +91 {userData?.phoneNumber}</p>
                </div>
                <div className="ml-36">
                    <p1 className="text-xl font-semibold">🏆 Stats 🏆</p1><br/>
                    Participations : {userData?.event_partcipated?.length}<br/>
                    Hosted : {userData?.events_hosted?.length}
                </div>
                <div className="ml-36">
                    <p1 className="text-xl font-semibold">✨ Intrests ✨</p1><br/>
                    
                </div>
            </div>


            <h1 className="text-2xl text-blue-900 font-semibold -mb-16 mt-10 ml-10">Events Hosted</h1>
            <div class="grid 4xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 w-full mt-6 md:px-15 px-5 py-10">
                {/* {listings?.event_partcipated?.length>0?<>
                    {userData?.event_partcipated?.map((data)=>{
                        console.log(data._id);
                        return <>
                            <Product nav={data._id} img={data.prodcutImg} title={data.title} description={data.description} price={data.expectedPrice} old={data.productAge} deleteListing={()=>handleDelete(data._id)} delButton={true} />
                        </>
                    })}
                    </>:<p className="text-center">Nothing to show!</p>
                } */}
                
                {userData && listings?.map((event)=>{
                    return <>
                    {event?.event_hosted && <Product 
                            key={event?.event_hosted?._id} 
                            nav={event?.event_hosted?.event_random_code} 
                            img={event?.event_hosted?.prodcutImg} 
                            title={event?.event_hosted?.eventName} 
                            description={event?.event_hosted?.eventDescription} 
                            price={event?.event_hosted?.expectedPrice} 
                            old={event?.event_hosted?.hostedBy}
                            expiresBy={0}
                            category={event?.event_hosted?.category}
                            tags={event?.event_hosted?.tags}
                            pimg={event?.event_hosted?.posterImg}
                            admin={true}
                        />}
                    </>
                })}
            </div>

            <h1 className="text-2xl text-blue-900 font-semibold -mb-16 mt-10 ml-10">Events Participated</h1>
            <div class="grid 4xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 w-full mt-6 md:px-15 px-5 py-10">
                {/* {listings?.event_partcipated?.length>0?<>
                    {userData?.event_partcipated?.map((data)=>{
                        console.log(data._id);
                        return <>
                            <Product nav={data._id} img={data.prodcutImg} title={data.title} description={data.description} price={data.expectedPrice} old={data.productAge} deleteListing={()=>handleDelete(data._id)} delButton={true} />
                        </>
                    })}
                    </>:<p className="text-center">Nothing to show!</p>
                } */}
                
                {userData && listings?.map((event)=>{
                    return <>
                    {event?.event_participated && <Product 
                            key={event?.event_participated?._id} 
                            nav={event?.event_participated?.event_random_code} 
                            img={event?.event_participated?.prodcutImg} 
                            title={event?.event_participated?.eventName} 
                            description={event?.event_participated?.eventDescription} 
                            price={event?.event_participated?.expectedPrice} 
                            old={event?.event_participated?.hostedBy}
                            expiresBy={0}
                            category={event?.event_participated?.category}
                            tags={event?.event_participated?.tags}
                            pimg={event?.event_participated?.posterImg}
                        />}
                    </>
                })}
            </div>
        </div>
        }
        
        </>
    );
}

export default MyListings;