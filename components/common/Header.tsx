import React from "react";
import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <div className="HeaderWrap">
      <Link href="/">
        <a className="HeaderText">Learn WebGL</a>
      </Link>
    </div>
  );
};
