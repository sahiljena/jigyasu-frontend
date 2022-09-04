import React from "react";
import Navbar from "../components/Navbar";
const AboutUs = () =>{
    return(
    <>
    <Navbar />
<div>
        <div className="py-20 bg-cover bg-no-repeat bg-fixed" style={{backgroundImage: 'url(https://journalsofindia.com/wp-content/uploads/2020/11/All-India-Council-for-Technical-Education-AICTE.jpg)'}}>
          <div className="container m-auto text-center px-6 opacity-100">
            <h2 className="text-4xl font-bold mb-2 text-white drop-shadow-lg	">Your go-to place to find any</h2>
            <h3 className="text-5xl mb-8 text-white drop-shadow-lg">Workshops, Seminars, Symposium</h3>
            <button className="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider hover:border-transparent hover:text-blue-500 hover:bg-gray-800">So are you ready?</button>
          </div>
        </div>
        <section className="container mx-auto px-6 p-10">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Jigyaasu.</h2>
          <div className="flex items-center flex-wrap mb-20">
            <div className="w-full md:w-1/2 pr-10">
              <h4 className="text-3xl text-gray-800 font-bold mb-3">All-in-one</h4>
              <p className="text-gray-600 mb-8">
                Jisyaasu is an in all-in-one platform for both hosts and partcipants.<br />
                It empowers everyone to access information about all the academic activites going around in the world and in the country.
                Connect with the world and share your knwoledge we have got everything covered!!

              </p>
            </div>
            <div className="w-full md:w-1/2">
              <img className="rounded-lg" src="https://i.ibb.co/6PSbdLP/undraw-A-day-off-re-hedl.png" alt="Vortex" />
            </div>
          </div>
          <div className="flex items-center flex-wrap mb-20">
            <div className="w-full md:w-1/2">
              <img className="rounded-lg" src="https://i.ibb.co/5L9jcrb/undraw-Certification-re-ifll.png" alt="use the force" />
            </div>
            <div className="w-full md:w-1/2 pl-10">
              <h4 className="text-3xl text-gray-800 font-bold mb-3">Use the Force!</h4>
              <p className="text-gray-600 mb-8">
                Now with Jigyaasu its even easier to manage the events!!, Your partcipants are just one click away from getting their certificates.
                Hosts can even take registrations and connect with thier partcipants through one common portal.
              </p>
            </div>
          </div>
          <div className="flex items-center flex-wrap mb-20">
            <div className="w-full md:w-1/2 pr-10">
              <h4 className="text-3xl text-gray-800 font-bold mb-3">Life creates it</h4>
              <p className="text-gray-600 mb-8">
                Connect with your freinds and let them know what workshops, seminars or Symposiums your are attending these days,
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <img className="rounded-lg" src="https://i.ibb.co/6PSbdLP/undraw-A-day-off-re-hedl.png" alt="Syncing" />
            </div>
          </div>
        </section>
        {/* <section className="bg-gray-100">
          <div className="container mx-auto px-6 py-20">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Artoo expresses</h2>
            <div className="flex flex-wrap">
              <div className="w-full h-auto md:w-1/3 px-2 mb-4">
                <div className="flex flex-col justify-between h-full bg-white rounded shadow py-2">
                  <p className="text-gray-800 text-base px-6 mb-5">How are you feeling, kid? You don't look so bad to me. In fact, you look strong enough to pull the ears off a Gundark. Thanks to you.</p>
                  <p className="text-gray-500 text-xs md:text-sm px-6">Luke Skywalker</p>
                </div>
              </div>
              <div className="w-full h-auto md:w-1/3 px-2 mb-4">
                <div className="flex flex-col justify-between h-full bg-white rounded shadow py-2">
                  <p className="text-gray-800 text-base px-6 mb-5">That's two you owe me, junior. Well your Worship, looks like you managed to keep me around for a little while longer. I had nothing to do with it.</p>
                  <p className="text-gray-500 text-xs md:text-sm px-6">Emperor's Royal Guards</p>
                </div>
              </div>
              <div className="w-full h-auto md:w-1/3 px-2 mb-4">
                <div className="flex flex-col justify-between h-full bg-white rounded shadow py-2">
                  <p className="text-gray-800 text-base px-6 mb-5">General Rieekan thinks it's dangerous for any ships to leave the system until we've activated the energy shield. That's a good story. I think you just can't bear to let a gorgeous guy like me out of your sight</p>
                  <p className="text-gray-500 text-xs md:text-sm px-6">Queen Mother Ta'a Chume</p>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <section className="bg-blue-600">
          <div className="container mx-auto px-6 text-center py-20">
            <h2 className="mb-6 text-4xl font-bold text-center text-white">Contact Us</h2>
            <h3 className="my-4 text-2xl text-white">feel free to reach out to us about anything.</h3>
            <h4 className="my-4 text-xl text-white">Drop in your email address, we will try to reach you ASAP!</h4>
            <input 
                type="text" 
                placeholder="E-mail"
                className="text-2xl font-bold py-2 px-8 rounded-full mr-5 shadow-lg"
            />
            <button className="bg-white font-bold rounded-full py-4 px-8 shadow-lg hover:border-blue hover:text-white hover:bg-green-400">Report</button>
          </div>
        </section>
      </div>
    </>);
}

export default AboutUs;