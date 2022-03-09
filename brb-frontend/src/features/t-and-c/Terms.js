/*
 * PrivacyPolicy
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Article from '../../components/article/Article';
import Spacer from '../../components/Spacer';
import Metrics from '../../themes/Metrics';
import TermsAndConditionsMD from './termsAndConditions.md';
import PrivacyPolicyMD from './privacyPolicy.md';

function TermsAndConditions() {
  let policy = 'This is the policy';
  if (window.location.pathname === '/terms-and-conditions') {
    policy = TermsAndConditionsMD;
  } else if (window.location.pathname === '/privacy-policy') {
    policy = PrivacyPolicyMD;
  }

  return (
    <div>
      <Spacer height={Metrics.bigSpacer} />
      <Article text={policy} />
    </div>
  );
}

export default TermsAndConditions;
