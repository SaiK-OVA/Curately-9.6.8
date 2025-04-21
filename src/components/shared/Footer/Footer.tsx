import React from 'react';

import './Footer.scss';


const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div className="footer">
            Copyright &copy; {year} Curately. All Rights Reserved.
        </div>
    );
}

export default Footer;