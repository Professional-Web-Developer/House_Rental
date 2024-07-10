import imageDownloader from 'image-downloader'
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer'
import fs from 'fs'
// Convert import.meta.url to file path
const __filename = fileURLToPath(import.meta.url);
// __dirname has the path of this module
export const __dirname = path.dirname(__filename);
const uploaddest=path.join(__dirname,'uploads')

// for downloading the image from link

const uploadcontroller=async(req,res)=>{
    try{
        const {link} =req.body;
        const newname= 'photo' + Date.now() + '.jpg';
        // create a new filename and join that name to path
        const dest = path.join(__dirname, 'uploads', newname);

       await imageDownloader.image({
            url:link,
            dest: dest,
        })
        console.log(newname)
        res.json(newname)
    }
    catch(err)
    {
        console.log(err)
    }
}

// used for upload photo middleware to manage the destination and storage
export const photomiddleware=multer({dest:uploaddest})  //it tells to upload the photo in the file upload


// for upload photo into our folder
const uploadphoto=async(req,res)=>{
    try{
        console.log(req.files)
        const uploadedFiles=[]; //store the path of uploaded files
        for(let i=0;i<req.files.length;i++)
        {
            const {path,originalname}=req.files[i]  //get the path of the file and original name of the file
            console.log(path,originalname)
            const parts=originalname.split('.')  //it splits the extension and filename
            const ext=parts[parts.length -1]  //this gets the extension of the file
            const newpath=path+'.'+ext //it constructs a new path
            fs.renameSync(path,newpath)  //it is used for combine old path and new path with extension
            uploadedFiles.push(newpath.replace(uploaddest,''))
            console.log(uploadedFiles)
        }
        res.json(uploadedFiles)

    }
    catch(err) 
    {
        console.log(err)
    }
}
export {uploadcontroller,uploadphoto};