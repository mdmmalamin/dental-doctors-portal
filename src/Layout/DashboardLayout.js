import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [ isAdmin ] = useAdmin(user?.email);

    const adminMenu = <>
        <li><Link to='/dashboard/users'>All Users</Link></li>
        <li><Link to='/dashboard/add-doctor'>Add A Doctor</Link></li>
        <li><Link to='/dashboard/manage-doctors'>Manage Doctors</Link></li>
    </>
    return (
        <section>
            <Navbar></Navbar>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full navbar bg-base-300">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div> 
                    <div className="flex-1 px-2 mx-2">Navbar Title</div>
                        <div className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal">
                            {/* Navbar menu content here */}
                                <li><Link to='/dashboard'>My Appointment</Link></li>
                                {
                                    isAdmin 
                                    && 
                                    <>{adminMenu}</>
                                    
                                }
                            </ul>
                        </div>
                    </div>
                    {/* Page content here */}
                    <Outlet></Outlet>
                    {/* Content */}
                </div> 
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
                    <ul className="menu p-4 w-80 min-h-full bg-base-200">
                    {/* Sidebar content here */}
                        <li><Link to='/dashboard'>My Appointment</Link></li>
                        {
                            isAdmin 
                            && 
                            <>{adminMenu}</>
                            
                        }
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default DashboardLayout;