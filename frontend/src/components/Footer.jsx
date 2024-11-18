function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">About Us</h2>
          <p className="text-gray-400">
            Welcome to Book Haven, your one-stop shop for all your literary needs. Discover a world of books, from bestsellers to classics.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline text-gray-400">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline text-gray-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/books" className="hover:underline text-gray-400">
                Browse Books
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline text-gray-400">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-400">
            Email: <a href="mailto:info@bookhaven.com" className="hover:underline">info@bookhaven.com</a>
          </p>
          <p className="text-gray-400">Phone: +1 234 567 890</p>
          <div className="flex space-x-4 mt-4 justify-center sm:justify-start">
            {/* Social Media Icons */}
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full hover:bg-blue-700"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center bg-blue-400 rounded-full hover:bg-blue-500"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center bg-red-600 rounded-full hover:bg-red-700"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">
        © {new Date().getFullYear()} Book Haven. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
