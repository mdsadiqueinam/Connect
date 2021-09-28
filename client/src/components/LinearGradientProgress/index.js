import React from "react";
import "./style.css";

export default function LinearGradientProgress({ className="", ...rest }) {
  return <div className={`linear-gradient-progress ${className}`} {...rest}></div>;
}
