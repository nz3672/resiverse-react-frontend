import React from "react";
import { updateUser } from "../../api/Put";
import { useDispatch, useSelector } from "react-redux";
import { updateUserIntoStore } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const SubmitBtn = (props) => {
  const { user } = useSelector((state) => state.authStore);
  const dispatch = useDispatch();
  const { setFormUpdateUser, formUpdateUser, setIsSubmit } = props;
  return (
    <button
      disabled
      className="text-white font-[SarabunBold] bg-pink-600 py-2 px-4 rounded-lg border-1 border-[#44864a]"
      onClick={() => {
        setFormUpdateUser({});
        updateUser(formUpdateUser)
          .then((update) => {
            // update user database into authSlice
            localStorage.setItem(
              "user",
              JSON.stringify({ _id: user._id, user: update, token: user.token })
            );
            dispatch(updateUserIntoStore(update));
            setIsSubmit(true);
            toast.success("Updated Your Profile!");
          })
          .catch((err) => console.log("err", err));
      }}
    >
      Update Profile
    </button>
  );
};

export default SubmitBtn;
