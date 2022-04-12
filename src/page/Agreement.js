import { useState } from "react";
import Step1 from "../components/agreement/carousel/Step1";
import DetailsInsurance from "../components/agreement/Leftside/DetailsInsurance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Step2 from "../components/agreement/carousel/Step2";
import Step3 from "../components/agreement/carousel/Step3";
import Step4 from "../components/agreement/carousel/Step4";
import Step5 from "../components/agreement/carousel/Step5";
import Step6 from "../components/agreement/carousel/Step6";
import Step7 from "../components/agreement/carousel/Step7";
import { Link } from "react-router-dom";

const Agreement = () => {
  const [carousel, setCarousel] = useState(1);

  const switchCarousel = () => {
    // console.log("tt", carousel);
    switch (carousel) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Step5 />;
      case 6:
        return <Step6 />;
      case 7:
        return <Step7 />;
      default:
        return <Step1 />;
    }
  };

  const onClickCarousel = () => {
    // console.log(carousel);
    if (carousel < 7) {
      setCarousel(carousel + 1);
    } else {
      setCarousel(1);
    }
  };

  return (
    <div className="bg-white h-[100vh] w-[100vw] absolute">
      <nav className="flex flex-wrap fixed top-0 z-10 w-[100vw] items-center justify-start mt-6 mx-20">
        <Link to="/" target="_blank" rel="noopener noreferrer">
          <div className="flex">
            <h1 className="font-[righteous] text-[60px] text-pink-500 leading-none">
              Res
            </h1>
            <h1 className="font-[righteous] text-[60px] mr-4 leading-none">
              iverse
            </h1>
          </div>
        </Link>
      </nav>
      <div className="flex flex-row h-full">
        <div className="basis-1/3 my-24 mx-10">
          <DetailsInsurance />
        </div>
        <div className="basis-2/3 bg-pink-200 my-8 ml-8 p-6 rounded-l-xl">
          <h1 className="text-2xl font-bold">ขั้นตอนการจองที่พัก</h1>
          <div className="h-full mt-4">
            <div className="flex justify-start h-[85%]">
              <div className="fade-anim">{switchCarousel()}</div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => onClickCarousel()}
                className="bg-white p-4 w-fit rounded-3xl flex justify-center cursor-pointer shadow-2xl hover:shadow-pink-500/50 shadow-pink-500/25"
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-computer-mouse"
                  className="text-pink-500 self-center mr-4 w-[20px] h-auto"
                />
                <h1 className="self-center text-gray-600">Click for explore</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agreement;
