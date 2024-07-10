import React, { useState } from 'react'

// to show the places in detiled manner or detailed view

const Placegallery = ({places}) => {
    const [showallphotos,setShowallphotos]=useState(false)
        // function for show all the photos in the singlebooking page in detailed view

    if(showallphotos){
        return(
            
            <div className='bg-black text-white  absolute inset-0 min-w-full  min-h-screen'>
                <div className=' bg-black text-white p-8 grid gap-4 '>
                    <div >
                        <h2 className='text-3xl mr-48'>Photos of {places.title}</h2>
                        {/* to close the detailed view of image */}
                        <button onClick={()=>setShowallphotos(false)} className='fixed right-12 top-8 flex gap-2 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                    </svg>
                            Close Photos
                        </button>
                    </div>
                    {/* to get all photos for that specific place and show */}
                {places?.photos?.length>0 && places.photos.map((photo,index)=>(
                    <div key={index}>
                        
                        <img className='min-w-full min-h-screen' src={'http://localhost:3069/user/uploads/'+photo} alt=''/>

                    </div>
                ))}

                </div>
                
            </div>

    )}
    return (
    <>
    {/*for show the photo largely if they click the photo */}
     <div className='relative'>
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                {/* to show the main photo in places that means thumbnail photo */}
                <div className='aspect-square object-cover cursor-pointer'>
                    {places.photos?.[0] && (
                    
                        <img onClick={()=>setShowallphotos(true)} className='w-full ' src={'http://localhost:3069/user/uploads/'+places.photos?.[0]} alt=''/>
                   
                    )}

                </div>
                {/* to show additional photos */}
                <div className='grid gap-2 '>
                
                {places.photos?.[1] && (
                        <img onClick={()=>setShowallphotos(true)}  className='h-full w-full aspect-square object-cover cursor-pointer' src={'http://localhost:3069/user/uploads/'+places.photos?.[1]} alt=''/>
                    )}
                    <div className=' overflow-hidden'>
                        {places.photos?.[2] && (
                            <img onClick={()=>setShowallphotos(true)}  className='h-full w-full  aspect-square object-cover relative top-2 cursor-pointer' src={'http://localhost:3069/user/uploads/'+places.photos?.[2]} alt=''/>
                        )}
                    </div>
            
                </div>
            </div>
            {/* button to show all photos */}
            <button onClick={()=>setShowallphotos(true)} className='flex gap-1 absolute bottom-2 right-2 px-2 py-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                </svg>
                show more photos
            </button>
    </div>
    </>
  )
}

export default Placegallery