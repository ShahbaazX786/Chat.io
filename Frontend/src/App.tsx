import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  // return <h1 className="text-3xl font-bold underline">Bismillah</h1>;

  const { authUser } = useContext(AuthContext);

  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain bg-no-repeat bg-black bg-center">
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={`/login`} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={`/`} />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to={`/login`} />}
        />
        <Route
          path="/profile/:userId"
          element={authUser ? <ProfilePage /> : <Navigate to={`/login`} />}
        />
      </Routes>
    </div>
  );
}

export default App;
