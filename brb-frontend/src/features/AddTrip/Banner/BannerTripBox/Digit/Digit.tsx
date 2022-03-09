import './Digit.less';
import clsx from 'clsx';

export interface Props {
  value: number;
  title: string;
  className?: string;
}
export const Digit = ({ value, title, className = '' }: Props) => {
  const leftDigit = value >= 10 ? value.toString()[0] : '0';
  const rightDigit = value >= 10 ? value.toString()[1] : value.toString();

  return (
    <>
      <div className={clsx('digit', className)}>
        <div className="digit-wrapper">
          <div className="single-digit">
            {leftDigit}
            {rightDigit}
            <p className="title">{title}</p>
          </div>
        </div>
      </div>
    </>
  );
};
