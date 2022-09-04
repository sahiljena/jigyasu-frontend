import React,{useState,  useEffect} from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Product from '../components/Productcard';
import { useParams } from "react-router-dom";
import {toast } from 'react-toastify';

const ProductPage = ({token , setToken}) =>{
    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [particpants, setParticpants] = useState([]);
    const [option, setOption] = useState(0);

    const [subLoading, setSubLoading] = useState(false);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const fetchListings = async () =>{
        setLoading(true)
        var endpoint = `https://dr711-backend-2022-01.herokuapp.com/api/event/findbyCode/${params.id}`
        try{
            const response = await fetch(endpoint)
            const tours = await response.json()
            setLoading(false)
            setListings(tours)
            //console.log(tours);
        } catch(error){
            setLoading(false)
            console.log("Error Occured");
            console.log(error);
        }
    }
    const fetchPartcipants = async () =>{
        setLoading(true)
        var endpoint = `https://srmcheck-api.azurewebsites.net/api/event/find/${params.id}`
        try{
            const response = await fetch(endpoint)
            console.log(response);
            const tours = await response.json()
            setLoading(false)
            setParticpants(tours)
            console.log(tours);
        } catch(error){
            setLoading(false)
            console.log("Error Occured");
            console.log(error);
        }
    }
    const handleSendNotification = (event)=>{
        event.preventDefault();
        setSubLoading(true);
        fetch(`https://srmcheck-api.azurewebsites.net/api/event/email/${listings?.event_random_code}?subject=${subject}&context=${message}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(function (response) {
                setSubLoading(false);
                console.log(response);
                toast.success("Notification Mail Sent !!")
                return response.json();
            })
            .catch((error) => {
                toast.error(error);
                setSubLoading(false);
                console.error('Error:', error);
            });
    }
    const handleSendNotificationtoAll = (event)=>{
        event.preventDefault();
        setSubLoading(true);
        fetch(`https://srmcheck-api.azurewebsites.net/api/user/email/?subject=${subject}&context=${message}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(function (response) {
                setSubLoading(false);
                console.log(response);
                toast.success("Notification Mail Sent !!")
                return response.json();
            })
            .catch((error) => {
                toast.error(error);
                setSubLoading(false);
                console.error('Error:', error);
            });
    }
    const PricingTable = ()=>{
        return (

      <div className="pricing-table-2 bg-gray-800 py-6 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-medium text-white mb-4 md:mb-6">Pricing Plans</h1>
            <p className="text-gray-500 xl:mx-12">You have 3 plans to choose from for using FWR blocks. Basic blocks are FREE forever. Other premium blocks are also free. You can use it for your personal or commercial events. Just don't forget to share our website or give attribution.</p>
          </div>
          <div className="pricing-plans lg:flex lg:-mx-4 mt-6 md:mt-12">
            <div className="pricing-plan-wrap lg:w-1/3 my-4 md:my-6">
              <div className="pricing-plan border-t-4 border-solid border-white bg-white text-center max-w-sm mx-auto hover:border-indigo-600 transition-colors duration-300">
                <div className="p-6 md:py-8">
                  <h4 className="font-medium leading-tight text-2xl mb-2">Small Business</h4>
                  <p className="text-gray-600">For small events</p>
                </div>
                <div className="pricing-amount bg-indigo-100 p-6 transition-colors duration-300">
                  <div className><span className="text-4xl font-semibold">$19</span> /year</div>
                </div>
                <div className="p-6">
                  <ul className="leading-loose">
                    <li>Upto 5 promotions a month</li>
                    <li>Max 20% users of all reach</li>
                    <li>Basic statistics</li>
                    <li>Support</li>
                  </ul>
                  <div className="mt-6 py-4">
                    <button onClick={()=>setOption(4)} className="bg-indigo-600 text-xl text-white py-2 px-6 rounded hover:bg-indigo-700 transition-colors duration-300">Pay Now</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="pricing-plan-wrap lg:w-1/3 my-4 md:my-6">
              <div className="pricing-plan border-t-4 border-solid border-white bg-white text-center max-w-sm mx-auto hover:border-indigo-600 transition-colors duration-300">
                <div className="p-6 md:py-8">
                  <h4 className="font-medium leading-tight text-2xl mb-2">Professional</h4>
                  <p className="text-gray-600">For large scale events</p>
                </div>
                <div className="pricing-amount bg-indigo-100 p-6 transition-colors duration-300">
                  <div><span className="text-4xl font-semibold">$29</span> /year</div>
                </div>
                <div className="p-6">
                  <ul className="leading-loose">
                    <li>Upto 50 promotions a month</li>
                    <li>Max 50% users of all reach</li>
                    <li>Basic statistics</li>
                    <li>Support</li>
                  </ul>
                  <div className="mt-6 py-4">
                    <button onClick={()=>setOption(4)} className="bg-indigo-600 text-xl text-white py-2 px-6 rounded hover:bg-indigo-700 transition-colors duration-300">Pay Now</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="pricing-plan-wrap lg:w-1/3 my-4 md:my-6">
              <div className="pricing-plan border-t-4 border-solid border-white bg-white text-center max-w-sm mx-auto hover:border-indigo-600 transition-colors duration-300">
                <div className="p-6 md:py-8">
                  <h4 className="font-medium leading-tight text-2xl mb-2">Power User</h4>
                  <p className="text-gray-600">For multi large scale events</p>
                </div>
                <div className="pricing-amount bg-indigo-100 p-6 transition-colors duration-300">
                  <div className><span className="text-4xl font-semibold">$39</span> /year</div>
                </div>
                <div className="p-6">
                  <ul className="leading-loose">
                    <li>Unlimited promotions a month</li>
                    <li>Unlimited users reach</li>
                    <li>Deep statistics</li>
                    <li>Special Support</li>
                  </ul>
                  <div className="mt-6 py-4">
                    <button onClick={()=>setOption(4)} className="bg-indigo-600 text-xl text-white py-2 px-6 rounded hover:bg-indigo-700 transition-colors duration-300">Pay Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    }
    useEffect(() => {
        if(!token){
            return (navigate('/login'));
        }
        fetchListings();
        fetchPartcipants();
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
        <div className="flex flex-col justify-center px-10 max-w-4xl mx-auto mb-16">
            {listings && particpants && <>
            <br/>
            <h1 className="font-semibold text-2xl text-blue-900">Event Dashboard</h1>
            <h2 className="mt-5 md:mt-1 text-2xl">{listings.eventName}</h2><br />
            <p className="font-semibold text-xl">Total Registrations : <span className="text-pink-600">{particpants.length}</span></p>
            <div className="mt-6 p-2">
                <h3 className="text-xl font-semibold mb-5">Actions</h3>
                <div className="flex justify-around">
                    <button className="bg-blue-800 rounded p-2 text-white font-semibold" onClick={()=>setOption(1)}>🔔 Send Notification Email</button>
                    <button className="bg-gray-900 rounded p-2 text-white font-semibold" onClick={()=>setOption(0)}>👁️ View Particants</button>
                    <button className="bg-red-800 rounded p-2 text-white font-semibold" onClick={()=>setOption(2)}>🏅Release Certificates</button>
                    <button className="bg-cyan-800 rounded p-2 text-white font-semibold" onClick={()=>setOption(3)}>🚀Promote</button>
                </div>
                {option===0 && <p className="font-semibold text-sm mt-10">
                    <br/><br/>
                    <p className="text-base">Particants</p>
                    <ul className="max-w-md divide-y m-auto w-full">
                        {particpants?.map((particpant)=>{
                            return <>
                            <li class="pb-3 sm:pb-4 m-auto bg-gray-100 shadow-xl mt-3 p-2">
                                
                                <div class="flex items-center space-x-4">
                                    <input id="link-radio" type="radio" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                    <div class="flex-shrink-0">
                                        <img class="w-8 h-8 rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="Neil image" />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate">
                                        {particpant.name}
                                        </p>
                                        <p class="text-sm text-gray-900 truncate">
                                        <a href={`mailto:${particpant.email}`}>{particpant.email}</a>
                                        </p>
                                        <p class="text-sm text-gray-900 truncate ">
                                        {particpant.number}
                                        </p>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900">
                                        {particpant.college}
                                    </div>
                                </div>
                            </li>
                            <li>   </li>
                            </>
                        })}
                    </ul>
                    </p>}
                {option===1 &&<>
                <br/>
                <br/>
                <p className="text-xl font-semibold">🔔 Send Notification</p>
                <form onSubmit={handleSendNotification}>
                    <div class="mb-6 mt-10">
                        <label for="message" class="block mb-2 text-xl font-medium text-gray-900">Subject</label>
                        <input value = {subject}
                                onChange={(e)=>setSubject(e.target.value)} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-blue-800 focus:ring-blue-500 focus:border-blue-500  " placeholder="Your message..."/>
                    </div>
                    <div class="mb-6 mt-10">
                        <label for="message" class="block mb-2 text-xl font-medium text-gray-900">Your message</label>
                        <textarea value = {message}
                                onChange={(e)=>setMessage(e.target.value)} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-blue-800 focus:ring-blue-500 focus:border-blue-500  " placeholder="Your message..."></textarea>
                    </div>
                    <button  type="submit" class="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">{subLoading?'sending...':'Send message'}</button>
                </form>
                </>}
                {option===3 &&<>
                <br/>
                <PricingTable/>
                <br/>
                
                </>}
                {option===4 &&<>
                <br/>
                <p className="text-xl font-semibold"> 🚀Promote</p>
                <form onSubmit={handleSendNotificationtoAll}>
                    <div class="mb-6 mt-10">
                        <label for="message" class="block mb-2 text-xl font-medium text-gray-900">Subject</label>
                        <input value = {subject}
                                onChange={(e)=>setSubject(e.target.value)} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-blue-800 focus:ring-blue-500 focus:border-blue-500  " placeholder="Your message..."/>
                    </div>
                    <div class="mb-6 mt-10">
                        <label for="message" class="block mb-2 text-xl font-medium text-gray-900">Your message</label>
                        <textarea value = {message}
                                onChange={(e)=>setMessage(e.target.value)} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-blue-800 focus:ring-blue-500 focus:border-blue-500  " placeholder="Your message..."></textarea>
                    </div>
                    <button  type="submit" class="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">{subLoading?'sending...':'Send message'}</button>
                </form>
                </>}
            </div>
            </>}
        </div>
        {/* {listings?
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
        :<div className="text-xl px-5 py-5 mt-30 text-center">:( Nothing to show!</div>} */}
        </>
    );
}
export default ProductPage