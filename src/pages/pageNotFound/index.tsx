import React from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_NOT_FOUND } from "../../constant/appConstant";
import OppsIcon from "../../assets/image/oppsIcon.svg";
interface PageNotFoundProps {
  title?: string;
  message?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const PageNotFound: React.FC<PageNotFoundProps> = ({
  title = PAGE_NOT_FOUND.TITLE,
  message = PAGE_NOT_FOUND.MESSAGE,
  buttonText = PAGE_NOT_FOUND.BUTTON_TEXT,
  onButtonClick,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      navigate("/person");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="text-center bg-transparent p-8 max-w-md">
        <img src={OppsIcon} alt="404 Error" className="mx-auto w-48 h-auto" />

        <h1 className="text-gray-900 text-2xl md:text-3xl font-semibold mt-5">
          {title}
        </h1>

        <p className="text-gray-600 text-sm md:text-base leading-6 mt-3 mb-6">
          {message}
        </p>

        <button
          type="button"
          onClick={handleButtonClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
