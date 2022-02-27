import SearchBar from "./SearchBar";

const Navbar = (props) => {
  const { setPlaceId, setPlaceDetails, setShowWidget, isLoaded } = props;
  return (
    <nav className="relative flex flex-wrap items-center justify-around px-2 py-8">
      <SearchBar
        setPlaceDetails={setPlaceDetails}
        setPlaceId={setPlaceId}
        setShowWidget={setShowWidget}
        isLoaded={isLoaded}
      />

      <div>
        <button className="px-3 py-2 mx-2 my-1 hover:bg-pink-600 rounded-lg bg-white/50 text-white font-['SarabunBold'] text-lg">
          Login
        </button>
        <button className="px-3 py-2 mx-2 my-1 hover:bg-white/50 bg-pink-600 rounded-lg font-['SarabunBold'] text-lg">
          SignUp
        </button>
        <button>Profile</button>
      </div>
    </nav>
  );
};

export default Navbar;
