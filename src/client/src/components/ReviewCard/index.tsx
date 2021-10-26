import './card.css';
import { ReactNode } from 'react';

type ReviewCardProps = {
  imgSrc: string;
  children?: ReactNode;
  reverse?: boolean;
  className?: string;
};

export default function ReviewCard({
  imgSrc,
  children,
  reverse,
  className,
}: ReviewCardProps) {
  let classes = `review-card ${className ? className : ''}`;

  if (reverse) classes += ' review-card--reverse';

  return (
    <div className={classes}>
      <img className="review-card__img" src={imgSrc} alt="" />
      <div className="review-card__text">{children}</div>
    </div>
  );
}
