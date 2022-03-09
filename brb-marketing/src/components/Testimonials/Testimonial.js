/**
 *
 * Testimonial
 *
 */

import React from 'react'
import styled from 'styled-components'
import Colors from '../../themes/Colors'
import Logo from '../../images/icon-512x512.png'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #f0f1f6;
  box-shadow: 0 2px 2px 0 #efefef;
  padding: 16px 16px 33px 16px;
  border-radius: 6px;
  background-color: white;

  span {
    display: none;
  }

  h3 {
    font-size: 16px;
    color: #000000;
    letter-spacing: -0.81px;
    margin: 0 0 16px 0;
  }
`

const Stars = styled.p`
  color: #ffa700;
  font-size: 16px;
  margin: 0 0 16px 0;
`

const ReviewBody = styled.p`
  color: #1e1e1e !important;
  font-size: 14px;
  margin: 0 0 22px 0;
`

const Author = styled.p`
  color: ${Colors.red};
  font-size: 14px;
  margin: 0;

  span {
    display: inline-block;
  }
`

export class Testimonial extends React.PureComponent {
  render() {
    const { review } = this.props
    const star = '★'

    return (
      <Wrapper itemScope itemType="http://schema.org/Product">
        <meta itemProp="name" content="BeRightBack" />
        <meta itemProp="brand" content="BeRightBack" />
        <meta
          itemProp="description"
          content="The world's first travel subscription service. Pay monthly and get 3 trips to a surprise destination in Europe every 4 months."
        />
        <meta itemProp="image" content={`https://berightback.travel/${Logo}`} />
        <div itemProp="review" itemScope itemType="http://schema.org/Review">
          <meta itemProp="author" itemType="http://schema.org/Person" content={review.author} />
          <Stars
            itemProp="reviewRating"
            itemScope
            itemType="http://schema.org/Rating"
          >
            {star.repeat(review.rating)}
            <span itemProp="ratingValue">{review.rating}</span>
          </Stars>
          <h3>{review.reviewTitle}</h3>
          <ReviewBody itemProp="reviewBody">{review.reviewBody}</ReviewBody>
        </div>
        <Author>
          {review.author}, {review.location}
        </Author>
      </Wrapper>
    )
  }
}

export default Testimonial
