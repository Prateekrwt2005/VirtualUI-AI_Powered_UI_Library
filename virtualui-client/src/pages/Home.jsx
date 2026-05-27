import React from 'react'
import Auth from '../components/Auth'

function Home() {
    const [showAuth, setShowAuth] = React.useState(false)
  return (
   
      <div className="">
       <button className='px-4 py-2 bg-black text-white ' onClick={() => setShowAuth(true)}>open</button>
       
        {showAuth && <Auth onClose={() => setShowAuth(false)} />}
      </div>

     
   
  )
}

export default Home