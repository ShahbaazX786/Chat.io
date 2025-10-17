import { useNavigate } from "react-router-dom";
import { termsOfUse } from "../lib/constants";

const TermsOfUse = () => {
  const navigate = useNavigate();
  return (
    <fieldset className="max-w-6xl mx-auto border border-white rounded-lg px-4 my-16 relative">
      <legend className="text-2xl font-bold mb-6 text-white">
        Terms of Use
      </legend>
      {termsOfUse.map((section, index) => (
        <>
          <div
            key={index}
            className="mb-6 selection:bg-gray-200 selection:text-black selection:font-bold"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-100">
              {index + 1 + ". " + section.title}
            </h2>
            {section.content.map((paragraph, i) => (
              <p key={i} className="text-gray-400 mb-2 ml-4 leading-relaxed">
                {"- " + paragraph}
              </p>
            ))}
          </div>
          <span className="text-gray-400">
            PS: This is just a dummy page and if you think seriously about this
            then my friend, what you really need is sleep.
          </span>
        </>
      ))}
      <button
        className="absolute -top-9 right-1 cursor-pointer bg-red-500/80 px-4 py-2 rounded-sm font-bold text-xl"
        onClick={() => {
          navigate("/");
        }}
      >
        X
      </button>
    </fieldset>
  );
};

export default TermsOfUse;
