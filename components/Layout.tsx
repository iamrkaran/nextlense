import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';


interface Props {
  children: React.ReactNode;
}


const Layout: React.FC<Props> = ({ children }) => (
  <div>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
); 

export default Layout;
