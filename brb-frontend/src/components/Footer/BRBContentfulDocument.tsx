import { useEffect, useState } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';
import { Entry } from 'contentful';

import { errorDocument, BRBContentfulDocumentType } from './ContentfulDocuments';

import { getContentfulEntryById } from '../../screens/_utilities/getContentfulEntry';

import { Spinner } from '../BRBSpinner/BRBSpinner';
import { Footer } from './Footer';

import './PrivacyPolicy.less';

const BRBContentfulDocument = ({ id, hideFooter }: { id: string, hideFooter?: boolean }) => {
  const [content, setContent] = useState<Document>();
  const [title, setTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchContent = async () => {
    const entry = await getContentfulEntryById(id);
    if (entry) {
      setTitle((entry as Entry<BRBContentfulDocumentType>).fields.title);
      setContent((entry as Entry<BRBContentfulDocumentType>).fields.body);
      setIsLoading(false);
    } else {
      setTitle('Error');
      setContent(errorDocument);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Container className="terms-policy">
        <Grid>
          <Grid.Row centered>
            <Grid.Column mobile={16} tablet={12} computer={10}>
              <h1>{title}</h1>
              {
                content
                  ? documentToReactComponents(content)
                  : <Spinner />
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      {!hideFooter && <Footer />}
    </>
  );
};

BRBContentfulDocument.defaultProps = {
  hideFooter: false,
};

export default BRBContentfulDocument;
