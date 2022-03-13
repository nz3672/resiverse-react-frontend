import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { closePopup } from "../features/popUpSlice";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import spinner1 from "./../../img/placeholder/Spinner1.svg";

const SignUp = () => {
  const [msgErrToast, setMsgErrToast] = useState("");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    firstname: "",
    lastname: "",
    idcard: "",
    phone: "",
    bankName: "",
    bankId: "",
  });
  const {
    username,
    email,
    password,
    password2,
    firstname,
    lastname,
    idcard,
    phone,
    bankName,
    bankId,
  } = form;
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.authStore
  );
  const { status } = useSelector((state) => state.popupSignInOut);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("dsds");
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
      dispatch(closePopup());
    }

    dispatch(reset());

    return () => {};
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("1");
    if (password !== password) {
      toast.error("Password do not match.");
      setMsgErrToast("Password do not match.");
    } else if (
      !username ||
      !email ||
      !password ||
      !password2 ||
      !firstname ||
      !lastname ||
      !idcard ||
      !phone ||
      !bankName ||
      !bankId
    ) {
      toast.error("Please complete the information.");
      // console.log(toast);
      setMsgErrToast("Please complete the information.");
    } else {
      const userData = {
        u_username: username,
        u_email: email,
        u_name: firstname,
        u_bankactname: bankName,
        u_password: password,
        u_bankactid: bankId,
        u_surname: lastname,
        u_phonenum: phone,
        u_idcard: idcard,
      };

      dispatch(register(userData));
    }
  };

  // if (isLoading) {
  //   return <img src={spinner1}></img>;
  // }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="bg-white text-black rounded-xl px-10 py-8 min-w-[320px] rounded-xl w-[20vw]">
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
            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-1 gap-2 mb-2 mt-4 border-2 rounded-lg p-2">
                <input
                  className="p-1 outline-0 focus:bg-pink-100  rounded-lg"
                  name="username"
                  value={username}
                  type="text"
                  placeholder="Username"
                  onChange={onChange}
                />
                <input
                  className="p-1 outline-0 focus:bg-pink-100  rounded-lg"
                  name="email"
                  value={email}
                  type="email"
                  placeholder="Email"
                  onChange={onChange}
                />
                <input
                  className="p-1 outline-0 focus:bg-pink-100  rounded-lg"
                  name="password"
                  value={password}
                  type="password"
                  placeholder="Password"
                  onChange={onChange}
                />
                <input
                  className="p-1 outline-0 focus:bg-pink-100  rounded-lg"
                  name="password2"
                  value={password2}
                  type="password"
                  placeholder="Password"
                  onChange={onChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-2 mb-2 border-2 rounded-lg p-2">
                <input
                  className="p-1 outline-0 focus:bg-pink-100  rounded-lg"
                  name="firstname"
                  value={firstname}
                  type="text"
                  placeholder="First name"
                  onChange={onChange}
                />
                <input
                  className="p-1 outline-0 focus:bg-pink-100  rounded-lg"
                  name="lastname"
                  value={lastname}
                  type="text"
                  placeholder="Last name"
                  onChange={onChange}
                />
                <input
                  className="p-1 outline-0 focus:bg-pink-100  rounded-lg"
                  name="idcard"
                  value={idcard}
                  type="text"
                  placeholder="Id card"
                  onChange={onChange}
                />
                <input
                  className="p-1 outline-0 focus:bg-pink-100  rounded-lg"
                  name="phone"
                  value={phone}
                  type="text"
                  placeholder="Phone"
                  onChange={onChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-2 mb-4 border-2 rounded-lg p-2">
                <input
                  className="p-1 outline-0 focus:bg-pink-100  rounded-lg"
                  name="bankName"
                  value={bankName}
                  type="text"
                  placeholder="Bank name"
                  onChange={onChange}
                />
                <input
                  className="p-1 outline-0 focus:bg-pink-100  rounded-lg"
                  name="bankId"
                  value={bankId}
                  type="text"
                  placeholder="Bank id"
                  onChange={onChange}
                />
              </div>
              {/* error */}
              <h1
                className={`${
                  (isError && message) || msgErrToast
                    ? "font-['SarabunBold'] text-red-500 mb-2 justify-self-center"
                    : "hidden"
                }`}
              >
                {message ? message : msgErrToast}
              </h1>

              <button
                className="bg-fuchsia-600 text-white rounded-lg w-full py-1 font-['SarabunBold']"
                type="submit"
              >
                Sign Up
              </button>
            </form>

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
