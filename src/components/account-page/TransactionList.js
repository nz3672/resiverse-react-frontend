import { useState } from "react";
import FormOwnerTransaction from "./FormOwnerTransaction";
import Transaction from "./Transaction";

const TransactionList = () => {
  const [select, setSelect] = useState(false);

  return (
    <>
      <div className="h-full overflow-auto scrollbar-style-w scrollbar-style-tr scrollbar-style-th mr-4">
        <Transaction setSelect={setSelect} />
        <Transaction setSelect={setSelect} />
      </div>
      <div className="">
        {select && <FormOwnerTransaction setSelect={setSelect} />}
      </div>
    </>
  );
};

export default TransactionList;
