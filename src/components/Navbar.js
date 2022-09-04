import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar"
const Navbar = ({setToken, token}) =>{

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    return(
        <>
            <nav className='px-2 pt-4 block md:hidden bg-blue-600'>
                <div className="flex justify-between border-b-2 pb-2">
                    <div className='flex gap-4 text-3xl'>Jigyaasu</div>
                    {token && 
                    <><button className='max-w-none flex shadow-sm px-3 py-2 font-semibold text-sm bg-blue-500 text-white rounded shadow-sm' onClick={()=>{navigate('/additem')}}>
                                Host 
                                {/* <span className="px-2">
                                    <marquee scrolldelay={30} className="w-20 text-red-500 bg-blue-400 rounded-xl" direction="left">Workshop    Symposium Seminars</marquee>
                                </span> */}
                        </button></>}
                    <div  onClick={()=>{setIsOpen(!isOpen)}} class="space-y-2">
                        <span class="block w-8 h-0.5 bg-gray-600"></span>
                        <span class="block w-8 h-0.5 bg-gray-600"></span>
                        <span class="block w-5 h-0.5 bg-gray-600"></span>
                    </div>
                </div>
                {isOpen && <div className="text-center flex flex-col">{token?<>
                    <button className='px-2 py-1 font-semibold text-sm text-gray-500 hover:text-blue-500 text-white rounded shadow-sm' onClick={()=>{navigate('/')}}>Home</button>
                    <button className='px-2 py-1 font-semibold text-sm text-gray-500 hover:text-blue-500 text-white rounded shadow-sm' onClick={()=>{navigate('/dashboard')}}>Dashboard</button>
                    <button className='px-2 py-1 font-semibold text-sm text-red-500 hover:text-red-800 text-white rounded shadow-sm' onClick={()=>{setToken('')}}>Logout</button>
                    </>:<>
                    <button className='px-2 py-1 font-semibold text-sm text-white rounded shadow-sm' onClick={()=>{navigate('/login')}}>Sign In</button>
                    <button className='px-2 py-1 font-semibold text-sm text-white rounded shadow-sm' onClick={()=>{navigate('/aboutus')}}>About Us</button>

                    <button className='px-2 py-1 font-semibold text-sm bg-blue-500 text-white rounded shadow-sm' onClick={()=>{navigate('/register')}}>Register</button>
                    </>}</div>}
                {token && <Searchbar token={token} setToken={setToken} />}
            </nav>
            <nav className='flex justify-around border-b-2 px-2 py-4 hidden md:flex bg-blue-900'>
                <div className='flex gap-4'>
                    <div className='flex gap-4 text-3xl font-bold drop-shadow-xl shadow-white-200 text-blue-200'><span className="bg-blue-200 text-blue-900 rounded px-2 -mr-3">J</span>igyaasu</div>
                </div>
                <div className='flex gap-4'>
                    {token?<>
                    <button className=' bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 max-w-none flex shadow-sm px-2 py-1 font-semibold text-xl bg-blue-500 text-white rounded shadow-sm' onClick={()=>{navigate('/additem')}}>
                        Host an event
                                
                        </button>
                    <button className='px-2 py-1 font-semibold text-sm text-gray-100 text-white rounded shadow-sm' onClick={()=>{navigate('/')}}>Home</button>
                    <button className='px-2 py-1 font-semibold text-sm text-gray-100 text-white rounded shadow-sm' onClick={()=>{navigate('/dashboard')}}>Dashboard</button>
                    <button className='px-2 py-1 font-semibold text-sm text-red-500 rounded shadow-sm' onClick={()=>{setToken('')}}>Logout</button>
                    </>:<>
                    <button className='px-2 py-1 font-semibold text-sm text-white rounded shadow-sm' onClick={()=>{navigate('/login')}}>Sign In</button>
                    <button className='px-2 py-1 font-semibold text-sm text-white rounded shadow-sm' onClick={()=>{navigate('/aboutus')}}>About Us</button>
                    <button className='px-2 py-1 font-semibold text-sm bg-blue-500 text-white rounded shadow-sm' onClick={()=>{navigate('/register')}}>Register</button>
                    </>}
                </div>
            </nav>
            {token && <div className="flex justify-around shadow-md px-2 py-2 bg-gray-100 ">
                <a className="text-blue-700 hover:text-blue-500 mt-2 font-semibold" href="/">Home</a>
                <a className="text-blue-700 hover:text-blue-500 mt-2 font-semibold" href="/workshops">Workshops</a>
                <div className="hidden md:flex">
                    <Searchbar token={token} setToken={setToken} />
                </div>
                <a className="text-blue-700 hover:text-blue-500 mt-2 font-semibold" href="/seminars">Seminars</a>
                <a className="text-blue-700 hover:text-blue-500 mt-2 font-semibold" href="/symposium">Symposium</a>
            </div>}
        </>
    );
}

export default Navbar;