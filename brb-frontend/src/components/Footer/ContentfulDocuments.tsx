import { Document, BLOCKS } from '@contentful/rich-text-types';

export type BRBContentfulDocumentType = {
  body: Document;
  title: string;
}

export const errorDocument: Document = {
  nodeType: BLOCKS.DOCUMENT,
  content: [
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [
        {
          nodeType: 'text',
          value: 'The document could not be retrieved at this time, please try again later.',
          data: {},
          marks: [],
        },
      ],
      data: {},
    },
  ],
  data: {},
};
