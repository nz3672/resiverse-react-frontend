const Widget = (props) => {
  const { placeDetails, i } = props;

  return (
    <div
      key={i}
      className="cursor-pointer hover-widget hover:bg-pink-500 rounded-3xl shadow-xl w-[190px] h-[270px] desktop:w-[280px] desktop:h-[370px] bg-white hover:z-100 bg-opacity-50 laptop:pb-4 laptop:px-4 laptop:pt-5 pb-2 px-2 pt-2"
    >
      <div className="w-full min-h-[50%] h-[55%] max-h-[60%]">
        <img
          alt="building-placeholder"
          // src={require("../../img/placeholder/building-placeholder-4-3.png")}
          src={
            placeDetails.hasOwnProperty("bd_img")
              ? placeDetails.bd_img
              : require("../../img/placeholder/building-placeholder-4-3.png")
          }
          className="object-contain rounded-xl w-full h-full"
        ></img>
      </div>
      <div className="mt-4 w-full h-auto">
        <div className="flex mb-2 w-full h-auto ">
          <img
            alt="verify-badge"
            src={
              placeDetails.bd_facilities.length > 0
                ? require("../../img/icon/verify-badge1.png")
                : require("../../img/icon/no-verify-badge1.png")
            }
            className="object-contain rounded-xl w-7 pr-1 self-center "
          ></img>
          <h2 className="font-['SarabunBold'] text-xl truncate w-full">
            {placeDetails.hasOwnProperty("bd_name") ? placeDetails.bd_name : ""}
          </h2>
        </div>
        <div id="description-widget" className="px-2 mb-3">
          <h2 className="font-['SarabunMed'] text-base mb-1">
            {placeDetails.hasOwnProperty("bd_room") &&
            placeDetails.bd_room.length == 1
              ? placeDetails.bd_room[0].roomPrice + " บาท"
              : placeDetails.hasOwnProperty("bd_room") &&
                placeDetails.bd_room.length > 1
              ? placeDetails.bd_room[0].roomPrice +
                "-" +
                placeDetails.bd_room[placeDetails.bd_room.length - 1].roomPrice +
                " บาท"
              : ""}
          </h2>
          {/* {console.log(placeDetails)} */}
          <p className="font-['SarabunLight'] text-sm">
            {placeDetails.hasOwnProperty("bd_address")
              ? placeDetails.bd_address.hasOwnProperty("bd_subDist")
                ? placeDetails.bd_address.bd_subDist +
                  " " +
                  placeDetails.bd_address.bd_province
                : placeDetails.bd_address
              : ""}
          </p>
        </div>
        <div id="buff" className="mt-2 flex">
          {placeDetails.hasOwnProperty("bd_facilities") &&
            placeDetails.bd_facilities.length !== 0 &&
            placeDetails.bd_facilities.map((facility, i) => {
              return (
                <div key={i} className="has-tooltip mr-1">
                  <img
                    alt="verify-badge"
                    src={require(`../../img/icon/buff/${facility.faName.replace(
                      /\s/g,
                      ""
                    )}.png`)}
                    className="object-contain rounded-xl w-9 pr-1 self-center hover:-translate-y-1"
                  ></img>
                  <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 mb-10 text-sm">
                    {facility.faName}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Widget;
