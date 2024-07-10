import  { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext.jsx';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Account = () => {
    const [redirect, setRedirect] = useState(null);
    const [user1, setUser1] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    const [redirect1, setRedirect1] = useState(false);

    // for delete place by owner
    const deleteFunction = async () => {
        try {
            await axios.delete(`/user/delete/${user._id}`);
            setUser(null)
            setRedirect1(true);

        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    useEffect(() => {
        if (user) {
            // for getting details of user
            const fetchUserProfile = async () => {
                try {
                    const response = await axios.get(`/profile/${user._id}`);
                    setUser1(response.data);
                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                }
            };
            fetchUserProfile();
        }
    }, [user]);

    // functionality for logout
    const logout = async () => {
        try {
            await axios.post('/logout');
            setUser(null);
            setRedirect('/');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    // if we get user details but page not loading it shows loading
    if (!ready) {
        return <h1>Loading...</h1>;
    }

    // if not user it redirects to login
    if (ready && !user && !redirect) {
        return <Navigate to='/user/login' />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    if (redirect1) {
        return <Navigate to='/user/login' />;
    }

    return (
        <div className='text-center max-w-lg mx-auto'>
            {user1 ? (
                // to show the details of user
                <>
                    <h2 className='text-xl m-3'>
                        UserName: <span className='text-xl'>{user1.name}</span>
                    </h2>
                    {/* for username */}
                    <h2 className='text-xl m-3'>
                        Email: <span className='text-xl'>{user1.email}</span>
                    </h2>
                    {/* for email */}
                    <h2 className='text-xl m-3'>
                        Mobile: <span className='text-xl'>{user1.mobile}</span>
                    </h2>
                    {/* for mobile */}
                    <button className='primary max-w-sm mt-2' onClick={logout}>
                        Logout
                    </button>
                    {/* button to call the logout functionality */}
                    <button
                        className='bg-red-500 mt-4 max-w-sm px-5 py-2 text-xl rounded-xl text-white'
                        onClick={deleteFunction}
                    >
                        Delete User
                    </button>
                </>
            ) : (
                <h1>Loading user profile...</h1>
            )}
        </div>
    );
};

export default Account;
