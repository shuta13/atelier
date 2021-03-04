import React from 'react';
import contents from '../assets/data/contents.json';
import Link from 'next/link';

const reversed = contents.reverse();

const Home = () => {
  return (
    <div className="container">
      <div className="ContentsWrap">
        {reversed.map((content) => (
          <Link href={`/learn/${content.id}`} key={content.id}>
            <a className="ContentsLink">
              <img
                className="ContentsImg"
                src={`learn/${content.id}.png`}
                alt={`${content.id} Image`}
              />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
