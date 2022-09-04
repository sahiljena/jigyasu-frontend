import { func } from "prop-types";
import React,{useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const NewListing = ({token, setToken}) =>{

    const navigate = useNavigate();

    


    const [pName, setPName] = useState('');
    const [productImage, setProductImage] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [expPrice, setExpPrice] = useState('');
    const [age, setAge] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    const [laoding, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [error, setError] = useState(false);
    const [success,setSuccess] = useState(false);
    const[uploadedImg, setUploadedImg] = useState("");

    useEffect(() => {
        if(!token){
            return (navigate('/login'));
        }
    }, [token])

    if(!token){
        navigate('/login');
    }

    const handleProductAdd = (event) =>{
        event.preventDefault();
        setLoading(true);
        console.log(uploadedImg);
        //console.log(token)
        setError(false);
        if(pName&&productImage&&category&&description&&expPrice&&age){

            fetch('https://ecomm-backend-xcv34.herokuapp.com/api/listing/new',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body: JSON.stringify({
                    title:pName,
                    category:category,
                    description:description,
                    expectedPrice:expPrice,
                    productAge:age,
                    productImg:uploadedImg,
                })
            })
            .then(function (response) {
                return response.json();
            })
            //Then with the data from the response in JSON...
            .then((data) => {
                if(data.message==="Product listed successfully"){
                    setLoading(false);
                    setStatus("Product listed successfully");
                    setSuccess(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                else{
                    setLoading(false);
                    setError(true);
                    setStatus('Something went wrong.');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                return console.log(data);
            })
            //Then with the error genereted...
            .catch((error) => {
                console.error(error);
            });
            setLoading(false);
            setStatus('Posting AD...');
        }else{
            setLoading(false);
            setError(true);
            setStatus('All the fields are required.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    const handleProductImageChange = async (event) => {
        setLoading(true)
        setImagePreview(URL.createObjectURL(event.target.files[0]));
        setProductImage(event.target.files[0]);
        let formData = new FormData();

        formData.append("productImg",event.target.files[0]);
        //console.log(formData)
        const resp = await fetch('https://ecomm-backend-xcv34.herokuapp.com/api/listing/newImg',{
                                method:'POST',
                                headers:{
                                    // 'Content-Type': 'multipart/form-data',
                                    'Authorization':`Bearer ${token}`,
                                },
                                body: formData,
                            })
        const img = await resp.json();
        setUploadedImg(img.uploaded_img);
        //console.log(img.uploaded_img);
        //console.log(uploadedImg);
        setLoading(false);
        return uploadedImg;
            // .then((data)=>{
            //     return data.json()
            // })
            // .then((j)=>{
            //     //console.log(j);
            //     //console.log(JSON.stringify(j));
            //     setUploadedImg(JSON.stringify(j));
            //     console.log("Inside THEN",uploadedImg);
            //     return "IMAGE UPLOADED"
            // })
            

    }



    return(
        <>
            <Navbar setToken={setToken} token={token} />
            <div className='flex justify-center mt-10'>

                <div class="w-full max-w-xl">

                    <form onSubmit={handleProductAdd} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" enctype="multipart/form-data">

                        <div className="mb-4">
                            {error&&<div className='bg-red-300 text-base text-white rounded px-1 py-1'>
                                {status}
                            </div>
                            }
                            {success&&<div className='bg-green-500 text-base text-white rounded px-1 py-1'>
                                {status}
                            </div>
                            }
                        </div>

                        <div className='mb-4 text-center text-lg font-bold text-gray-600'>
                            <h2>Add a new event.</h2>
                        </div>


                        <div className="mb-4">
                            <label className="block text-sm font-bold tracking-tight text-gray-500 mb-2" for="pname">
                                Event Name
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="pname" 
                                type="text" 
                                placeholder="Product Name"
                                value = {pName}
                                onChange={(e)=>setPName(e.target.value)}
                            />
                            <p className="text-red-500 text-xs italic"></p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold tracking-tight text-gray-500 mb-2" for="category">
                                Event Category
                            </label>
                            <select  onChange={(e)=>{setCategory(e.target.value)}} name="category" id="category" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option disabled selected value={category}> -- select an option -- </option>
                                <option value="mobile">Workshop</option>
                                <option value="laptop">Seminar</option>
                                <option value="books">Symposium</option>
                            </select>
                            <p className="text-red-500 text-xs italic"></p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold tracking-tight text-gray-500 mb-2" for="description">
                                Description
                            </label>
                            <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                            <p className="text-red-500 text-xs italic"></p>
                        </div>

                        {/* <div className="mb-4">
                            <label className="block text-sm font-bold tracking-tight text-gray-500 mb-2" for="expPrice">
                                Expected Price 
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="expPrice" 
                                type="number" 
                                placeholder="Rs1000"
                                value = {expPrice}
                                onChange={(e)=>setExpPrice(e.target.value)}
                            />
                            <p className="text-red-500 text-xs italic"></p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold tracking-tight text-gray-500 mb-2" for="age">
                                How old is your product? 
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="age" 
                                type="number" 
                                placeholder="10 yrs old"
                                value = {age}
                                onChange={(e)=>setAge(e.target.value)}
                            />
                            <p className="text-red-500 text-xs italic"></p>
                        </div>

                         */}

                        <br />
                        
                        <div className="max-w-2xl rounded-lg">
                            <div className="m-4">
                                <label className="inline-block mb-2 text-gray-500">Add Poster image</label>
                                <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                    <div className="flex flex-col items-center justify-center pt-7">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                        Attach a file</p>
                                    </div>
                                    <input type="file" className="opacity-0" 
                                    onChange={handleProductImageChange} 
                                    />
                                </label>
                                </div>
                                {imagePreview?<div className="mb-4">
                                    <img className="w-full p-2 rounded lg:w-1/3 md:w-1/3 md:h-1/5" src={imagePreview} />
                                    <br />
                                    <button className="underline decoration-dashed text-red-600" onClick={()=>{setProductImage('');setImagePreview('');}}>Remove</button>
                                </div>:<></>}
                            </div>
                        </div>
                        

                        <div className="flex items-center justify-center">
                            {success?<></>:<button 
                                className="w-full bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                                type="submit"
                                disabled={laoding}
                            >
                                {laoding?<>Please wait ...</>:<>Post</>}
                            </button>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewListing;