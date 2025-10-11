import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  // return <h1 className="text-3xl font-bold underline">Bismillah</h1>;
  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain bg-no-repeat bg-black bg-center">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
