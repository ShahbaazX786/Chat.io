import axios from "axios";
import { createContext, useEffect, useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BackendURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = BackendURL;

const AuthContext = createContext({});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  // check if useris authenticated and if so, set the user data and connect user to socket.
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (error: any) {
      console.log("User is not Authenticated", error);
      toast.error(error?.message);
    }
  };

  //   Login Function to handle user authentiation and socket connection
  const logIn = async (state, creds) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, creds);
      if (data.success) {
        setAuthUser(data.userData);
        connectSocket(data.userData);
        axios.defaults.headers.common["token"] = data.token;
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //   Logout function to handle user logout and socket disconnection
  const logOut = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    axios.defaults.headers.common["token"] = null;
    toast.success("User Logged Out Sucessfully!");
    socket.disconnect();
  };

  const updateProfile = async (body: any) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", body);
      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile Updated Sucessfully!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // connect socket function to handle socket connection and online user updates.
  const connectSocket = (userData: any) => {
    if (!userData || socket?.connected) return;
    const newSocket = io(BackendURL, {
      query: {
        userId: userData._id,
      },
    });
    newSocket.connect();
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
  };
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
    }
    checkAuth();
  }, []);

  const value = {
    axios,
    authUser,
    onlineUsers,
    socket,
    logIn,
    logOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
