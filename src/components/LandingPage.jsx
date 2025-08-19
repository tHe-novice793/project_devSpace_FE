import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="bg-yellow-400 text-black font-bold px-2 py-1 rounded">C</span>
          <h1 className="text-2xl font-bold">Connectify</h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-sm font-medium">
          <li><a href="#features" className="hover:underline">Features</a></li>
          <li><a href="#how" className="hover:underline">How it Works</a></li>
          <li><a href="#community" className="hover:underline">Community</a></li>
          <li><a href="#pricing" className="hover:underline">Pricing</a></li>
        </ul>

        {/* Auth Buttons */}
        <div className="flex space-x-3">
          <Link to="/login" className="px-4 py-2 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-gray-100">
            Login
          </Link>
          <Link to="/signup" className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500">
            Join Now
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-6 md:px-20 bg-gradient-to-br from-white via-indigo-50 to-purple-100">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 max-w-3xl">
          Connect. Collaborate. Code.
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
          A platform for developers to network, share ideas, and build the future together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/signup" className="px-6 py-3 text-lg font-semibold bg-yellow-400 text-black rounded-full hover:bg-yellow-500">
            Get Started
          </Link>
          <Link to="/login" className="px-6 py-3 text-lg font-semibold bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
            Login
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Connectify</h3>
            <p className="text-sm">
              The best place for developers to connect, collaborate, and grow together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#community" className="hover:underline">Community</a></li>
              <li><a href="#pricing" className="hover:underline">Pricing</a></li>
            </ul>
          </div>

          {/* Auth */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Join Us</h3>
            <Link to="/signup" className="block mb-2 hover:underline">Sign Up</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </div>
        </div>

        <div className="text-center text-xs mt-8 text-gray-500">
          © {new Date().getFullYear()} Connectify. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
