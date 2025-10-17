import { useParams } from "react-router-dom";
import TermsOfUse from "../components/TermsOfUse";
import PrivacyPolicy from "../components/PrivacyPolicy";

const GeneralPage = () => {
  const { id } = useParams();
  return (
    <div className="flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl min-h-screen bg-cover bg-center">
      {id === "terms-of-use" ? <TermsOfUse /> : <PrivacyPolicy />}
    </div>
  );
};

export default GeneralPage;
