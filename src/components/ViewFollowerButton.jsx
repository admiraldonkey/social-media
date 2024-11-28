"use client";
import { useState } from "react";

export function ViewFollowerButton({ children }) {
  const [show, setShow] = useState(false);

  function handleSetShow() {
    setShow(!show);
  }

  return (
    <div>
      <button onClick={handleSetShow}>{show ? "hide" : "show"}</button>
      {show && children}
    </div>
  );
}
