import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import parse from 'html-react-parser';

import Metrics, { unitless } from '../../themes/Metrics';
import Colors, { rgba } from '../../themes/Colors';
import Decorations from '../../themes/Decorations';
import Timings from '../../themes/Timings';

const defaultContent = {
  active: true,
  text: "Questions about COVID-19? <a target=\"_blank\" href=\"https://intercom.help/brb/en/collections/2172840-coronavirus-outbreak-how-it-affects-brb-what-to-do\">Visit our help center</a>",
  dismissalPeriodDays: 1,
};

const query = graphql`{
  contentfulConfigurationItem(name: {eq: "Notice banner"}) {
    data {
      active
      text
    }
  }
}`;

const processQueryResult = (queryData) => {
  const content = queryData.contentfulConfigurationItem.data || {};
  return content;
};

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 100000;
  background-color: ${rgba(Colors.red, .9)};
  color: ${Colors.white};
  padding: ${unitless(Metrics.tinySpacer)/2 + 'px'};
  box-shadow: ${Decorations.shadow.default};

  p {
    font-size: .9rem;
    max-width: 30em;
    margin: 0;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  margin-left: ${Metrics.smallSpacer};
  border: 1.5px solid ${Colors.white};
  border-radius: 2px;
  background-color: transparent;
  cursor: pointer;
  padding: 2px 4px;
  transition: box-shadow ${Timings.transition.default} ease-in-out;

  &:hover {
    box-shadow: ${Decorations.shadow.default};
  }
`;

const localStorageKey = 'noticeBannerDismissed';

const NoticeBanner = () => {

  const [dismissed, setDismissed] = useState(false);

  const dismissBanner = () => {
    localStorage.setItem(localStorageKey, new Date().toISOString());
    setDismissed(true)
  };

  const queryResult = useStaticQuery(query);
  const content = { ...defaultContent };
  if (queryResult.contentfulConfigurationItem) {
    const processedData = processQueryResult(queryResult);
    Object.assign(content, processedData);
  }

  useEffect(() => {
    const yesterday = new Date(Date.now() - content.dismissalPeriodDays * 86400000);
    const dismissed = new Date(localStorage.getItem(localStorageKey));

    if (yesterday < dismissed) {
      setDismissed(true);
    }
  }, [content.dismissalPeriodDays]);

  return (content.active && !dismissed) ?

    <Wrapper>

      <p>
        {parse(content.text || 'Message text')}
      </p>

      <Button onClick={dismissBanner}>
        Dismiss
      </Button>

    </Wrapper>

  : null;

}

export default NoticeBanner;
