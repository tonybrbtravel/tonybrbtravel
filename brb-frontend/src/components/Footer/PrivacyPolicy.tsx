import BRBContentfulDocument from './BRBContentfulDocument';

const contentfulEntryId = 'O9UDtF4XgE3rhwUxjL0vU';

export const PrivacyPolicy = ({ hideFooter = false }: { hideFooter?: boolean }) => (
  <BRBContentfulDocument id={contentfulEntryId} hideFooter={hideFooter} />
);

PrivacyPolicy.defaultProps = {
  hideFooter: false,
};

export default PrivacyPolicy;
