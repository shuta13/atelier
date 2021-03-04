import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export const Header: React.FC = () => {
  return (
    <div className="HeaderWrap">
      <Link href="/">
        <a className="HeaderText">atelier</a>
      </Link>
      <a
        href="https://github.com/shuta13/learn-webgl"
        target="_blank"
        rel="noopener"
        className="HeaderGithubLink"
      >
        <FontAwesomeIcon icon={faGithub} className="HeaderGithubIcon" />
      </a>
    </div>
  );
};
