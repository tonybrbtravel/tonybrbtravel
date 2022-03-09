import React from 'react';

import parse from 'html-react-parser';

export const Selector1 = ({
  className,
  icon,
  question,
  min = 1,
  max = 10,
  step = 1,
  defaultValue,
  suffixes,
  changeHandler,
}) => (
  <>
    <div className={`selectors-wrapper ${className}`}>
      <div className="icon-selector" image={icon}>{parse(icon)}</div>
      <div className="question">
        <p className="question">{question}</p>
        <p className="answer">
          {defaultValue}
          {' '}
          {suffixes
              && ` ${defaultValue === 1 ? suffixes.singular : suffixes.plural}`}
        </p>

        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select onChange={changeHandler} defaultValue={defaultValue}>
          <option value="1">1 traveller</option>
          <option value="2">2 travellers</option>
          <option value="3">3 travellers</option>
          <option value="4">4 travellers</option>
        </select>
      </div>
    </div>

  </>
);

export const Selector2 = ({
  className,
  icon,
  question,
  min = 1,
  max = 10,
  step = 1,
  defaultValue,
  suffixes,
  changeHandler,
}) => (

  <div className={`selectors-wrapper ${className}`}>
    <div className="icon-selector" image={icon}>{parse(icon)}</div>
    <div className="question">
      <p className="question">{question}</p>
      <p className="answer">
        {defaultValue}
        {' '}
        {suffixes
            && ` ${defaultValue === 1 ? suffixes.singular : suffixes.plural}`}
      </p>

      {/* eslint-disable-next-line jsx-a11y/no-onchange */}
      <select onChange={changeHandler} defaultValue={defaultValue}>
        <option value="4">4 nights</option>
        <option value="6">6 nights</option>
        <option value="8">8 nights</option>
        <option value="10">10 nights</option>
        <option value="12">12 nights</option>
        <option value="14">14 nights</option>
      </select>
    </div>
  </div>
);
