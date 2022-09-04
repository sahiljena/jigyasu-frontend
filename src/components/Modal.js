import React,{useState} from "react";
import {toast } from 'react-toastify';

export default function Modal(props) {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    console.log(props);
    const registerUser = () =>{
        setLoading(true);
        fetch(`https://dr711-backend-2022-01.herokuapp.com/api/event/register/${props.id}`,{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${props.token}`,
                },
            })
            .then(function (response) {
                setLoading(false);
                console.log(response);
                return response.json();
            })
            .then((data) => {
                if(data.message==="Already Registered"){
                    toast.error(data.message);
                }else{
                    setSuccess(true);
                }
                console.log(data);
            })
    }

    return (
        <>
        <button
            className="mt-2 bg-blue-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
        >
            Register
        </button>
        {showModal ? (
            <>
            <div
                className="ml-5 mr-5 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                        Are you sure ?
                    </h3>
                    <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                    >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                        </span>
                    </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                        {success?
                            <>
                            <h1 className="text-2xl text-green-400">Oh yeah !! You have successfully registered for the event.</h1>
                            <img 
                            src={'https://cms-assets.tutsplus.com/cdn-cgi/image/width=630/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png'}
                            className="rounded w-100"
                            />
                        </>:<>Please confirm your registration.</>}
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    {/* <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button> */}
                    {loading?<>Loading...</>:<>
                        {success?<></>:<button
                            className="bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-10 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => registerUser()}
                        >
                            Yes
                        </button>}
                        <button
                            className="bg-red-100 text-red-500 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </>}
                    </div>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}
        </>
    );
}