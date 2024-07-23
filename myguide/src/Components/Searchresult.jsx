import React from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import  { createContext ,useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './Searchresult.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Searchresult = () => {
  const location = useLocation();
  let { results } = location.state || {};
  var temp=results
  console.log("res=",results)
  const [myVariable, setMyVariable] = useState(temp);
  useEffect(() => {
    // Code to run when myVariable changes  
    //console.log(`myVariable changed`,myVariable);
  }, [myVariable]);
  
  const [formData, setFormData] = useState({
    location:""
  });

  const onChangeHandler = (e) => {
    const { name,value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate=useNavigate()
  const submitHandler = (e) => {
    e.preventDefault();

    console.log('search location modified:', formData);
    {formData.location=formData.location.toUpperCase();
      formData.location=formData.location.trim();}
    
    if(formData.location==''){
      toast.warn('Search location cannot be empty!', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    else{
    axios.post("http://localhost:3000/search",formData)
    .then(res=>{
     // temp=res.data;
    // console.log(res.data.length,"i am data res")
      if(res.data.length==0){
        toast.warn('No guides found for your search!', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }else{
      setMyVariable(res.data);}
     // console.log("mai temp",temp);
    })
    .catch(err=>console.log("search m error",err))
    }
  };
  const handleBack=()=>{
    navigate('/home')
  }
  const handleLogout=()=>{
    // Cookies.remove('token');
    axios.get("http://localhost:3000/logout")
     .then(res=>{
       if(res.data.status){
         navigate('/')
       } 
     })
     .catch(err=>console.log("error logging out! ",err))
   }
   const handleSelect=(e)=>{
    //console.log(e)
    axios.post("http://localhost:3000/",formData)
   }
  return (
    <div >
      <nav className='flex sm:justify-around bg-blue-500 items-center relative justify-around'>
      <svg type="submit" onClick={handleBack} className='bg-blue-700 hover:bg-indigo-400 p-1.5 absolute rounded-lg hover:cursor-pointer left-2' height="30px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
      <div className="sm:text-white max-sm:hidden sm:text-lg sm:p-1 sm:font-extrabold sm:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">BookMyGuide</div>
      <form onSubmit={submitHandler} className="w-[45%] sm:w-[35%] p-2"> 
      <div className='flex  gap-0.5 sm:gap-2'>
      <input
        name="location"
        value={formData.location}
        onChange={onChangeHandler}
        type="location" placeholder=' Modify search '
        className=" w-[120%] md:w-[200%] rounded-md border-0 py-1.5 shadow-sm ring-1 opacity-80 ring-inset placeholder:text-cyan-900 focus:opacity-70 focus:text-blue-950  focus:ring-2 focus:ring-inset focus:ring-indigo-900 sm:text-sm sm:leading-6 p-2"
        
      />
      <button type="submit" className="flex w-8 sm:w-10 items-center justify-center rounded-md bg-indigo-600 px-1.5 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      <svg  fill="#e8ebff" x="0px" y="0px" className='w-4 border-l-indigo-50 h-4' viewBox="0 0 50 50">
<path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
</svg>
      </button>
      <button onClick={handleLogout} className='p-2 rounded-lg text-white font-semibold ml-6 absolute right-4 hover:bg-blue-900 hover:font-bold bg-blue-700'>Logout</button>
    </div>
  </form>
      </nav>
    
      <div className='h-[85vh] bg-blue-100  justify-center items-center'>
        <div className='items-center justify-center flex '>{myVariable ?(<p>Found {myVariable.length} guides for {myVariable[0].location}</p>):(<p></p>)} </div>
    <section className=' sm:w-[45vw]  m-auto h- bg-cover backg mt-2 rounded-lg p-1'>
    {myVariable && myVariable.length > 0 ? (
      <ul className='flex flex-col p-1.5 gap-1.5 opacity-100 rounded-lg '>
      {myVariable.map((result) => (
            <li className='font-semibold border-black border bg-slate-100 rounded-lg p-2 flex relative' key={result.email}>
            <div>  <p>Name: {result.name}</p>
              <p>Email: {result.email}</p>
              <p>Language: {result.language}</p>
              <p>Location: {result.location}</p>
              <p>Hourly Rate: {`\u20B9`} {result.rate}</p></div>
             <div className='absolute right-1'> <button onClick={()=>handleSelect(result)} className='bg-blue-600 hover:bg-indigo-400 p-1 text-white rounded-lg'>Select</button></div>
            </li>))}
      </ul>):(<p className='font-semibold'>No guides found for your search location</p>)}
    </section>
  </div>
<footer className="bg-blue-500 text-white py-4 fixed bottom-0 w-[100%]">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 BookMyGuide. All rights reserved.</p>
        <nav className="flex justify-center space-x-4 mt-2">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#destinations" className="hover:underline">Destinations</a>
          <a href="#about" className="hover:underline">About Us</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </div>
    </footer>
    <ToastContainer/>
</div>

  )
}

export default Searchresult

   
 