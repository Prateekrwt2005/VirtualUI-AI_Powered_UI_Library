import React from 'react'
import Auth from '../components/Auth'
import { useDispatch, useSelector } from 'react-redux'
import {SiValorant} from 'react-icons/si'
import {AnimatePresence, motion} from 'motion/react'
import { useState } from 'react'
import { HiSparkles } from "react-icons/hi2";


import {
  TbArrowRight,
  TbBrandNpm,  TbCode,
  TbLayout, TbAdjustments,TbPlayerPlay, TbCopy,
  TbCheck, TbMenu2,TbLogout,TbComponents,
} from "react-icons/tb";
import axios from 'axios'
import { ServerURL } from '../App'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
 

function Home() {
    const [showAuth, setShowAuth] = React.useState(false)
    const { userData } = useSelector((state) => state.user)
    const [profileOpen, setProfileOpen] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

 
    const getLetters=(name)=>{
      if(!name) return "U"
      return name.split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2)
    }

   const handleLogout = async () => {
  try {
    await axios.get(
      ServerURL + "/api/auth/logout",
      { withCredentials: true }
     
    )
    dispatch(setUserData(null))
      navigate("/")
  } catch (error) {
   console.log(error)
  }
  setProfileOpen(false)
}
    return (
      <div
  className='min-h-screen bg-[#030b0d] text-white overflow-x-hidden'
  style={{ fontFamily: "DM Sans, sans-serif" }}
>
  <div
    className='fixed inset-0 z-0 bg-[radial-gradient(circle,rgba(59,232,255,0.05)_1px,transparent_1px)] bg-[size:26px_26px] pointer-events-none'
  />

<div className='fixed top-0 left-1/2 -translate-x-1/2 w-[min(700px,100vw)] h-64 bg-[radial-gradient(ellipse,rgba(59,232,255,0.06)_0%,transparent_70%)] pointer-events-none'></div>

   
   <nav className='sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8 lg:px-10 py-4 border-b border-white/[0.05] bg-[#030b0d]/85 backdrop-blur-md'>
  
  <div className='flex items-center gap-2.5'>
    <div className='w-8 h-8 rounded-xl bg-gradient-to-br from-[#3be8ff] to-[#0ba5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.4)]'>
      <SiValorant size={15} color='#051c20' />
    </div>
    <span
  className='text-[22px] font-normal tracking-tight'
  style={{ fontFamily: "Syne, sans-serif" }}
>
  VirtualUI
</span>
  </div>




<div className='hidden md:flex items-center gap-6 lg:gap-8 text-sm text-white/50'>

  <button className='duration-200 px-6 py-2 border border-white/15 rounded-xl text-[18px] text-white/70 hover:text-white hover:border-white transition-all cursor-pointer bg-transparent w-full '>
    components
  </button>
   
    <div className='relative'>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setProfileOpen(!profileOpen)}
        className='flex items-center gap-2.5 bg-white/[0.06] border border-white/10 hover:border-[#3be8ff]/30 px-2 py-2 rounded-xl transition-all cursor-pointer'
      >
        <div className='w-7 h-7 rounded-lg bg-gradient-to-br from-[#3be8ff] to-[#0ba5d4] flex items-center justify-center text-[#030b0d] text-[14px] font-bold'>
          {getLetters(userData?.name)}
        </div>
        <span className='text-white/80 text-m font-medium max-w-[100px] truncate'>
  {userData?.name}
</span>
      </motion.button>

      <AnimatePresence>

      {profileOpen && (
        <motion.div   initial={{ opacity: 0, y: 8, scale: 0.96 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 6, scale: 0.96 }}
  transition={{ duration: 0.18 }}
 className='absolute right-0 top-14 w-52 bg-[#0a1a1e] border border-white/[0.09] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50'
  >

  <div className='px-4 py-3.5 border-b border-white/[0.07]'>
  <p className='text-white/90 font-normal text-md truncate'>
    {userData.name}
  </p>

  <p className='text-white/40 text-xs truncate mt-0.5'>
    {userData.email}
  </p>
</div>

<div className='py-1.5'>
  <button  onClick={() =>setProfileOpen(false)} 
    className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer bg-transparent border-none text-left'
  >
      <TbComponents size={16} className='text-[#3be8ff]/70/'/>  
      My Components                 

   
  </button>
</div>

<div className='border-t border-white/[0.07] py-1.5'>
  <button
    className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/[0.06] transition-colors cursor-pointer bg-transparent border-none text-left'
  >
    <TbLogout />
    Logout
  </button>
</div>
                        
        </motion.div>
      )}
      </AnimatePresence>

    </div>

 
  

</div>

</nav>
       
        

        {showAuth && <Auth onClose={() => setShowAuth(false)} />}
      </div>
      
    )
}
export default Home