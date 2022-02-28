import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { closePopup } from "../features/popUpSlice";

const SignUp = () => {
  const { status } = useSelector((state) => state.popupSignInOut);
  const dispatch = useDispatch();

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="bg-white text-black rounded-xl px-10 py-8 rounded-xl w-[20vw]">
          {/* header */}
          <div className="flex justify-between">
            <h1 className="font-['SarabunBold']">Sign Up</h1>
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
            <div className="grid grid-cols-1 gap-2 mb-2 mt-4 border-2 rounded-lg p-2">
              <input
                className="p-1 outline-0 focus:bg-pink-100  rounded-lg"
                name="username"
                type="text"
                placeholder="Username"
              />
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

            <div className="grid grid-cols-1 gap-2 mb-2 border-2 rounded-lg p-2">
              <input
                className="p-1 outline-0 focus:bg-pink-100  rounded-lg"
                name="firstname"
                type="text"
                placeholder="First name"
              />
              <input
                className="p-1 outline-0 focus:bg-pink-100  rounded-lg"
                name="lastname"
                type="text"
                placeholder="Last name"
              />
              <input
                className="p-1 outline-0 focus:bg-pink-100  rounded-lg"
                name="idcard"
                type="text"
                placeholder="Id card"
              />
              <input
                className="p-1 outline-0 focus:bg-pink-100  rounded-lg"
                name="phoneNum"
                type="text"
                placeholder="Phone"
              />
            </div>

            <div className="grid grid-cols-1 gap-2 mb-4 border-2 rounded-lg p-2">
              <input
                className="p-1 outline-0 focus:bg-pink-100  rounded-lg"
                name="bankName"
                type="text"
                placeholder="Bank name"
              />
              <input
                className="p-1 outline-0 focus:bg-pink-100  rounded-lg"
                name="bankId"
                type="text"
                placeholder="Bank id"
              />
            </div>

            {/* error */}
            <h1 className="hidden font-['SarabunBold'] text-red-500 mb-2 justify-self-center">
              wrong
            </h1>

            <button className="bg-fuchsia-600 text-white rounded-lg py-1 font-['SarabunBold']">
              Sign In
            </button>
            <div className="flex font-['SarabunBold']">
              <h1>You have an account </h1>
              <button className="ml-1 text-pink-500">Sign In</button>
              <h1>&nbsp;here</h1>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="opacity-25 fixed inset-0 z-40 bg-pink-200"></div> */}
    </>
  );
};

export default SignUp;
