import './index.css';
import { ReactNode } from 'react';

type ProfilePicProps = {
  children: ReactNode;
  backgroundColor?: string;
  size?: string;
};

export default function ProfilePic({
  backgroundColor,
  size,
  children,
}: ProfilePicProps) {
  return (
    <span
      aria-hidden
      className="profile-pic"
      style={{ backgroundColor: backgroundColor, width: size, height: size }}
    >
      {children}
    </span>
  );
}
