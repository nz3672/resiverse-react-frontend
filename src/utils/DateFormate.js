export const dateFormate = (tr_date) => {
  const data = new Date(tr_date);
  const date = data.getDate();
  const month = data.getMonth();
  const year = data.getFullYear();
  // console.log(date + "/" + month + "/" + year);
  return date + "/" + month + "/" + year;
};
