/**
 *
 * TabComponent
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Colors from '../../themes/Colors'
import { scaleIn } from '../../themes/animations'

import bg from '../../images/together-bg.jpg'

import H3 from '../../components/H3'

const Wrapper = styled.div`
  width: 100%;
  max-width: 960px;
  border-radius: 0px;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-width: 600px) {
    border-radius: 6px;
  }
`

const TabBar = styled.div`
  display: flex;
`

const Content = styled.div`
  width: 100%;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  background: url(${bg});
  background-size: cover;
  display: flex;
  flex-direction: column;
  background-position: 50% 50%;
  padding: 30px 20px 0px 20px;
  color: white;

  @media screen and (min-width: 600px) {
    flex-direction: row;
  }

  img {
    width: 100%;
    height: auto;
    animation: ${scaleIn} 0.2s ease-in-out backwards;
  }

  div {
    width: 100%;

    @media screen and (min-width: 600px) {
      width: 50%;
    }
  }

  p {
    font-size: 18px;
  }
`

const Tab = styled.div`
  flex-grow: 1;
  text-align: center;
  border-bottom: 1px solid ${Colors.red};
  background-color: ${props => (props.selected ? Colors.red : '#f1f1f1')};
  color: ${props => (props.selected ? 'white' : Colors.red)};
  font-size: 18px;
  padding: 12px;

  &:hover {
    cursor: pointer;
  }
`

class TabComponent extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.state = { selectedTab: 0 }
    this.updateTab = this.updateTab.bind(this)
  }

  updateTab(sender) {
    this.setState({ selectedTab: sender })
  }

  render() {
    const { content } = this.props
    return (
      <Wrapper>
        <TabBar>
          {content.map((item, index) => (
            <Tab
              key={item.tabTitle}
              selected={this.state.selectedTab === index}
              onClick={() => this.updateTab(index)}
            >
              {item.tabTitle}
            </Tab>
          ))}
        </TabBar>
        <Content>
          <div>
            <H3>{content[this.state.selectedTab].title}</H3>
            <p>{content[this.state.selectedTab].text}</p>
          </div>
          <div>
            <img
              src={content[this.state.selectedTab].image.url}
              alt={content[this.state.selectedTab].image.alt}
            />
          </div>
        </Content>
      </Wrapper>
    )
  }
}

TabComponent.propTypes = {
  content: PropTypes.array,
}

export default TabComponent
