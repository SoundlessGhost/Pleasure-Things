import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="pt-10 lg:pt-20 flex items-center justify-center">{children}</div>
  );
};

export default AuthLayout;
