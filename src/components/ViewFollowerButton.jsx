"use client";
import { useState } from "react";

// Button that hides or shows the current user's followers. List is hidden by default. DisplayFollowers component is passed as a child of this so it gets dynamically rendered depending on 'show' state.
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
