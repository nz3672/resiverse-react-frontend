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

const Navbar = (props) => {
  const { setPlaceId, setPlaceDetails, setShowWidget, isLoaded } = props;
  const [notifications, setNotification] = useState([]);
  const [showNoti, setNoti] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.popupSignInOut);
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.authStore
  );
  const notificationDocRef = doc(notificationDB, "translist-noti", user._id);

  useEffect(() => {
    const unsubscribe = onSnapshot(notificationDocRef, (snapshot) => {
      setNotification(snapshot.data().notif);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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

  return (
    <nav className="relative flex flex-wrap items-center justify-around px-2 py-8">
      <SearchBar
        setPlaceDetails={setPlaceDetails}
        setPlaceId={setPlaceId}
        setShowWidget={setShowWidget}
        isLoaded={isLoaded}
      />
      {user ? (
        <div className="flex items-center">
          <Link to={`/account`}>{user.user.u_username}</Link>
          <button
            className="px-3 py-2 mx-2 my-1 hover:bg-white/50 bg-pink-600 rounded-lg font-['SarabunBold'] text-lg"
            onClick={() => {
              chooseSidebarPage("AddResidence");
              sidebarPage(true);
            }}>
            Add Resident
          </button>

          <button
            className="px-3 py-2 mx-2 my-1 hover:bg-pink-600 rounded-lg bg-white/50 text-white font-['SarabunBold'] text-lg"
            onClick={onLogout}>
            Sign Out
          </button>
          <span className="relative">
            <button className="mx-2">
              <FontAwesomeIcon className="h-8" icon="fa-solid fa-bell" />
            </button>
            {showNoti && (
              <span className="flex absolute mr-1 h-4 w-4 top-0 right-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
              </span>
            )}
          </span>
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
