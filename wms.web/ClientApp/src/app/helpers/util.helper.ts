import { environment } from "~src/environments/environment";

/** Hàm kiểm tra đường dẫn có chứa path mong muốn */
export const checkUrl = (fullPath: string, matchPath: string): boolean => {
  return fullPath.includes(matchPath);
};

/** Hàm xử lý chuyển đổi chuỗi ISO thành đối tượng chứa các trường chi tiết */
export const convertISOToDateObject = (isoString: string): any => {
  const date = new Date(isoString);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // Tháng trong JavaScript bắt đầu từ 0, nên cần +1
    day: date.getDate(),
    dayOfWeek: daysOfWeek[date.getDay()], // Thứ trong tuần
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  };
};

/** Hàm convert data 2 item trong 1 slide */
export const convertArrayTwoItemInSlide = (
  arr: any[],
  keyNameObjOne: string,
  keyNameObjTwo: string
) => {
  let result = [];
  for (let i = 0; i < arr.length; i += 2) {
    let obj = {};
    obj[keyNameObjOne] = arr[i];
    if (i + 1 < arr.length) {
      obj[keyNameObjTwo] = arr[i + 1];
    }
    result.push(obj);
  }

  return result;
};

/** Lấy url image từ cdn */
export const getUrlImageCDN = (url: string, domain: string): string => {
  if (!url) return "";
  return `${domain}/${url.replace(/^\//, "")}`;
};

/** Quay trở về path trước đó (history) */
export const navigateHistory = (): void => {
  window.history.back();
};


export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const day = date.getDate();
  
  // Pad month and day with leading zeros if needed
  const formattedMonth = month.toString().padStart(2, '0');
  const formattedDay = day.toString().padStart(1, '0');
  
  return `${year}-${formattedMonth}-${formattedDay}`;
}