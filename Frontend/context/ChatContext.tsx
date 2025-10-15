import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

const ChatContext = createContext({});
const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unSeenMsgs, setUnSeenMsgs] = useState({});

  const { socket, axios } = useContext(AuthContext);

  // Function to get All Users.
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users);
        setUnSeenMsgs(data.unseenMessages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to get messages for selected User.
  const getMessages = async (userId: string) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to send Message to selected User.
  const sendMessage = async (msgData: any) => {
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        msgData
      );
      if (data.success) {
        setMessages((prevMessages) => [...prevMessages, data.newMessage]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to subscribe to messages for selected User.
  const subscribeToMessages = async () => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prevMessage) => [...prevMessage, newMessage]);
        axios.put(`/api/messages/mark/${newMessage._id}`);
      } else {
        setUnSeenMsgs((prevUnseenMessages) => ({
          ...prevUnseenMessages,
          [newMessage.senderId]: prevUnseenMessages[newMessage.senderId]
            ? prevUnseenMessages[newMessage.senderId] + 1
            : 1,
        }));
      }
    });
  };

  // Function to unsub from messages.
  const unsubscribeFromMessages = () => {
    if (socket) socket.off("newMessage");
  };

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [socket, selectedUser]);

  const chatValue = {
    messages,
    users,
    selectedUser,
    getUsers,
    getMessages,
    sendMessage,
    setSelectedUser,
    unSeenMsgs,
    setUnSeenMsgs,
  };

  return (
    <ChatContext.Provider value={chatValue}>{children}</ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
