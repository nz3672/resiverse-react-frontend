export const stateEvent = (translist) => {
  if (translist.tr_state === "waitLandlordConfirm") {
    return "รอผู้ให้เช่ายืนยันที่พัก"; // add room image , wallpaper etc.
  } else if (translist.tr_state === "waitTenantConfirm") {
    return "รอผู้เช่ายืนยันการชำระเงิน"; // show bank id for pay
  } else if (translist.tr_state === "waitTenantMoveIn") {
    return "รอผู้เช่าย้ายเข้าที่พัก"; // change expense state
  } else if (translist.tr_state === "waitTenantMoveOut") {
    return "ผู้เช่าอยู่ระหว่างพักอาศัย รอผู้เช่าย้ายออก";
  } else if (translist.tr_state === "waitLandlordCheckInsur") {
    return "รอผู้ให้เช่ากรอกค่าความเสียหาย";
  } else if (translist.tr_state === "waitForConfirmInsur") {
    return "รอผู้เช่าดำเนินการยินยอมรับเงินค่าประกัน"; // show insurance that calculate by landlord's insurance
  } else if (translist.tr_state === "success") {
    return "ยืนยันรับเงินค่าประกันเรียบร้อย";
  } else if (translist.tr_state === "debateInsur") {
    return "รอผู้ให้เช่าดำเนินการยินยอมรับเงินค่าประกัน";
  } else {
    return "";
  }
};
