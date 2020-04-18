import React from "react";
import contents from "../assets/data/contents.json"
import Link from "next/link"

const Home = () => {
  return (
    <div className="container">
      <div className="ContentsWrap">
      {
        contents.map((content) => (
          <Link href={`/learn/${content.id}`}>
            <img className="Contents" src={content.img} alt={`${content.id} Image`} />
          </Link>
        ))
      }
      </div>
    </div>
  );
};

export default Home;
