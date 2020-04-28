import React from "react";
import contents from "../assets/data/contents.json";
import Link from "next/link";

const reversed = contents.reverse();

const Home = () => {
  return (
    <div className="container">
      <div className="ContentsWrap">
        {
          reversed.map((content) => (
            <Link href={`/learn/${content.id}`} key={content.id}>
              <img
                className="Contents"
                src={`learn/${content.id}.png`}
                alt={`${content.id} Image`}
              />
            </Link>
          ))
        }
        {
          reversed.length % 3 === 1 ? (
            <>
              <img className="Contents" src="" alt="" />
              <img className="Contents" src="" alt="" />
            </>
          ) : reversed.length % 3 === 2 ? (
            <img className="Contents" src="" alt="" />
          ) : null
        }
      </div>
    </div>
  );
};

export default Home;
