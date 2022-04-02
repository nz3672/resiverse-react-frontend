import { useState, useEffect } from "react";
import {
  getMyTransList,
  getMyResidenceById,
  getOtherUserById,
} from "../../api/Get";
import FormWaitForContract from "./FormWaitForContract";
import Transaction from "./Transaction";
import { useSelector } from "react-redux";

const TransactionList = () => {
  const [select, setSelect] = useState(false);
  const [translists, setTranslist] = useState([]);
  const { user } = useSelector((state) => state.authStore);
  // const [myRes, setMyRes] = useState();

  useEffect(() => {
    getMyTransList()
      .then((res) => {
        setTranslist(res);
      })
      .catch((err) => console.log(err));

    return () => {};
  }, []);

  return (
    <>
      <div className="h-full overflow-auto scrollbar-style-w scrollbar-style-tr scrollbar-style-th mr-4">
        {translists.length !== 0 &&
          translists.map((item, i) => {
            if (!item.hasOwnProperty("bd_obj")) {
              getMyResidenceById(item.bd_id)
                .then((res) => {
                  // Set into Translist for no request again
                  setTranslist(
                    translists.map((obj) => {
                      if (obj._id === item._id) {
                        return {
                          ...obj,
                          bd_obj: res,
                        };
                      } else {
                        return obj;
                      }
                    })
                  );
                })
                .catch((err) => console.log(err));
            }

            if (!item.hasOwnProperty("u_obj")) {
              if (user._id == item.u_id1) {
                getOtherUserById(item.u_id2)
                  .then((res) => {
                    setTranslist(
                      translists.map((obj) => {
                        if (obj._id === item._id) {
                          return {
                            ...obj,
                            u_obj: res,
                          };
                        } else {
                          return obj;
                        }
                      })
                    );
                  })
                  .catch((err) => console.log(err));
              } else if (user._id == item.u_id2) {
                getOtherUserById(item.u_id1)
                  .then((res) => {
                    setTranslist(
                      translists.map((obj) => {
                        if (obj._id === item._id) {
                          return {
                            ...obj,
                            u_obj: res,
                          };
                        } else {
                          return obj;
                        }
                      })
                    );
                  })
                  .catch((err) => console.log(err));
              }
            }

            return (
              <Transaction key={i} setSelect={setSelect} translist={item} />
            );
          })}
      </div>
      <div className="">
        {select && <FormWaitForContract setSelect={setSelect} />}
      </div>
    </>
  );
};

export default TransactionList;
