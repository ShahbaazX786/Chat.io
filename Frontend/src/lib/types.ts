export type User = {
  _id: string;
  email: string;
  fullName: string;
  profilePic: string;
  bio: string;
};

export type SelectedUserProps = {
  selectedUser: User | any;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | any>>;
};

export type Message = {
  senderId: string;
  receiverId: string;
  text: string;
  image: string;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
};
