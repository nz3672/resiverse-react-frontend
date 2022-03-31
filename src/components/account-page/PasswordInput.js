import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import bcrypt from "bcryptjs";

const PasswordInput = (props) => {
  const { setFormUpdateUser, isSubmit } = props;
  const { user } = useSelector((state) => state.authStore);
  const [isPwdMatch, setIsPwdMatch] = useState(false);
  const [isNewPwdMatch, setIsNewPwdMatch] = useState(false);
  const [newPwd1, setNewPwd1] = useState("");
  const [newPwd2, setNewPwd2] = useState("");

  useEffect(() => {
    setNewPwd1("");
    setNewPwd2("");
    setIsNewPwdMatch(false);
    setIsPwdMatch(false);
    return () => {};
  }, [isSubmit]);

  const onChangeOld = (e) => {
    bcrypt.compare(e.target.value, user.user.u_password).then((res) => {
      setIsPwdMatch(res);
    });
  };

  return (
    <div className="flex flex-row w-full pt-4 text-xl ">
      <h2 className="basis-1/4">Password</h2>

      <div className="basis-1/4  flex mr-2">
        <input
          type="password"
          className="w-full bg-[#bcc2c0] text-lg rounded-lg border-[1px] border-[#cdd9e5]/50 focus:outline-0 focus:border-pink-500/75 focus:border-[1px] py-1 pl-2 mr-1 focus:ring-0"
          placeholder="old password"
          onChange={onChangeOld}
        />
        <FontAwesomeIcon
          className={`${isPwdMatch ? "text-[#43cc4d]" : ""} self-center`}
          icon="fa-solid fa-circle-check"
        />
      </div>

      <div className="basis-2/4 flex">
        <input
          type="password"
          className="w-full bg-[#bcc2c0] text-lg rounded-lg border-[1px] border-[#cdd9e5]/50 focus:outline-0 focus:border-pink-500/75 focus:border-[1px] py-1 pl-2 mr-1 focus:ring-0"
          placeholder="new password"
          onChange={(e) => {
            setNewPwd1(e.target.value);
            if (e.target.value === newPwd2) {
              setIsNewPwdMatch(true);
              setFormUpdateUser((prev) => ({
                ...prev,
                u_password: e.target.value,
              }));
            }
          }}
        />
        <input
          type="password"
          className="w-full bg-[#bcc2c0] text-lg rounded-lg border-[1px] border-[#cdd9e5]/50 focus:outline-0 focus:border-pink-500/75 focus:border-[1px] py-1 pl-2 mr-1 focus:ring-0"
          placeholder="new password"
          onChange={(e) => {
            setNewPwd2(e.target.value);
            if (e.target.value === newPwd1) {
              setIsNewPwdMatch(true);
              setFormUpdateUser((prev) => ({
                ...prev,
                u_password: e.target.value,
              }));
            }
          }}
        />
        <FontAwesomeIcon
          className={`${isNewPwdMatch ? "text-[#43cc4d]" : ""} self-center`}
          icon="fa-solid fa-circle-check"
        />
      </div>
    </div>
  );
};

export default PasswordInput;
