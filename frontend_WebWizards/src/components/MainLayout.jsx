import React from 'react'
import { Header, Footer } from './index.js'

const MainLayout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};


export default MainLayout