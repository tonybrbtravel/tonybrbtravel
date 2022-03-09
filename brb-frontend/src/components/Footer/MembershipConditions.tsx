import BRBContentfulDocument from './BRBContentfulDocument';

const contentfulEntryId = 'YzTCon4d0KGwCXTRowb7K';

const MembershipConditions = ({ hideFooter }: { hideFooter?: boolean }) => (
  <BRBContentfulDocument id={contentfulEntryId} hideFooter={hideFooter} />
);

MembershipConditions.defaultProps = {
  hideFooter: false,
};

export default MembershipConditions;
