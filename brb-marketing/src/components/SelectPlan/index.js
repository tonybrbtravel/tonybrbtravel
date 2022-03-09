/**
 *
 * SelectPlan
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropType from 'prop-types';
import Plans from './plans';

import PlanBox from '../../components/PlanBox';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px 20px;
  margin-top: -20px;

  @media screen and (min-width: 580px) {
    justify-content: center;
    padding: 20px 0px;
    flex-direction: row;
  }
`;

class SelectPlan extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  handleOptionChange = (plan) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(plan.name);
    }
  };

  render() {
    const { single, selected, getStarted } = this.props;

    if (getStarted) {
      return (
        <Wrapper>
          {Plans &&
            Plans.map(
              (Plan, index) =>
                !Plan.single && (
                  <PlanBox
                    key={Plan.name}
                    plan={Plan}
                    index={index}
                    selected
                    getStarted
                  />
                ),
            )}
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        {Plans &&
          Plans.map(
            (Plan, index) =>
              ((Plan.single && single) || !Plan.single) && (
                <PlanBox
                  key={Plan.name}
                  plan={Plan}
                  select={() => this.handleOptionChange(Plan)}
                  index={index}
                  selected={selected === Plan.name}
                />
              ),
          )}
      </Wrapper>
    );
  }
}

SelectPlan.propTypes = {
  onClick: PropType.any,
  selected: PropType.bool,
  getStarted: PropType.bool,
};

export default SelectPlan;
