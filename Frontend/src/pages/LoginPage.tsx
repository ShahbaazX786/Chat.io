import { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Register");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmitHandler = (event: Event) => {
    event.preventDefault();

    if (currState === "Register" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
    logIn(currState === "Register" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    <div className="flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl min-h-screen bg-cover bg-center">
      {/* left Section */}
      <img
        src={assets.logo_big}
        alt="Big Logo"
        className="w-[min(30vw, 250px)]"
      />

      {/* right Section*/}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 text-white bg-white/8 border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          {isDataSubmitted && (
            <img
              onClick={() => {
                setIsDataSubmitted(false);
              }}
              src={assets.arrow_icon}
              alt="arrow icon"
              className="w-5 cursor-pointer"
            />
          )}
        </h2>

        {currState === "Register" && !isDataSubmitted && (
          <input
            type="text"
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
            placeholder="Full Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        )}
        {!isDataSubmitted && (
          <>
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}

        {currState === "Register" && isDataSubmitted && (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Provide a short bio..."
            required
          ></textarea>
        )}

        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
        >
          {currState === "Register" ? "Create Account" : "Login Now"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" />
          <p>
            Agree to the{" "}
            <span
              className="hover:underline text-gray-400 cursor-pointer"
              onClick={() => navigate("/general/terms-of-use")}
            >
              Terms of use
            </span>{" "}
            &{" "}
            <span
              className="hover:underline text-gray-400 cursor-pointer"
              onClick={() => navigate("/general/privacy-policy")}
            >
              privacy policy.
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {currState === "Register" ? (
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <span
                className="font-medium text-violet-500 cursor-pointer hover:underline"
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <span
                className="font-medium text-violet-500 cursor-pointer hover:underline"
                onClick={() => {
                  setCurrState("Register");
                  setIsDataSubmitted(false);
                }}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
