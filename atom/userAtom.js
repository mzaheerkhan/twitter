import { atom } from 'recoil';
export const userModal = atom({
  key: "userState", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
