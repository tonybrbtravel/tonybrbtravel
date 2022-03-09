import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import parse from 'html-react-parser';
import Collapsible from 'react-collapsible';
import ReactCodeInput from 'react-verification-code-input';
import './CouponCode.less';

import {
  getPrices,
  subscriptionFormUpdate,
  createStripeSession,
  chosenCouponUpdate,
} from './subscriptionCalculatorSlice';

import Metrics from '../../../themes/Metrics';
import Colors, { rgba } from '../../../themes/Colors';
import Breakpoints from '../../../themes/Breakpoints';
import Decorations from '../../../themes/Decorations';

import Selector from './Selector';
import { BRBButton } from '../../../components/BRBButton/BRBButton';

import checkboxSvg from '../../../images/icons/checkbox.svg';
import placeholderImage from '../../../images/classicImg.jpg';
import Spacer from '../../../components/Spacer';
import { trackSubscriptionIntent } from '../../_utilities/tracking';

// We inline these so we can use currentColor to vary the dark/light across breakpoints
const travellersSelectSvg = '<svg viewBox="0 0 41 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.2334 14.8779C16.1021 14.8779 19.2334 11.7503 19.2334 7.8862C19.2334 4.02205 16.1021 0.894531 12.2334 0.894531C8.36465 0.894531 5.2334 4.02205 5.2334 7.8862C5.2334 11.7503 8.36465 14.8779 12.2334 14.8779ZM17.0334 16.8755H16.5146C15.2146 17.4997 13.7709 17.8743 12.2334 17.8743C10.6959 17.8743 9.2584 17.4997 7.95215 16.8755H7.4334C3.4584 16.8755 0.233398 20.0966 0.233398 24.0669V25.8648C0.233398 27.519 1.57715 28.8612 3.2334 28.8612H21.2334C22.8896 28.8612 24.2334 27.519 24.2334 25.8648V24.0669C24.2334 20.0966 21.0084 16.8755 17.0334 16.8755Z" fill="currentColor"/><path d="M30.7146 14.8783C34.0271 14.8783 36.7146 12.194 36.7146 8.88544C36.7146 5.57688 34.0271 2.89258 30.7146 2.89258C27.4021 2.89258 24.7146 5.57688 24.7146 8.88544C24.7146 12.194 27.4021 14.8783 30.7146 14.8783ZM33.7146 16.8759H33.4771C32.6084 17.1756 31.6896 17.3753 30.7146 17.3753C29.7396 17.3753 28.8209 17.1756 27.9521 16.8759H27.7146C26.4396 16.8759 25.2646 17.2442 24.2334 17.8373C25.7584 19.4791 26.7146 21.6577 26.7146 24.0673V26.4645C26.7146 26.6018 26.6834 26.7329 26.6771 26.864H37.7146C39.3709 26.864 40.7146 25.5219 40.7146 23.8676C40.7146 20.0034 37.5834 16.8759 33.7146 16.8759Z" fill="#E94560"/></svg>';
const nightsSelectSvg = '<svg viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.72552 9.95576V34.8473C2.72552 35.5075 2.98809 36.1406 3.45545 36.6074C3.92281 37.0742 4.5567 37.3365 5.21765 37.3365H35.1232C35.7841 37.3365 36.418 37.0742 36.8853 36.6074C37.3527 36.1406 37.6153 35.5075 37.6153 34.8473V9.95576H2.72552ZM5.21765 2.48828C3.89574 2.48828 2.62798 3.01278 1.69325 3.9464C0.758523 4.88001 0.233398 6.14627 0.233398 7.4666L0.233398 34.8473C0.233398 36.1677 0.758523 37.4339 1.69325 38.3675C2.62798 39.3012 3.89574 39.8257 5.21765 39.8257H35.1232C36.4451 39.8257 37.7128 39.3012 38.6475 38.3675C39.5823 37.4339 40.1074 36.1677 40.1074 34.8473V7.4666C40.1074 6.14627 39.5823 4.88001 38.6475 3.9464C37.7128 3.01278 36.4451 2.48828 35.1232 2.48828H5.21765Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8.95505 0C9.28552 0 9.60246 0.131125 9.83615 0.364529C10.0698 0.597933 10.2011 0.914496 10.2011 1.24458V2.48916C10.2011 2.81924 10.0698 3.1358 9.83615 3.36921C9.60246 3.60261 9.28552 3.73374 8.95505 3.73374C8.62457 3.73374 8.30763 3.60261 8.07395 3.36921C7.84027 3.1358 7.70898 2.81924 7.70898 2.48916V1.24458C7.70898 0.914496 7.84027 0.597933 8.07395 0.364529C8.30763 0.131125 8.62457 0 8.95505 0V0ZM31.3842 0C31.7146 0 32.0316 0.131125 32.2653 0.364529C32.499 0.597933 32.6302 0.914496 32.6302 1.24458V2.48916C32.6302 2.81924 32.499 3.1358 32.2653 3.36921C32.0316 3.60261 31.7146 3.73374 31.3842 3.73374C31.0537 3.73374 30.7368 3.60261 30.5031 3.36921C30.2694 3.1358 30.1381 2.81924 30.1381 2.48916V1.24458C30.1381 0.914496 30.2694 0.597933 30.5031 0.364529C30.7368 0.131125 31.0537 0 31.3842 0V0Z" fill="currentColor"/><path d="M28.5808 17.5568C28.5808 17.1855 28.7285 16.8294 28.9913 16.5668C29.2542 16.3042 29.6107 16.1567 29.9825 16.1567H32.786C33.1577 16.1567 33.5143 16.3042 33.7771 16.5668C34.04 16.8294 34.1877 17.1855 34.1877 17.5568V20.3569C34.1877 20.7282 34.04 21.0844 33.7771 21.3469C33.5143 21.6095 33.1577 21.757 32.786 21.757H29.9825C29.6107 21.757 29.2542 21.6095 28.9913 21.3469C28.7285 21.0844 28.5808 20.7282 28.5808 20.3569V17.5568ZM20.1704 17.5568C20.1704 17.1855 20.3181 16.8294 20.5809 16.5668C20.8438 16.3042 21.2004 16.1567 21.5721 16.1567H24.3756C24.7473 16.1567 25.1039 16.3042 25.3668 16.5668C25.6296 16.8294 25.7773 17.1855 25.7773 17.5568V20.3569C25.7773 20.7282 25.6296 21.0844 25.3668 21.3469C25.1039 21.6095 24.7473 21.757 24.3756 21.757H21.5721C21.2004 21.757 20.8438 21.6095 20.5809 21.3469C20.3181 21.0844 20.1704 20.7282 20.1704 20.3569V17.5568ZM6.15308 25.9572C6.15308 25.5859 6.30076 25.2297 6.56363 24.9672C6.82651 24.7046 7.18305 24.5571 7.55481 24.5571H10.3583C10.73 24.5571 11.0866 24.7046 11.3494 24.9672C11.6123 25.2297 11.76 25.5859 11.76 25.9572V28.7573C11.76 29.1286 11.6123 29.4847 11.3494 29.7473C11.0866 30.0099 10.73 30.1574 10.3583 30.1574H7.55481C7.18305 30.1574 6.82651 30.0099 6.56363 29.7473C6.30076 29.4847 6.15308 29.1286 6.15308 28.7573V25.9572ZM14.5635 25.9572C14.5635 25.5859 14.7111 25.2297 14.974 24.9672C15.2369 24.7046 15.5934 24.5571 15.9652 24.5571H18.7687C19.1404 24.5571 19.497 24.7046 19.7598 24.9672C20.0227 25.2297 20.1704 25.5859 20.1704 25.9572V28.7573C20.1704 29.1286 20.0227 29.4847 19.7598 29.7473C19.497 30.0099 19.1404 30.1574 18.7687 30.1574H15.9652C15.5934 30.1574 15.2369 30.0099 14.974 29.7473C14.7111 29.4847 14.5635 29.1286 14.5635 28.7573V25.9572Z" fill="#E94560"/></svg>';

// Fallback settings and content (prefers Contentful query)
const defaults = {
  content: {
    title: 'Your BRB subscription',
    text: 'Subscribe now and <strong>start saving</strong>.',
    image: placeholderImage,
    list: {
      title: 'Includes:',
      items: [
        'As many trips as you want',
        'Choose trip duration (min. 2 nights)',
        'Flights & 3-5★ hotel included',
        'ATOL protected',
      ],
    },
  },
  settings: {
    defaultPrice: 4999, // pence
    minTravellers: 1,
    maxTravellers: 4,
    stepTravellers: 1,
    defaultTravellers: 1,
    minNights: 4,
    maxNights: 14,
    stepNights: 2,
    defaultNights: 6,
    firstPersonCostPerNight: 99.98, // Not used
    extraPersonCostPerNight: 80.00, // Not used
  },
};

const TextInputCoupon = styled.div`
  p.input {
    border-radius:5px;
  }
`;

const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  margin-top: 5px;
  background: none;
  border-bottom: 1px solid #fff;
  ::placeholder {
    color: #fff;
    font-size: 14px;
  }
`;

const Title = styled.div<{
  image: string;
  split: string;
}>`
  position: relative;
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  background-image: none;
  padding: 0 ${Metrics.tinySpacer};

  h2 {
    font-size: 2.5rem;
    margin-top: 0;
    color: ${Colors.brbOffwhite};

    span, em, strong {
      color: ${Colors.brbPink};
    }
  }

  @media (min-width: ${Breakpoints.medium}) {
    padding: ${Metrics.bigSpacer};
    background-color: ${Colors.brbBlue};
    background-image: ${(props) => (props.image ? `url(${props.image})` : 'none')};
    flex-basis: 50%;
    flex-grow: 0;

    h2 {
      font-size: 3rem;
      text-shadow: ${(props) => (props.image ? Decorations.shadow.light : 'none')};
      z-index: 1;

    }

    &:after {
      content: ${(props) => (props.image ? '""' : 'none')};
      background-color: ${rgba(Colors.brbBlue, 0.4)};
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

`;

const Wrapper = styled.div`
  background-color: ${Colors.brbBlue};
  color: ${Colors.brbOffwhite};
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: ${Metrics.smallSpacer};

  ul {
    display: inline-block;
    text-align: left;
  }

  @media (min-width: ${Breakpoints.medium}) {
    text-align: left;
    flex-direction: row-reverse;
    padding: 0;
  }
`;

const Content = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${Breakpoints.medium}) {
    max-width: 40rem;
    padding: ${Metrics.bigSpacer};

    /* Handle order changing between breakpoints */
    & > div:nth-child(2) { order: -1; }
  }

  select {
    color: ${Colors.brbBlue};
  }

  p {
    margin: 0;
  }

  p.totalHeading {
    margin: 0;
    font-size: 1.2rem;
  }

  ul {
    padding: 0;
    padding-left: 2em;
  }

  li {
    list-style-type: none;
    line-height: 1.2;
    position: relative;
    margin-bottom: 1em;

    &:before {
      content: '';
      background-image: url(${checkboxSvg});
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      margin-right: .25em;
      height: 1.2em;
      width: 1.2em;
      display: block;
      position: absolute;
      left: -2em;
    }
  }
`;

const SubscriptionDetails = styled.div`
  margin: ${Metrics.smallSpacer} 0;
`;

const Price = styled.p`
  font-size: 1.5rem;
  color: ${Colors.brbPink};
  font-weight: 700;
  margin-bottom: ${Metrics.tinySpacer};

  span {
    font-size: 1.5em;
  }

  @media (min-width: ${Breakpoints.medium}) {
    font-size: 2rem;
    margin-bottom: ${Metrics.smallSpacer};
  }
`;

const Selectors = styled.div`
  position: relative;
  display: flex;
  margin: ${Metrics.smallSpacer} auto 0;
  max-width: 300px;
  flex-direction: column;

  @media (min-width: ${Breakpoints.medium}) {
    margin: 0;
    max-width: none;
  }
`;

const List = styled.div`
  h3 {
    margin: 0;
  }
`;

const SubscriptionCalculatorPanel = () => {
  const { content } = defaults;
  const { settings } = defaults;

  const dispatch = useDispatch();
  const prices = useSelector((state: any) => state?.subscription.prices);
  const [travellers, setTravellers] = useState<number>(settings.defaultTravellers);
  const [nights, setNights] = useState<number>(settings.defaultNights);
  const [price, setPrice] = useState<number>(settings.defaultPrice);

  useEffect(() => {
    dispatch(getPrices(true));
  }, []);

  useEffect(() => {
    const key = `${travellers} traveller / ${nights} nights`;
    if (prices && prices[key]) {
      const priceObject = prices[key];
      setPrice(priceObject.unitAmount);
      dispatch(subscriptionFormUpdate({ price: priceObject.id }));
    }
  }, [travellers, nights, prices]);

  const handleUpdateNights = (event: any) => {
    setNights(event.target.value);
  };

  const handleUpdateTravellers = (event: any) => {
    setTravellers(event.target.value);
  };

  const handleCouponChange = (val: any) => {
    dispatch(chosenCouponUpdate({ coupon: val }));
  };

  const onSubscribeNow = () => {
    trackSubscriptionIntent({
      travellers,
      nights,
      value: price / 100,
    });
    dispatch(createStripeSession(true));
  };

  return (
    <>
      <Wrapper>

        <Title image={content.image} split=".5">
          <h2 className="simple-animate-in">
            {parse(content.text)}
          </h2>
        </Title>

        <Content>

          {/* Options */}
          <Selectors>

            <Selector
              className="simple-animate-in"
              icon={travellersSelectSvg}
              question="How many travellers?"
              min={settings.minTravellers}
              max={settings.maxTravellers}
              step={settings.stepTravellers}
              defaultValue={travellers}
              suffixes={{ singular: 'traveller', plural: 'travellers' }}
              changeHandler={handleUpdateTravellers}
            />

            <Selector
              className="simple-animate-in"
              icon={nightsSelectSvg}
              question="How many nights per year?"
              min={settings.minNights}
              max={settings.maxNights}
              step={settings.stepNights}
              defaultValue={nights}
              suffixes={{ singular: 'night', plural: 'nights' }}
              changeHandler={handleUpdateNights}
            />

          </Selectors>
          {/* End options */}

          {/* Calculated price */}
          <SubscriptionDetails>
            <p className="totalHeading simple-animate-in">
              {parse(content.title)}
            </p>

            <Price className="simple-animate-in">
              <span>
                £
                {price / 100}
              </span>
              &nbsp;/&nbsp;month
            </Price>
          </SubscriptionDetails>
          {/* End calculated price */}

          {/* List */}
          <List>
            <h3 className="simple-animate-in">{content.list.title}</h3>
            <ul className="simple-animate-in">
              {content.list.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </List>
          {/* End list */}

          <Spacer height={Metrics.smallSpacer} />

          {/* CTA */}
          <BRBButton onClick={onSubscribeNow}>
            Subscribe now &rarr;
          </BRBButton>
          <Spacer height={Metrics.veryTinySpacer} />
          <p style={{textAlign: "center"}}>
          <Collapsible trigger="Apply coupon" triggerStyle={{cursor: "pointer", textAlign: "center"}}>
            <p style={{justifyContent: "center"}}>
              <ReactCodeInput
                type="text"
                fields={7}
                onComplete={(val: string) => handleCouponChange(val)}
              />
            </p>
          </Collapsible>
          </p>
          {/* End CTA */}

        </Content>

      </Wrapper>

    </>
  );
};

export default SubscriptionCalculatorPanel;
