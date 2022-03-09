import { Footer } from '../../components/Footer/Footer';
import Spacer from '../../components/Spacer';
import Colors from '../../themes/Colors';
import Metrics from '../../themes/Metrics';
import Banner from './Banner/Banner';
import Content from './Contents/Content';

export const HomePage = () => (
  <div className="addtrip">
    <Banner />

    {/* <Spacer height={Metrics.navHeight} backgroundColor={Colors.brbBlue} /> */}

    <Content />
    <Footer />
  </div>
);
