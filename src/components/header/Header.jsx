import React from "react";

function Header({ content, styles }) {
  return (
    <div>
      <h1 style={styles}>{content}</h1>
    </div>
  );
}

export default Header;
