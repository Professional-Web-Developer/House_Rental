
			Steps to run the Frontend and Backend from House_Rental Repository

Step 1:
	
 	Ensure you have Git installed on your computer
	
 	Open a Terminal or Command Prompt
		Windows: You can use Command Prompt, PowerShell, or Git Bash.
		Mac/Linux: Use the Terminal.	
  
Step 2:
	
 	Navigate to the Directory Where You Want to Clone the Repository

Step 3:
	
 	Clone the Repository
	git clone https://github.com/Professional-Web-Developer/House_Rental.git
	
								(or)
	Download zip file:
		Navigate to the Repository on GitHub  https://github.com/Professional-Web-Developer/House_Rental
		Download the ZIP File
		Extract the ZIP File

Step 4:
	
 	Navigate to the Cloned Repository
		cd House_Rental and type "code ." to open in vs code editor or


Step 5:
	
 	Open the Repository in VS Code
		Open Visual Studio Code.
		Open the cloned repository in VS Code:
			Go to File > Open Folder
				Select the House_Rental folder and click Open.
				
				
Step 6:
	
	Run the Backend (Node.js)
		step:6.1
			Open a new terminal in VS Code:
				Go to Terminal > New Terminal
			
		step 6.2:
			Navigate to the Backend folder
				cd Backend
		step 6.3:
			Install the required dependencies
				npm install
		step 6.3:
			Start the backend server
				npm start


Step 7:
	
 	Run the Client (Vite.js)
		step 7.1:
			Open a new terminal tab in VS Code:
				Go to Terminal > New Terminal
		step 7.2:
			Navigate to the client folder
				cd Client
		step 7.3:
			Install the required dependencies
				npm install
		step 7.4:
			Start the Vite.js development server
				npm run dev

    
	
Schemas For Databases:


We can use mongodb Atlas server to store the Application datum.

User Schema contains the details of user


		{
		name:
		{
			type:String,
			required:true,

		},
		email:
		{
			type:String,
			required:true,
			unique:true,

		},
		mobile:
		{
			type:Number,
			required:true,
			unique:true,

		},
		password:
		{
			type:String,
			required:true,
			minLength:8
		}
		}
		
		
Place Schema contains the details of place uploaded by owner

	
 	{
        owner:{
            type:mongoose.Schema.Types.ObjectId,ref:'User'
        },
    title:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    photos:{
        type:[String],
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    perks:{
        type:[String],
        required:true,

    },
    extraInfo:{
        type:String,
        required:true,

    },
    checkIn:{
        type:Date,
        required:true,

    },
    checkOut:{
        type:Date,
        required:true,

    },
    maxGuests:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    }
}


Booking Schema contains the details of Booking


	{
    place:{
        type:mongoose.Schema.Types.ObjectId,ref:Place,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
        },
    checkin:{
        type:Date,
        required:true
    },
    checkout:{
        type:Date,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    price:
    {
        type:Number,
        required:true
    }

}


User

	Fields:
		name, email, mobile, password
	Relationships:
		One-to-Many with Place
		One-to-Many with Booking

Place

	Fields:
		owner, title, address, photos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price
	Relationships:
		Many-to-One with User
		One-to-Many with Booking

Booking

	Fields:
		place, user, checkin, checkout, name, mobile, price
	Relationships:
		Many-to-One with Place
		Many-to-One with User






Backend Routes with sample data



check port number for backend and client
 		
	Backend : 3069
 	Client  : 5173




		

For User Registration:

	post

	http://localhost:3069/user/register

	sample data:

	{
    "name":"kavin",
    "email":"pasupathy.kavinmca@gmail.com",
    "mobile":866732888291,
    "password":"kavin369"
	}










For User Login:

	post

	http://localhost:3069/user/login

	sample data:



	{
    "email":"pasupathy.kavinmca@gmail.com",
    "password":"kavin369"
	}








For User Profile(Get the details of user except password by token in cookies):



	//Before do this process you need to login using above route path for add token in cookies

	get

	http://localhost:3069/user/profile


	example token:


	token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhc3VwYXRoeS5rYXZpbm1jYUBnbWFpbC5jb20iLCJpZCI6IjY2OGVhOWVjYzlkZjUxMGRlMzk5NTA2YSIsIm5hbWUiOiJrYXZpbiIsImlhdCI6MTcyMDYyNjA5NX0.zaI_fL8XtCZqmh0a-PmObHxPv35CQ2YPTyAaxHppqdQ








To Get Forget Password Email:


	post


	http://localhost:3069/user/forget-password

	sample data:


	{
    	"email":"pasupathy.kavinmca@gmail.com"
	}





To change Password Route  by link got in email:


	post


	http://localhost:3069/user/new-password/:token


	Example link

	http://localhost:3069/user/new-password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhc3VwYXRoeS5rYXZpbm1jYUBnbWFpbC5jb20iLCJ1c2VyaWQiOiI2NjhlYTll
 	Y2M5ZGY1MTBkZTM5OTUwNmEiLCJpYXQiOjE3MjA2MjY4NTgsImV4cCI6MTcyMDYyNzQ1OH0.jRtpthLcymisBP9qsMroVg1EWipbc893wO0RnX2BbWY


	sample data:

	{
    	"password":"kavin369"
	}






For index page:


	get


	http://localhost:3069/user/home


	Here it will get the details of all places to show in indexpage

	sample data:
		-



 
 
 
 
 
For add places by owner:
 
 
 	post 
 
 	http://localhost:3069/user/addplaces
 
 	//here it can take the user details in cokkies make sure you are login
 
 
 
	sample data:

	{
    "title": "Farm House",
    "address": "Kerala",
    "photos": ["photo1720429430780.jpg"],
    "description": "Good place for family trip",
    "perks": ["wifi"],
    "extrainfo": "fully surrounded by farm",
    "checkin": "2024-07-26T00:00:00.000+00:00",
    "checkout": "2024-08-04T00:00:00.000+00:00",
    "maxguests": 3,
    "price": 140
	}







update place by owner:


	put


	http://localhost:3069/user/addplaces


	sample data:


	{
    "id":"668eb8fee305a8b82aa288ba",
    "title": "Farm House",
    "address": "Kerala",
    "addedphotos": ["photo1720429430780.jpg"],
    "description": "Good place for family trip",
    "perks": ["wifi"],
    "extrainfo": "fully surrounded by farm",
    "checkin": "2024-07-26T00:00:00.000+00:00",
    "checkout": "2024-08-04T00:00:00.000+00:00",
    "maxguests": 3,
    "price": 140
	}







For getting the booking details of specific place for calendar show for booking:

	get

	//here we need to give place id

	http://localhost:3069/user/places/:id/bookings


	sample link: 

		http://localhost:3069/user/places/668bab9a53d2bee635b2ea8d/bookings


	//get the details of booking as response


	sample data:
		-






Delete place by owner:


	delete


	http://localhost:3069/user/place/delete/:id


	:id-place id

	sample link:

	http://localhost:3069/user/place/delete/668eb8fee305a8b82aa288ba

	sample data:
		
  		-
	






Logout process:


	post


	http://localhost:3069/user/logout


	//here it will delete the cookies to logout which saves user details


	sample data:

		-








User Booking Details:

	post


	http://localhost:3069/user/home/bookings

	//here user details are get from token


	sample data:


	{
	"place":"668bab9a53d2bee635b2ea8d",
	"checkin":"2024-07-31T18:30:00.000+00:00",
	"checkout":"2024-08-03T18:30:00.000+00:00",
	"name":"new1",
	"mobile":"9898987807980432",
	"numberofguests":5,
	"price":420
	}










Get all bookings from specific user to show all bookings of specific user:

	get


	http://localhost:3069/user/bookings


	//here it get the user details from token for find in bookings details


	sample data:

		-









Get the booked details of specific place to show the booked details for owner:


	get

	http://localhost:3069/user/already/bookings/:id


	sample link:


	http://localhost:3069/user/already/bookings/668bab9a53d2bee635b2ea8d


	//here we send the place id as parameter

	sample data :

		-
	
	




 
	
Get the specific details  of user for profile page:


	get

	http://localhost:3069/user/profile/:id

	id - user id


	sample link


	http://localhost:3069/user/profile/668e0318e7161dbce25de811



	sample data:

		-
	






To get places which all are added by owner:


	//make sure here you need to login before this process because it takes user details from token\


	get


	http://localhost:3069/user/showplaces


	Sample Data:

		-







To get the details of specific places:


	get


	http://localhost:3069/user/account/places/:id


	sample link


	http://localhost:3069/user/account/places/668d15c24dd0d350044c3d25


	Sample data:
	
		-







To upload photo as link:


	post

	http://localhost:3069/user/upload-by-link

	Sample data:

	{
    	"link":"https://pix8.agoda.net/hotelImages/89392/0/efa5c820dc2bfddcb9b5368d1ee23a74.jpeg?s=450x450"
	}






To upload photo from local machine:

	post

	http://localhost:3069/user/upload

	Sample data:

		form-data
	
		key                 type              value             
	
		photos				File			upload file
	
	
	make sure that your key value will be named as photos






Delete User:

	delete

	http://localhost:3069/user/user/delete/:id

	id - userid


	sample link:

	http://localhost:3069/user/user/delete/6684ec10298f45aeab473275

	Sample-Data:

		-
