/**
 *
 * Article
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import Colors from '../../themes/Colors';

const Render = styled(ReactMarkdown)`
  width: 100%;
  padding: ${(props) => (props.noCenter ? '0' : '0px 20px 60px 20px')};
  max-width: 620px;
  margin-left: ${(props) => (props.noCenter ? '0' : 'auto')};
  margin-right: auto;
  line-height: 1.6;
  font-size: 18px;

  a {
    color: ${Colors.red};
    text-decoration: underline;
  }

  h1 {
    margin: 0;
    text-align: left;
    font-size: 42px;
    line-height: 42px;
    margin-bottom: 18px;
    letter-spacing: -3px;

    @media screen and (min-width: 600px) {
      font-size: 64px;
      line-height: 61px;
      margin-bottom: 22px;
    }
  }

  h2 {
    font-size: 32px;
    letter-spacing: -2px;
    line-height: 1em;
  }

  h3 {
    font-size: 23px;
    line-height: 1.2em;
    font-weight: 500;
  }

  ul {
    margin-bottom: 2em;
    li {
      margin-bottom: 1em;
    }
  }
`;

class Article extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { text, noCenter } = this.props;
    return (
      <div>
        <Render noCenter={noCenter} source={text} />
      </div>
    );
  }
}

Article.propTypes = {
  text: PropTypes.string,
};

Article.defaultProps = {
  text: '## Missing text',
};

export default Article;
