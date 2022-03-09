import { Header, Modal, Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BRBButton } from '../../../../components/BRBButton/BRBButton';
import './Topup.less';
import close from '../../../../assets/images/close.svg';
import BRBPinkText from '../../../../components/BRBPinkText';
import {
  createStripeSession, createTripPaymentSession, subscriptionFormUpdate, tripPaymentFormUpdate,
} from '../../../../screens/_panels/SubscriptionCalculatorPanel/subscriptionCalculatorSlice';
import { lockTripStateUpdate } from '../contentSlice';
import useApiQuery from '../../../../Hooks/ApiQuery';
import BrbEndPoints from '../../../../Api/BrbEndPoints';
import { getMyTravelSavings } from '../../../../Api/dashboardApi';

export interface ITripPriceInfo {
  availableBal: number;
  tripPrice: number;
  tripTopupAmt: number;
  additionalTravellerPrice: number;
  topUp?: number;
}
export interface ITopup {
  isOpenPopup: boolean;
  topupAmt: ITripPriceInfo;
  onClosePopup: () => void;
  userSubscriptionStatus: boolean;
}

export const Topup = ({
  isOpenPopup, topupAmt, onClosePopup, userSubscriptionStatus,
}: ITopup) => {
  // console.log("topupAmt",topupAmt);

  const { data: travelSavings } = useApiQuery<any>(
    ['accSavings'],
    { url: BrbEndPoints.myTravelSavings },
    getMyTravelSavings,
  );

  // console.log('travel savings',travelSavings);

  const tripTotalCost = Number(topupAmt.topUp) + Number(topupAmt.additionalTravellerPrice);
  const dispatch = useDispatch();
  const tripConfiguration = useSelector((state: any) => state.content.tripConfiguration ?? {});
  const proceedToPay = () => {
    const form: any = { ...tripConfiguration };
    form.topUp = topupAmt.topUp;
    form.extraTravllersPrice = topupAmt.additionalTravellerPrice;
    form.activities = null;
    dispatch(tripPaymentFormUpdate(form));
    dispatch(createTripPaymentSession(true));
  };

  return (
    <>
      <Modal size="tiny" centered open={isOpenPopup} className="topup-payment">
        <Modal.Content className="topup-payment-content">
          <Header>
            <Image
              floated="right"
              size="mini"
              src={close}
              onClick={onClosePopup}
            />
          </Header>

          <div className="scroller-div">
            <div className="topup-price">
              {!userSubscriptionStatus ? (
                <>
                  <div className="topup-header-content">
                    One-Off Payment
                  </div>
                  <div className="trip-price">
                    &pound;
                    {Number(tripTotalCost / 100).toFixed(2)}
                  </div>
                </>
              ) : (
                <>
                  <div className="trip-balance-details">
                    <p>
                      Trip Price: &pound;
                      {Number(topupAmt.tripPrice / 100).toFixed(2)}
                    </p>
                    <p>
                      Available Balance: &pound;
                      {Number((topupAmt.tripPrice - (topupAmt?.topUp || 0)) / 100).toFixed(2)}
                    </p>
                    <p className="big">
                      Top-Up Required:
                    </p>
                    <p className="big price">
                      &pound;
                      {Number(tripTotalCost / 100).toFixed(2)}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="text-left">
              <ul className="trip-offers">
                <li>One-off trip</li>
                <li>Return flights</li>
                <li>
                  3-5
                  <Icon name="star" />
                  {' '}
                  Hotel
                </li>
                <li>ATOL Protected</li>
                <li>No Cancellation</li>
              </ul>
            </div>

            <div className="proceed-to-pay">
              <BRBButton onClick={proceedToPay}>Proceed to Pay</BRBButton>
            </div>

            {
              !userSubscriptionStatus ? (
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                  <Link to="/dashboard#subscribe">
                    <BRBPinkText>Subscribe to save 25%</BRBPinkText>
                  </Link>
                </div>
              ) : (
                <></>
              )
            }

          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};
