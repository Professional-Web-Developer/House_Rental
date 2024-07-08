import React , { useState } from 'react'
import axios from 'axios';


// for managing photosupload and photolink in add places using this component 
const Photosuploader = ({addedphotos,onChange}) => {
    
    const [photolink,setPhotolink]=useState('')


    function inputHeader(text){
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        )
    }
    // function for paragraph element
    function inputText(text){
        return(
            <p className='text-gray-500 text-sm'>{text}</p>
        )
        }
        // function to combine header and description
    function preinput(header,description)
    {
        return (
            <>
            {inputHeader(header)}
            {inputText(description)}

            </>
        )
    }

     //function to get photo as link
     async function getPhotoaslink(e)
     {
         e.preventDefault();
         const {data:filename}=await axios.post('/upload-by-link',{link:photolink})
         // here we check we had photos previously in addedphotos and add photos
         onChange(prev=>{
             return [...prev,filename]
         })
     setPhotolink('')
 
     }
     //function to upload file
     function uploadphoto(e){
         const files=e.target.files;  //get files from user
         const data=new FormData(); //easy to create key value pair
         for(let i=0;i<files.length;i++)
         {
             data.append('photos',files[i])   //append the each file to the form data object
         }
         axios.post('/upload',data,{
             headers:{'Content-Type':'multipart/form-data'}  //send the post request formdata object
 
         }).then(res=>{
             const {data:filenames}=res  //update the added photos state with filename of the uploaded file
             onChange(prev=>{
                 return [...prev,...filenames]
                 })
         });
     
     }


     //function to remove photo
     function removephoto(e,filename)
     {
        e.preventDefault();
        onChange([...addedphotos.filter(photo=>photo!=filename)]);

     }

    //  photo which show in thumbnail
    function selectmainphoto(e,mainphoto)
    {
        e.preventDefault();
        const withoutselected=addedphotos.filter(photo=>photo!=mainphoto)  //here we filter all photo without mainphoto
        const newaddedphoto=[mainphoto,...withoutselected];    //add the main photo as first 
        onChange(newaddedphoto);
    }
 
  return (
    <>
    {preinput('Photos','Add Photos of your place')}
                    <div className='flex'>
                    <input type="text" value={photolink} onChange={(e)=>{
                    setPhotolink(e.target.value)
                    }}
                     placeholder={'add using link ....jpg'} />
                    <button onClick={getPhotoaslink} className='bg-gray-200 px-4 rounded-full'>Add&nbsp;Photo</button>
                    </div> 
                    <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4'>
                    {/* here we can check and show the images  */}
                    {addedphotos.length>0 && addedphotos.map((link,index)=>(
                        <div key={link} className='relative h-32 flex '>
                            <img className=' rounded-2xl w-full object-cover ' src={'http://localhost:3069/user/uploads/'+link} alt="" />
                            
                            {/* deletephoto */}
                            
                            <button onClick={(e)=>{
                                removephoto(e,link)
                            }} className='absolute bottom-2 right-2 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

                            </button>
                            
                            {/* mainphoto change */}
                            <button onClick={(e)=>{
                                
                                selectmainphoto(e,link)
                            }} className='absolute bottom-2 left-2 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3'>
                                {link!==addedphotos[0] && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                  </svg>
                                  
                                )}
                                {link===addedphotos[0] && (
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                </svg>
                                 
                                  
                                )}
                            

                            </button>
                        </div>
                    ))}
                    {/* here we can upload the image by using input */}
                     <label className='h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl  text-2xl text-gray-600'>
                     <input type="file" multiple className='hidden ' onChange={uploadphoto}/>                  
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                    </svg>

                        Upload</label>
                    </div>
    </>
  )
}

export default Photosuploader