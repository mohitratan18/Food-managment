import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = ()=>{
    if(isAdmin){
        navigate('/admin');
    }
    else{
        navigate('/menu')
    }
  }
  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="admin"
              className="mr-2"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />
            <label htmlFor="admin" className="text-gray-700 text-sm">
              Login as Admin
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>

          <div className="flex justify-center mt-3">
            <p className="text-grey-500 text-xs">Don't have an account yet?</p>
            <Link
              to={"/register"}
              className="text-blue-500 text-xs ml-1 underline cursor-pointer"
            >
              Register Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
