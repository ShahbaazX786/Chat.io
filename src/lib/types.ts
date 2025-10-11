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
