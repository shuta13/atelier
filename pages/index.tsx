import React from "react";
import contents from "../assets/data/contents.json";
import Link from "next/link";

const reversed = contents.reverse();

const Home = () => {
  return (
    <div className="container">
      <div className="ContentsWrap">
        {reversed.map((content) => (
          <Link href={`/learn/${content.id}`} key={content.id}>
            <img
              className="Contents"
              src={content.img}
              alt={`${content.id} Image`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
