import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EditInput from "./EditInput";
import PasswordInput from "./PasswordInput";
import ShowInput from "./ShowInput";
import SubmitBtn from "./SubmitBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AccountRightBox = () => {
  const { user } = useSelector((state) => state.authStore);
  const [formUpdateUser, setFormUpdateUser] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [uploadProfile, setUploadProfile] = useState("");
  // const [fileProfile, setFileProfile] = useState("");

  useEffect(() => {
    return () => {};
  }, [isSubmit]);

  const uploadHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUploadProfile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    // setFileProfile(e.target.files[0]);
    setFormUpdateUser((prev) => ({
      ...prev,
      u_profileImg: e.target.files[0],
    }));
  };

  return (
    <div className="h-full grid content-between ">
      <div>
        <div className="grid grid-cols-1 divide-y-[1px] divide-[#cdd9e5]/25">
          <div className="mb-4 text-2xl font-bold">Profile</div>
          <div className="font-light">
            <ShowInput label="Username" value={user.user.u_username} />
            <ShowInput label="Email" value={user.user.u_email} />
            <PasswordInput
              setFormUpdateUser={setFormUpdateUser}
              isSubmit={isSubmit}
            />
            <ShowInput label="Id Card" value={user.user.u_idcard} />
            <EditInput
              label="First name"
              dbLabel="u_name"
              value={user.user.u_name}
              setFormUpdateUser={setFormUpdateUser}
              isSubmit={isSubmit}
            />
            <EditInput
              label="Last name"
              dbLabel="u_surname"
              value={user.user.u_surname}
              setFormUpdateUser={setFormUpdateUser}
              isSubmit={isSubmit}
            />
            <EditInput
              label="Phone"
              dbLabel="u_phonenum"
              value={user.user.u_phonenum}
              setFormUpdateUser={setFormUpdateUser}
              isSubmit={isSubmit}
            />
          </div>
          <div className="flex flex-row w-full pt-4 mt-4 text-xl">
            <h2 className="basis-1/4">Picture profile</h2>
            <label className="cursor-pointer basis-2/4">
              <input type="file" onChange={uploadHandler} />
              {user.user.u_profileImg || uploadProfile ? (
                <img
                  className="mr-4 h-20 w-20 object-cover rounded-full overflow-hidden"
                  src={uploadProfile ? uploadProfile : user.user.u_profileImg}
                />
              ) : (
                <FontAwesomeIcon
                  className="h-20 mr-6 "
                  icon="fa-solid fa-circle-user"
                />
              )}
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 divide-y-[1px] divide-[#cdd9e5]/25 mt-6">
          <div className="mb-4 text-2xl font-bold">Bank</div>
          <div className="font-light">
            <EditInput
              label="Bank Account Number"
              dbLabel="u_bankactid"
              value={user.user.u_bankactid}
              setFormUpdateUser={setFormUpdateUser}
              isSubmit={isSubmit}
            />
            <EditInput
              label="Bank Account Name"
              dbLabel="u_bankactname"
              value={user.user.u_bankactname}
              setFormUpdateUser={setFormUpdateUser}
              isSubmit={isSubmit}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end self-end">
        <SubmitBtn
          setFormUpdateUser={setFormUpdateUser}
          formUpdateUser={formUpdateUser}
          setIsSubmit={setIsSubmit}
        />
      </div>
    </div>
  );
};

export default AccountRightBox;
