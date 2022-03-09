import React from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';

import Colors from '../../../themes/Colors';
import Breakpoints from '../../../themes/Breakpoints';
import Metrics, { unitless } from '../../../themes/Metrics';

import selectChevron from '../../../images/icons/selectChevron.svg';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: auto;
  text-align: center;
  margin: 0 auto ${Metrics.bigSpacer};

  @media (min-width: ${Breakpoints.medium}) {
    margin: 0 auto ${Metrics.smallSpacer};
    flex-direction: row;
    padding: ${Metrics.tinySpacer};
    color: ${Colors.darkBlue};
    background-color: ${Colors.white};
    border-radius: 5px;
  }

  @media (min-width: ${Breakpoints.medium}) {
    &:after {
      content: '';
      display: block;
      width: 1.5rem;
      height: 100%;
      margin-left: 1em;
      background-image: url(${selectChevron});
      background-size: contain;
      background-position: center center;
      background-repeat: no-repeat;
      flex-shrink: 0;
      flex-grow: 0;
    }
  }
`;

const Icon = styled.div`
  display: block;
  margin: 0 auto;
  width: 3em;
  flex-shrink: 0;
  flex-grow: 0;

  @media (min-width: ${Breakpoints.medium}) {
    width: 2em;
    color: ${Colors.darkBlue};
    margin: 0 ${Metrics.tinySpacer} 0 0;
  }
`;

const Question = styled.div`
  display: block;
  flex-grow: 1;

  p.question {
    font-size: 1.2em;
    text-align: center;
    margin: 10px 0;
  }

  p.answer {
    text-align: left;
    display: none;
  }

  select {
    width: 100%;
    font-size: 1.2em;
    padding: ${unitless(Metrics.smallSpacer)/2}px ${Metrics.tinySpacer};
    border-radius: 4px;
    background-color: ${Colors.white};
  }

  @media (min-width: ${Breakpoints.medium}) {
    margin: 0;

    p.question {
      text-align: left;
      color: ${Colors.red};
      font-size: 1em;
      margin: 0 0 10px;
    }

    p.answer {
      display: block;
    }

    select {
      font-size: 1em;
      padding: 0;
      margin: 0;
      border-style: none;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
`;

const Selector = ({ className, icon, question, min = 1, max = 10, step = 1, defaultValue, options, disabled, suffixes, changeHandler }) => {
  return <Wrapper className={className}>

    <Icon image={icon}>
      {parse(icon)}
    </Icon>

    <Question>

      <p className="question">{question}</p>
      <p className="answer">{defaultValue} {suffixes && ' ' + (defaultValue === 1 ? suffixes.singular : suffixes.plural)}</p>

      {/* eslint-disable-next-line jsx-a11y/no-onchange */}
      <select onChange={changeHandler} defaultValue={defaultValue} disabled={disabled}>

        { options && options.map( (option, index) => <option key={index} value={option}>{option}</option>)}

        { !options && [...Array(Math.floor((max - min) / step) + 1)].map((_, index) => {
          const val = index * step + min;
          return (
            <option key={index} value={val}>
              {val} {suffixes && ' ' + (val === 1 ? suffixes.singular : suffixes.plural)}
            </option>
          );
        }
        )}

      </select>

    </Question>

  </Wrapper>;
};

export default Selector;
