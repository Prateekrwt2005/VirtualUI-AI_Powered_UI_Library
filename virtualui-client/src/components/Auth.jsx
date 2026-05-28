import React, { useEffect } from 'react'
import {AnimatePresence, motion} from "motion/react"
import { TbX } from "react-icons/tb";
import { SiValorant } from "react-icons/si";
import { HiSparkles } from "react-icons/hi2";
import { TbLogin2, TbSettings, TbCopy, TbDownload } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from '../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import { ServerURL } from '../App';


const steps = [
  {
    icon: TbLogin2,
    title: "Login with Google",
    desc: "Secure OAuth to unlock all AI tools instantly.",
  },
  {
    icon: HiSparkles,
    title: "Get 150 AI Credits",
    desc: "Free credits to generate premium UI components.",
  },
  {
    icon: TbSettings,
    title: "Customize Props",
    desc: "Fine-tune and preview every change live.",
  },
  {
    icon: TbCopy,
    title: "Generate Components",
    desc: "AI builds production-ready JSX components.",
  },
  {
    icon: TbDownload,
    title: "Copy or Save",
    desc: "Export clean code straight into your project.",
  },
];                  

function Auth({onClose}) {
    const [active,setActive] = React.useState(0)

   
  useEffect(() => {
    const id = setInterval(() => {
      setActive((s) => (s + 1) % steps.length)
    }, 2400)

    return () => clearInterval(id)
  }, [])

const googleauth=async()=>{
  try{
    const response = await signInWithPopup(auth, provider);
    let user = response.user;
    let name=user.displayName;
    let email=user.email;

    const res = await axios.post(ServerURL+ "/api/auth/google", {name, email}, {withCredentials: true});

 console.log(res.data)

}
catch(err){
  console.log(err)
}
}

  return (
    <AnimatePresence>
    <motion.div initial={{opacity:0}} animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.5}}
    className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4">

      <motion.div
      initial={{opacity:0,y:28,scale:0.97}}
        animate={{opacity:1,y:0,scale:1}}
        exit={{opacity:0, y:20, scale:0.96}}
        transition={{duration:0.5}}
      
     className='flex flex-col sm:flex-row w-full max-w-[1040px] rounded-2xl overflow-hidden bg-[#040f12] border border-[#3be8ff]/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] relative'>

{/* Xbutton */}
    <button onClick={onClose} className='absolute top-3 right-3 z-20 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all cursor-pointer'> <TbX size={15}/> </button>
  

 {/* left box */}
<div className='sm:w-[52%] bg-gradient-to-br from-[#03181c] to-[#041e24] p-7 sm:p-12 relative overflow-hidden'>

    <div className='absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(59,232,255,0.08)_0%,transparent_70%)] pointer-events-none'/>

      <motion.div 
      initial={{opacity:0,x:-14}}
      animate={{opacity:1,x:0}}
      transition={{ delay:0.2}}

      className='flex items-center gap-3 mb-7 sm:mb-9'>
        <div className='w-11 h-11 rounded-xl bg-gradient-to-br from-[#3be8ff] to-[#0ba5d4] flex items-center justify-center shadow-[0_0_18px_rgba(59,232,255,0.35)]'>
            <SiValorant size={20} color='#051c20'/>

        </div>
       <span
  className='text-3xl font-normal text-[#e8f8fa] tracking-tight'
  style={{ fontFamily: "'syne', sans-serif" }}
>
  VirtualUI
</span>
 </motion.div> 

 <p className='text-[10px] font-semibold tracking-[3px] text-[#3be8ff] uppercase mb-4 sm:mb-5'>
  How it works
</p>

<div
  className="
  flex sm:flex-col gap-2 sm:gap-1
  overflow-x-auto sm:overflow-x-visible
  pb-2 sm:pb-0 -mx-1 px-1
  scroll-smooth
"
>
  {
    steps.map((item, i) => (
      <motion.div
        key={i}
        className={`flex-shrink-0 sm:flex-shrink flex items-start gap-3 px-3 py-2.5 rounded-xl border transition-all duration-300 min-w-[200px] sm:min-w-0 ${
          active === i
            ? "bg-[#3be8ff]/[0.07] border-[#3be8ff]/20"
            : "bg-transparent border-transparent"
        }`}
      >

        <div
  className={`min-w-[36px] h-9 rounded-lg flex items-center justify-center border transition-all duration-300 ${
    active === i
      ? "bg-gradient-to-br from-[#3be8ff] to-[#0ba8d6] border-transparent"
      : "bg-[#3be8ff]/[0.08] border-[#3be8ff]/20"
  }`}
>
 <item.icon size={16} color={active === i ? "#051c20" : "#3be8ff"}/>
</div>

     <div>
      <p
  className={`text-[17px] font-semibold transition-colors duration-300 whitespace-nowrap sm:whitespace-normal ${
    active === i ? "text-[#d4f5fa]" : "text-white/55"
  }`}
>
  {item.title}
</p>

<div
  className={`overflow-hidden transition-all duration-500 ${
    active === i
      ? "max-h-8 opacity-100 mt-0.5"
      : "max-h-0 opacity-0"
  }`}
>
  <p className='text-[12.5px] text-[#3be8ff]/40 leading-relaxed'>
    {item.desc}
  </p>
</div>


</div>   
 
      </motion.div>
    ))
  }
</div>        
    
  
</div>

{/* right box */}

     <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.25, duration: 0.5 }}
  className='sm:flex-1 bg-[#040f12] px-6 sm:px-10 py-10 flex items-center justify-center relative overflow-hidden'
>
  <div className='absolute inset-0 bg-[linear-gradient(rgba(59,232,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(59,232,255,0.025)_1px,transparent_1px)] bg-[size:32px_32px]' />

  <div className='relative z-10 w-full max-w-[420px] sm:max-w-[260px] text-center mx-auto flex flex-col items-center'>

  <motion.div
  animate={{ y: [0, -6, 0] }}
  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  className='w-16 h-16 sm:w-18 sm:h-18 rounded-2xl mx-auto mb-5 sm:mb-6 bg-gradient-to-br from-[#3be8ff]/15 to-[#040f12] border border-[#3be8ff]/20 flex items-center justify-center'
>
  <SiValorant size={28} color="#3be8ff" />
</motion.div>
<h3
  className='text-4xl font-normal text-[#e4f6f8] tracking-tight mb-2'
  style={{ fontFamily: "Syne, sans-serif" }}
>
  Welcome
</h3>

<p className='text-[16px] text-[#96bec8]/55 leading-relaxed mb-6 sm:mb-7'>
  Sign in to generate AI-powered UI components in seconds
</p>

<div className='flex justify-center gap-4 sm:gap-5 mb-6 sm:mb-7'>
  {
    [["150", "AICredits"], ["∞", "Components"], ["JSX", "Ready"]].map(([v, l], i) => (
      <div key={i} className='text-center'>
        <div className='text-2xl font-bold text-[#3be8ff]'>
          {v}
        </div>

        <div className='text-[10px] text-[#78aab4]/45 uppercase tracking-wider font-medium'>
          {l}
        </div>
      </div>
    ))
  }
</div>

<motion.button
 
 onClick={googleauth}

  whileHover={{ y: -2, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className='w-full max-w-[500px] flex items-center justify-center gap-3 py-4.5 rounded-2xl bg-white text-[#0a1a1d] font-semibold text-[16px] cursor-pointer border-none shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(59,232,255,0.2)] transition-shadow'
>
  <FcGoogle size={24} />
  Continue with Google
</motion.button>

<p className='text-[12px] text-[#64919b]/45 mt-4 sm:mt-5'>
  No account needed for npm.{` `}
  
  <span
    onClick={onClose}
    className='text-[#3be8ff]/50 border-b border-[#3be8ff]/20 cursor-pointer hover:text-[#3be8ff]/80 transition-colors'
  >
    View docs →
  </span>
</p>
</div>



</motion.div>           


      </motion.div>
        
      </motion.div>
</AnimatePresence>
   
  )
}

export default Auth          