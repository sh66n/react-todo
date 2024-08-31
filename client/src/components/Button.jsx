import React from "react";

export function PrimaryButton({ text, isDisabled, onClick }) {
  return (
    <button
      className="p-1.5 m-1.5 md:p-3 md:m-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 "
      disabled={isDisabled ? true : false}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
