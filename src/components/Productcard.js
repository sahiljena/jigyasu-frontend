import React from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
const Product = (props) =>{
    const navigate = useNavigate();
    console.log(props);
    if(props.nav){
        var itsurl = `/event/${props.nav}`;
    }
    if(props.type=="full"){
        console.log(props);
        if(props.expiresBy){
            var sday=props.expiresBy.split("-")[0];
            var smonth=props.expiresBy.split("-")[1];
            var syear=props.expiresBy.split("-")[2];
            var today = new Date();
            var yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            var today = mm + '-'+ dd+'-' + yyyy;
            var gotData = props.expiresBy.split("-");
            gotData = gotData[1]+"-"+gotData[0]+"-"+gotData[2];
            var d1 = new Date(gotData);   
            var d2 = new Date(today);   
            var diff = d1.getTime() - d2.getTime();   
            var daydiff = diff / (1000 * 60 * 60 * 24);   
        }
        
        return<>
                <div className="flex flex-col justify-center px-10 max-w-4xl mx-auto mb-16">
                    <div className="mt-10  rounded-lg ">
                        <img className="object-coverw-100 rounded-lg" src={props.pimg} />
                    </div>
                    <div className="mt-3">
                        <h2 className="mt-5 md:mt-1 text-4xl text-blue-600">{props.title}</h2><br />
                        
                        <div className="flex justify-between mt-6">
                            <span className="text-base mt-4 text-gray-500 font-semibold">{props.old}</span><br />
                            <Modal token={props.token} id={props.eid}/>
                            
                        </div>
                        <h2 className="text-blue-900 text-xl font-semibold">Registrations : {props?.partcipants?.length}</h2>
                        <div className="flex justify-between mt-6">
                            <span className="text-xl font-semibold  text-gray-600 ">On {sday}/{smonth}/{syear} at Delhi, India</span><br /><br />
                            <span className="font-semibold text-base text-sky-400 rounded bg-gray-100">{daydiff} Days left</span>
                        </div>
                        <div>
                            <span className="text-gray-800 text-xl mt-6 font-semibold">Description</span> :<br /> 
                            <p className="text-xl text-gray-700 mt-3">
                                {props.description}
                            </p>
                        </div>
                        <hr className="mt-4"></hr>
                        <div className="mt-5">
                            <span className="text-gray-800 text-xl mt-6 font-semibold">Contact Details</span> :<br /> 
                            <p className="text-md text-gray-700 mt-3">
                                <p className="text-xl font-semibold"> 📧 {props.eventEmail} </p>
                                <p className="text-xl font-semibold">📞 +91 {props.eventPhoneNumber}</p>
                                
                            </p>
                        </div>
                        <br/>
                        <Modal token={props.token} id={props.eid}/>
                    </div>
                </div>
        </>
    }
    if(props.admin===true){
        return <div className="rounded-lg  shadow-md">
                
                <div className="rounded-lg ">
                    <img className="shadow-xs p-4 bg-white object-cover h-48 w-96" src={props.pimg} />
                </div>
                
                <div className=" p-4 rounded shadow-xl bg-white">
                    <p className="text-gray-700">
                        <span className="text-xl font-bold">{props.title.split(" ").slice(0, 5).join(" ")}</span><br/>
                        <span className="text-sm font-semibold mt-2 mb-2 text-gray-500">{props.old}</span>
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                        {props.description.split(" ").slice(0, 10).join(" ")}...
                    </p>
                    {/* <p className="text-sm flex justify-between text-gray-700 mt-4">
                        <span className="font-semibold text-sky-400 rounded-xl bg-gray-100 px-2">{props.expiresBy} Days left</span>
                        <span className="bg-gray-100 font-semibold rounded-xl px-2">#{props.category}</span>
                    </p> */}
                    <button className="text-base text-white bg-red-600 rounded p-2 w-full mt-5" onClick={()=>{navigate(itsurl+'/dashboard')}}>Dashboard</button>
                </div>
                
            </div>
    }
    return (
        <a href={itsurl}>
            <div className="rounded-lg  shadow-md">
                
                <div className="rounded-lg ">
                    <img className="shadow-xs p-4 bg-white object-cover h-48 w-96" src={props.pimg} />
                </div>
                
                <div className=" p-4 rounded shadow-xl bg-white">
                    <p className="text-gray-700">
                        <span className="text-xl font-bold">{props.title.split(" ").slice(0, 5).join(" ")}</span><br/>
                        <span className="text-sm font-semibold mt-2 mb-2 text-gray-500">{props.old}</span>
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                        {props.description.split(" ").slice(0, 20).join(" ")}...
                    </p>
                    <p className="text-sm flex justify-between text-gray-700 mt-4">
                        <span className="font-semibold text-sky-400 rounded-xl bg-gray-100 px-2">{props.expiresBy} Days left</span>
                        <span className="bg-gray-100 font-semibold rounded-xl px-2">#{props.category}</span>
                    </p>
                    
                </div>
                
            </div>
        </a>
    );
}

export default Product