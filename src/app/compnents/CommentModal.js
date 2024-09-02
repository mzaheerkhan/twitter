"use client";
import { useRecoilState } from "recoil";
import { modelState } from "../../../atom/modalState";
export const CommentModal = () => {
  const [open, setOpen] = useRecoilState(modelState);
  return (
  <div>
    Comment Modal:
    {open &&
        <span>The modal is opened</span>
    }
  </div>
  );
};
