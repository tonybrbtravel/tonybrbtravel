/**
 *
 * NewsletterSignup
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import Colors from '../../themes/Colors'

const Wrapper = styled.div`
  background-color: black;
  color: white;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-weight: 800;
    margin: 0 20px;
  }

  span {
    font-size: 24px;
  }

  @media screen and (min-width: 500px) {
    flex-direction: row;
  }
`

const FormWrap = styled.div`
  display: flex;
  flex-direction: row;

  label {
    display: none;
  }

  input {
    border-bottom: 1px solid white;
  }

  button {
    background-color: ${Colors.red};
    padding: 6px 12px;
    border-radius: 3px;
    margin: 0 12px;
  }
`

// a basic form
const CustomForm = ({ status, message, onValidated }) => {
  let email
  const submit = () =>
    email &&
    email.value.indexOf('@') > -1 &&
    onValidated({ EMAIL: email.value })

  return (
    <div>
      <FormWrap>
        <label>Enter your email to subscribe to our newsletter</label>
        <input
          ref={node => (email = node)}
          type="email"
          placeholder="Your email"
        />
        <br />
        <button onClick={submit}>Join</button>
      </FormWrap>
      {status === 'sending' && (
        <div style={{ color: Colors.red }}>sending...</div>
      )}
      {status === 'error' && (
        <div
          style={{ color: 'red' }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === 'success' && (
        <div
          style={{ color: 'lime' }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
    </div>
  )
}

class NewsletterSignup extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    const url =
      'https://berightback.us18.list-manage.com/subscribe/post?u=99ac80c47af56bf97a7f8ef46&amp;id=26072e5392'
    return (
      <Wrapper>
        <p>
          <span role="img" aria-label="Map">
            🗺
          </span>{' '}
          Join the #AFK travel club
        </p>
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }) => (
            <CustomForm
              status={status}
              message={message}
              onValidated={formData => subscribe(formData)}
            />
          )}
        />
      </Wrapper>
    )
  }
}

NewsletterSignup.propTypes = {
  status: PropTypes.string,
  message: PropTypes.string,
  onValidated: PropTypes.string,
}

export default NewsletterSignup
