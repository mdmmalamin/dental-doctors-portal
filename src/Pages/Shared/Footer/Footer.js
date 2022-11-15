import React from 'react';
import { Link } from 'react-router-dom';
import footer from '../../../assets/images/footer.png';

const Footer = () => {
    return (
        <footer className='pt-20 bg-no-repeat' style={{background: `url(${footer})`, backgroundSize: 'cover'}}>
            <section className="footer px-8 md:px-0 md:justify-around pb-24">
                <div>
                    <span className="footer-title">SERVICES</span> 
                    <Link to='/' className="link link-hover">Emergency Checkup</Link>
                    <Link to='/' className="link link-hover">Monthly Checkup</Link>
                    <Link to='/' className="link link-hover">Weekly Checkup</Link>
                    <Link to='/' className="link link-hover">Deep Checkup</Link>
                </div> 
                <div>
                    <span className="footer-title">ORAL HEALTH</span> 
                    <Link to='/' className="link link-hover">Fluoride Treatment</Link>
                    <Link to='/' className="link link-hover">Cavity Filling</Link>
                    <Link to='/' className="link link-hover">Teeth Whitening</Link>
                </div> 
                <div>
                    <span className="footer-title">OUR ADDRESS</span> 
                    <p className="link link-hover">New York - 101010 Hudson</p>
                </div>
            </section>
            <p className='text-center pb-11'>Copyright 2022 All Rights Reserved</p>
        </footer>
    );
};

export default Footer;