import { Link } from "react-router-dom";

const HomePage = ({ authUser }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-24 sm:mt-16 w-screen bg-[#fff]">
      <div className="w-[90%]">
        <h1 className="text-3xl my-4 ">Home Page</h1>
        <hr className="border-green-600 " />

        <div
          className="bg-white px-4 py-6 mx-4 my-8 text-lg rounded-lg"
          style={{
            boxShadow: "rgb(0 0 0 / 10%) 0px 0px 20px 10px",
          }}
        >
          {authUser ? (
            <p>Welcome, {authUser?.displayName}!</p>
          ) : (
            <div className="flex items-center justify-center">
              <p className="mr-4">You are not signed in.</p>
              <Link
                className="px-4 py-2  bg-[#04962f] text-white rounded"
                to="/signin"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
