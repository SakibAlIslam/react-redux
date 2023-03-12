import React from "react";

const Button = ({ children, handler, btnStyle }) => {
  return (
    <button class={btnStyle} onClick={handler}>
      {children}
    </button>
  );
};

export default Button;
