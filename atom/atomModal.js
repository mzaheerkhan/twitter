import { atom } from "recoil";
export const modelState = atom({
  key: "modelState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
export const postIdState = atom({
  key: "postIdState", // unique ID (with respect to other atoms/selectors)
  default: "id", // default value (aka initial value)
});
