export const validateTimeExpired = (time) => {
  // time in milliseconds
  return Date.now() - time > 0;
};

export const getMantraFromQueryString = () => {
  if (window) {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const Mantra = params.get('Mantra');
    return Mantra;
  }
};

var hotelIdSource = '';
const HOTEL_KEY_STORAGE = 'HOTEL_KEY_STORAGE';
export const getHotelId = () => {
  if (typeof window !== 'undefined') {
    try {
      let arrPathName = window.location.pathname.split('/');
      arrPathName = arrPathName.filter((item) => !!item);
      if (arrPathName.length > 0) {
        const hotelIdPath = arrPathName[0];
        hotelIdSource = hotelIdPath;
        window.localStorage.setItem(HOTEL_KEY_STORAGE, hotelIdSource);
        return arrPathName[0];
      }
    } catch (error) {
      //do nothing
    }
    return window.localStorage.getItem(HOTEL_KEY_STORAGE);
  }
  return hotelIdSource;
};

export const setHotelId = (hotelId) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(HOTEL_KEY_STORAGE, hotelId);
  }
  hotelIdSource = hotelId;
};
