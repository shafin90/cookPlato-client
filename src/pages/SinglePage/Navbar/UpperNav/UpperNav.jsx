import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { CiHeart } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { authContext } from '../../../../components/AuthProvider/AuthProvider';
import { getAuth, signOut } from "firebase/auth";
import { app } from '../../../../../firebase.config';

const UpperNav = () => {

    // firebase auth ---------
    const auth = getAuth(app)
    // =======================

    // recieving state's and function's from authrpovider through context api------------------------------
    const { userData, setUserData, loggedInUsersRole } = useContext(authContext);
    // ====================================================================================================

    // State Declaration of this component ----------------------------------------------------------------
    const [showList, setShowList] = useState(true) // when user click on account btn, then state become false and list will be seen
    // =========================================================================================================
    const navigate = useNavigate(); // initialize useNavigate hook to handle navigation

    // perform logout functionality ======================================================================
    const handleLogout = () => {
        signOut(auth).then(() => {
            setUserData(null) // Sign-out successful.
            alert("logout successfull") // show alert that logout is successfull
        }).catch((error) => {
            alert(error)
        });
    }

    // console.log(loggedInUsersRole)
    return (
        <div className=' w-full bg-[#fffaea] py-10 border-b'>

            <div className=' w-[96vw] mx-auto flex justify-between items-center'>

                {/* logo and searchbar --------------------- */}
                <div className=' flex justify-start items-center w-8/12'>
                    {/* logo */}
                    <Link>
                        <img
                            className=' w-56'
                            src="/public/assets/images/logo.webp"
                            alt=""
                        /></Link>

                    {/* searchbar */}
                    <div className=' flex justify-between items-center bg-gray-100 ms-6 px-5 py-4 rounded  w-7/12'>
                        <input
                            type="text"
                            placeholder="I'm looking for..."
                            className='w-10/12 focus:outline-none bg-transparent text-sm '
                        />
                        <div className=' w-2/12 flex justify-end items-center'><CiSearch className=' text-xl' /></div> {/* search icon */}
                    </div>

                </div>

                {/* account icon, wish list icon, cart icon ----------------------------------*/}
                <div className=' flex justify-between items-center w-2/12 relative'>
                    <ul

                        className={showList ? ' opacity-0 transition-all duration-500 z-50 top-10 right-48 absolute px-7 py-6 border-2 bg-slate-50 w-64 rounded' : " opacity-100 transition-all duration-500 z-50 top-10 right-48 absolute px-7 py-6 border-2 bg-slate-50 w-64 rounded"}>
                        <li className=' text-xl font-bold mb-3 pb-2 text-gray-900'>Account</li>

                        <li className=' hover:text-amber-400 transition-all cursor-pointer text-start  border-b mb-2 pb-2 text-gray-900'><Link to={loggedInUsersRole === "cook" && "inbox"}> {loggedInUsersRole === "cook" && "Inbox"} </Link></li>
                        <li className=' hover:text-amber-400 transition-all cursor-pointer text-start  text-gray-900 border-b pb-2 mb-2'><Link to="/dashboard">Dashboard</Link></li>
                        <li className={loggedInUsersRole !== "cook" ? "hidden" : ' hover:text-amber-400 transition-all cursor-pointer text-start  border-b mb-2 pb-2 text-gray-900'} ><Link to="update_profile"> orders  </Link></li>
                        <li className={loggedInUsersRole !== "cook" ? "hidden" : ' hover:text-amber-400 transition-all cursor-pointer text-start  border-b mb-2 pb-2 text-gray-900'} ><Link to="update_profile"> Adresses  </Link></li>
                        <li className={loggedInUsersRole !== "cook" ? "hidden" : ' hover:text-amber-400 transition-all cursor-pointer text-start  border-b mb-2 pb-2 text-gray-900'} ><Link to="update_profile"> Payment Methods </Link></li>
                        <li className={loggedInUsersRole !== "cook" ? "hidden" : ' hover:text-amber-400 transition-all cursor-pointer text-start  border-b mb-2 pb-2 text-gray-900'} ><Link to="update_profile"> Returns & Refunds  </Link></li>
                        <li className=' hover:text-amber-400 transition-all cursor-pointer text-start  border-b mb-2 pb-2 text-gray-900' ><Link to="/my_account"> Account Details  </Link></li>
                        <li className={loggedInUsersRole !== "cook" ? "hidden" : ' hover:text-amber-400 transition-all cursor-pointer text-start  border-b mb-2 pb-2 text-gray-900'} ><Link to="/update_profile"> update profile  </Link></li>
                        <li onClick={handleLogout} className=' hover:text-amber-400 transition-all cursor-pointer text-start  text-gray-900'><Link to="/">Logout</Link></li>

                    </ul>
                    <VscAccount
                        onClick={() => {
                            if (!userData) {
                                navigate("/account")
                            } else {
                                setShowList(!showList)
                            }
                        }}
                        className=' text-2xl cursor-pointer hover:scale-110 transition-all'
                    />
                    <CiHeart className={loggedInUsersRole !== "customer" ? "hidden" : 'text-3xl cursor-pointer hover:scale-110 transition-all'} />
                    <FiShoppingCart className={loggedInUsersRole !== "customer" ? "hidden" : 'text-2xl cursor-pointer hover:scale-110 transition-all'} />

                    <div >
                        <p className=' text-sm text-gray-600'>Your Cart</p>
                        <p className=' font-semibold'>0,00 lei</p>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default UpperNav;