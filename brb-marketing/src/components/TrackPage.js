/**
 *
 * TrackPage
 *
 */

import React from 'react'
import waitForGlobal from '../utils/waitForGlobal'

class TrackPage extends React.PureComponent {
  componentDidMount() {
    waitForGlobal('analytics', 500).then(() => window.analytics.pageview())
  }

  render() {
    return <div />
  }
}

TrackPage.propTypes = {}

export default TrackPage
