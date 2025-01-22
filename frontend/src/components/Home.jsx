import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">Living Thing</Link>
        </div>

        {/* Login & Signup Buttons */}
        <div>
          <Link
            to="/login"
            className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 mr-2"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-blue-800 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Signup
          </Link>
        </div>
      </header>

      {/* Body */}
      <main className="flex-grow bg-gray-100 flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Living Thing
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Revolutionizing the way you connect with nature. Discover innovative
          solutions, sustainable ideas, and impactful services for a better
          tomorrow.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700"
        >
          Learn More
        </Link>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Living Thing. All rights reserved.
        </p>
        <div className="flex justify-center mt-2">
          {/* Social Media Links */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 hover:underline"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 hover:underline"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 hover:underline"
          >
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
