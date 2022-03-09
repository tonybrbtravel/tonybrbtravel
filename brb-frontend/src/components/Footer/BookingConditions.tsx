import BRBContentfulDocument from './BRBContentfulDocument';

const contentfulEntryId = '1h58QQxbNDruCZw2ejXQpl';

const Terms = ({ hideFooter = false }: { hideFooter: boolean }) => (
  <BRBContentfulDocument id={contentfulEntryId} hideFooter={hideFooter} />
);

export default Terms;
