const CheckboxFacility = (props) => {
  const { label, setFacilities, checkbox, setCheckbox } = props;
  const onClickCheckbox = (e) => {
    // checkbox
    setCheckbox((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
    setFacilities((prev) => [...prev, label.replace(/\s/g, "-")]);
  };

  return (
    <div
      className={`${
        checkbox ? "bg-gray-200/50 text-black" : ""
      } rounded-2xl py-2 px-2`}
    >
      <input
        name={label.replace(/\s/g, "")}
        type="checkbox"
        className="focus:ring-0 focus:ring-offset-0 border-1 w-6 h-6 border-gray-400 rounded-3xl  text-pink-500 focus:text-pink-500 text-3xl"
        // onClick={() => {
        //   onClickCheckbox();
        // }}
        onChange={(e) => {
          onClickCheckbox(e);
        }}
        checked={checkbox}
      />
      <span
        className={`${
          checkbox ? "text-black" : "text-gray-400"
        } ml-3 font-medium`}
      >
        {label}
      </span>
    </div>
  );
};

export default CheckboxFacility;
