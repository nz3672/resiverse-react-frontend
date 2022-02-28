import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { closePopup } from "../features/popUpSlice";
const SignIn = () => {
  const { status } = useSelector((state) => state.popupSignInOut);
  const dispatch = useDispatch();

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="bg-white text-black px-10 py-8 rounded-xl w-[20vw]">
          {/* header */}
          <div className="flex justify-between">
            <h1 className="font-['SarabunBold']">Sign In</h1>
            <button
              onClick={() => {
                dispatch(closePopup());
              }}
            >
              <FontAwesomeIcon
                icon="fa-regular fa-circle-xmark"
                className="text-black"
              />
            </button>
          </div>

          {/* content */}
          <div className="grid grid-cols-1 gap-2 place-content-center my-4">
            <div className="grid grid-cols-1 gap-2 my-4 border-2 rounded-lg p-2">
              <input
                className="p-1 outline-0 focus:bg-pink-100  rounded-lg"
                name="email"
                type="email"
                placeholder="Email"
              />
              <input
                className="p-1 outline-0 focus:bg-pink-100  rounded-lg"
                name="password"
                type="password"
                placeholder="Password"
              />
            </div>

            {/* error */}
            <h1 className="hidden font-['SarabunBold'] text-red-500 mb-2 justify-self-center">
              wrong
            </h1>

            <button className="bg-fuchsia-600 text-white rounded-lg py-1 font-['SarabunBold'] mb-2">
              Sign In
            </button>

            <button className="text-pink-500 font-['SarabunBold']">
              Forgot password
            </button>
            <div className="flex font-['SarabunBold']">
              <h1>Don't have an account </h1>
              <button className="ml-1 text-pink-500">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="opacity-25 fixed inset-0 z-40 bg-pink-200"></div> */}
    </>
  );
};

export default SignIn;
