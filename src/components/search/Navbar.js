import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { closePopup, clickPopup } from "../features/popUpSlice";
import { logout, reset } from "../features/auth/authSlice";
import { openSidebar } from "../features/sidebarSlice";
import { chooseSidebar } from "../features/sidebarShowSlice";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { notificationDB } from "../../firebase";
import NotificationPane from "./NotificationPane";
import BellButton from "./BellButton";

const Navbar = (props) => {
  const { setPlaceId, setPlaceDetails, setShowWidget, isLoaded } = props;
  const [notifications, setNotification] = useState([]);
  const [showNoti, setNoti] = useState(false);
  const [showPane, setShowPane] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.popupSignInOut);
  const { user } = useSelector((state) => state.authStore);

  const popupPage = (page) => {
    dispatch(clickPopup(page));
  };

  const sidebarPage = (page) => {
    dispatch(openSidebar(page));
  };

  const chooseSidebarPage = (page) => {
    dispatch(chooseSidebar(page));
  };

  // Logout
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const handleShowPane = () => {
    if (showPane) {
      setShowPane(false);
    } else {
      setShowPane(true);
    }
  };

  return (
    <nav className="relative flex flex-wrap items-center justify-around px-2 py-8">
      <div className="flex">
        <Link to={`/agreement`} target="_blank" rel="noopener noreferrer">
          <h1 className="font-[righteous] text-[60px] mr-4 text-white leading-none rainbow-text">
            Resiverse
          </h1>
        </Link>

        <SearchBar
          setPlaceDetails={setPlaceDetails}
          setPlaceId={setPlaceId}
          setShowWidget={setShowWidget}
          isLoaded={isLoaded}
        />
      </div>
      {user ? (
        <div className="flex items-center">
          <Link to={`/account`} target="_blank" rel="noopener noreferrer">
            {user.user.u_profileImg ? (
              <img
                className=" mr-2 h-10 w-10 object-cover rounded-full overflow-hidden ring-4 ring-pink-500"
                src={user.user.u_profileImg}
              />
            ) : (
              <FontAwesomeIcon
                className="h-10 mr-2"
                icon="fa-solid fa-circle-user"
              />
            )}
          </Link>
          <button
            className="px-3 py-2 mx-2 my-1 hover:bg-white/75 hover:text-pink-500 bg-pink-600 rounded-lg font-['SarabunBold'] text-lg"
            onClick={() => {
              chooseSidebarPage("AddResidence");
              sidebarPage(true);
            }}>
            Add Resident
          </button>

          <button
            className="px-3 py-2 mx-2 my-1 hover:bg-pink-600 hover:text-white text-pink-600 rounded-lg bg-white/75 text-white font-['SarabunBold'] text-lg"
            onClick={() => onLogout()}
          >
            Sign Out
          </button>
          <div className="relative h-8 w-8">
            <BellButton
              handleShowPane={handleShowPane}
              showNoti={showNoti}
              user={user}
              setNoti={setNoti}
              setNotification={setNotification}
              notifications={notifications}
              showPane={showPane}
            />
          </div>
          {showPane && <NotificationPane notifications={notifications} />}
        </div>
      ) : (
        <div>
          <button
            className="px-3 py-2 mx-2 my-1 hover:bg-pink-600 rounded-lg bg-white/50 text-white font-['SarabunBold'] text-lg"
            onClick={() => {
              popupPage("SignIn");
            }}>
            SignIn
          </button>

          <button
            className="px-3 py-2 mx-2 my-1 hover:bg-white/50 bg-pink-600 rounded-lg font-['SarabunBold'] text-lg"
            onClick={() => {
              popupPage("SignUp");
            }}>
            SignUp
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
