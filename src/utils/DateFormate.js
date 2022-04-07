export const dateFormate = (tr_date) => {
  const data = new Date(tr_date);
  const date = data.getDate();
  const month = data.getMonth();
  const year = data.getFullYear();
  // console.log(date + "/" + month + "/" + year);
  return date + "/" + month + "/" + year;
};

export const dateFormatwithTime = (input_date) => {
  const data = new Date(input_date);
  const date = data.getDate();
  const month = data.getMonth() + 1;
  const year = data.getFullYear();
  const hour = data.getHours();
  const minute = data.getMinutes();
  const second = data.getSeconds();
  // console.log(date + "/" + month + "/" + year);
  return (
    date + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second
  );
};
