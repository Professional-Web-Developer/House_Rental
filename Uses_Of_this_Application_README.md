1.Registraion:
  
  User can registerhere using 
  
      username
      email
      password
      mobile



2.Login:
  
  User Login here through email and password
  
  ***Data can be stored in cookies so user no need to login everytime(through jwt token )***
  
  2.1.Forget password:
  
    If user forgot his password user can change his password through email verification
    If email is correct the reset link will send to user
    user can change password through link
    that link has id verification(so safely it will change)

  ***Password saved in encrypted format(through bcrypt)***

  
  
  3.Home Page:
    
    Here user view all the places for booking
    user can search by places or dates or number of guests
    
    3.1.Booking page:
     
      If user click the place in home page
      
      user can see the details of that specific place and user can book the place
      
      *** Here user can see only the available dates***
      
      After booking user can see the booking details
  
  
  4.My Bookings Page:
    
    Here user can see all bookings of that specific user
    
    And click specific booking component to see all the full details of booking

    Cancel booking option is available in this page
  
  
  5.My Accomodations Page:
    
    Here user can add new places 
    And update the details of places
    and Delete the place
  
    5.1.Booked Details:
      Here user can see the booked details of specific place 
      How  many bookings are done by user for that specific place
  
  
  6.My profile page:
    
    Here user can see the details of User
    Logout Here
    User can delete the user account
    
