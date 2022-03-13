import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closePopup, clickPopup } from "../features/popUpSlice";
import { logout, reset } from "../features/auth/authSlice";

const Navbar = (props) => {
  const { setPlaceId, setPlaceDetails, setShowWidget, isLoaded } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.popupSignInOut);
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.authStore
  );

  const popupPage = (page) => {
    dispatch(clickPopup(page));
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
        <div>
          <button>{user.u_username}</button>
          <button
            className="px-3 py-2 mx-2 my-1 hover:bg-white/50 bg-pink-600 rounded-lg font-['SarabunBold'] text-lg"
            onClick={() => {}}>
            Add Resident
          </button>
          <button
            className="px-3 py-2 mx-2 my-1 hover:bg-pink-600 rounded-lg bg-white/50 text-white font-['SarabunBold'] text-lg"
            onClick={onLogout}>
            Sign Out
          </button>
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
