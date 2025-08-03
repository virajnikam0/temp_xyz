
// components/landing/render.jsx
import React from 'react';
import Content from './content'; // This is the landing content with buttons
import Footer from './footer';
import Header from './header';
import './landing.css';

export default function Render() {
  return (
    <div>
      <Header />
      <Content /> {/* shows Register & Login buttons */}
      <Footer />
    </div>
  );
}
