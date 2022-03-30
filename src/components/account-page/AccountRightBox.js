import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EditInput from "./EditInput";
import PasswordInput from "./PasswordInput";
import ShowInput from "./ShowInput";
import SubmitBtn from "./SubmitBtn";

const AccountRightBox = () => {
  const { user } = useSelector((state) => state.authStore);
  const [formUpdateUser, setFormUpdateUser] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    return () => {};
  }, [isSubmit]);

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
        </div>
        <div className="grid grid-cols-1 divide-y-[1px] divide-[#cdd9e5]/25 mt-10">
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
        <SubmitBtn formUpdateUser={formUpdateUser} setIsSubmit={setIsSubmit} />
      </div>
    </div>
  );
};

export default AccountRightBox;
