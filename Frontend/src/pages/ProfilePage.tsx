import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import assets from "../assets/assets";
import { getMemberSince, getMemberStatus } from "../lib/utils";

const ProfilePage = () => {
  const { userId } = useParams();
  const { authUser, updateProfile } = useContext(AuthContext);
  const { selectedUser } = useContext(ChatContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();

  const saveHandler = async (e: Event) => {
    e.preventDefault();
    if (!selectedImage) {
      await updateProfile({ fullName: name, bio });
      navigate("/");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = async () => {
      const base64Img = reader.result;
      await updateProfile({ profilePic: base64Img, fullName: name, bio });
      navigate("/");
    };
  };

  useEffect(() => {
    if (!userId) {
      setName(authUser.fullName);
      setBio(authUser.bio);
      setProfilePic(authUser?.profilePic);
    } else {
      setName(selectedUser.fullName);
      setBio(selectedUser.bio);
      setProfilePic(selectedUser?.profilePic);
    }
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg relative">
        <button
          className="absolute top-1 right-0 cursor-pointer bg-red-500/80 px-3 py-1 rounded-sm font-bold text-xl"
          onClick={() => {
            navigate("/");
          }}
        >
          X
        </button>
        {userId ? (
          <div className="flex flex-col gap-5 p-10 flex-1">
            <fieldset className="border border-gray-700 rounded-lg p-5 space-y-2 drop-shadow-2xl shadow-white">
              <legend className="text-lg">Profile Details</legend>
              <p>
                Name: &nbsp;<span>{name}</span>
              </p>
              <p>
                Member Status: &nbsp;<span>{getMemberStatus()}</span>
              </p>
              <p>
                Member Since: &nbsp;
                <span>{getMemberSince(selectedUser.createdAt)}</span>
              </p>
              <p>
                Bio: &nbsp;<span>{bio}</span>
              </p>
            </fieldset>
          </div>
        ) : (
          <form
            onSubmit={saveHandler}
            className="flex flex-col gap-5 p-10 flex-1"
          >
            <h3 className="text-lg">Profile Details</h3>
            <label
              htmlFor="avatar"
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept=".png, .jpg, .jpeg"
                hidden
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : assets.avatar_icon
                }
                alt="avatar icon"
                className={`w-12 h-12 ${selectedImage && "rounded-full"}`}
              />
              Upload Profile Image.
            </label>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              type="text"
              required
              placeholder="Your Name"
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <textarea
              rows={4}
              onChange={(e) => {
                setBio(e.target.value);
              }}
              value={bio}
              required
              placeholder="Your Profile Bio..."
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            ></textarea>
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer"
            >
              Save
            </button>
          </form>
        )}

        <img
          src={profilePic || assets.logo_icon}
          alt="Logo Icon"
          className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${
            selectedImage && "rounded-full"
          }`}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
