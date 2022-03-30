import React from "react";
import { updateUser } from "../../api/Put";
import { useDispatch } from "react-redux";
import { updateUserIntoStore } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const SubmitBtn = (props) => {
  const dispatch = useDispatch();
  const { formUpdateUser, setIsSubmit } = props;
  return (
    <button
      className="text-white font-[SarabunBold] bg-pink-600 py-2 px-4 rounded-lg border-1 border-[#44864a]"
      onClick={() => {
        updateUser(formUpdateUser)
          .then((update) => {
            // update user database into authSlice
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
