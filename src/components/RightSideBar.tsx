import assets, { imagesDummyData } from "../assets/assets";
import type { SelectedUserProps } from "../lib/types";

const RightSideBar = ({ selectedUser }: SelectedUserProps) => {
  return (
    selectedUser && (
      <div
        className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${
          selectedUser ? "max-md:hidden" : ""
        }`}
      >
        {/* User Info Section */}
        <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt="User Icon"
            className="w-20 aspect-[1/1] rounded-full"
          />
          <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
            <p className="w-2 h-2 rounded-full bg-green-500"></p>
            {selectedUser?.fullName}
          </h1>
          <p className="px-10 mx-auto">{selectedUser?.bio}</p>
        </div>

        <hr className="border-[#ffffff50] my-4" />

        {/* Media Section */}
        <div className="px-5 text-xs">
          <p>Media</p>
          <div className="mt-2 overflow-y-scroll grid grid-cols-2 gap-4 opacity-80 h-full">
            {imagesDummyData.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded"
              >
                <img
                  src={url}
                  alt={`media-${index}`}
                  className="rounded-md h-full"
                />
              </div>
            ))}
          </div>
        </div>

        <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer">
          Logout
        </button>
      </div>
    )
  );
};

export default RightSideBar;
