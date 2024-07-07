const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-4 w-screen fixed bottom-0 left-0">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p className="text-gray-600">
          <span className="font-bold">Copyright © 2024</span>
          <a
            href="https://portfolio-moiz.vercel.app/"
            className="font-semibold text-green-600 ml-1 hover:text-green-700 transition-all ease-in-out duration-150"
          >
            Moiz Nadeem
          </a>
          . All rights reserved.
        </p>
        <a
          href="https://portfolio-moiz.vercel.app/"
          className="font-semibold text-center m-2 text-gray-500 hover:text-gray-700 transition-all ease-in-out duration-300"
        >
          Moiz Nadeem
        </a>
      </div>
    </footer>
  );
};

export default Footer;
