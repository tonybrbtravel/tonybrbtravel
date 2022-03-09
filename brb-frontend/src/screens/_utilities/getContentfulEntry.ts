import { createClient } from 'contentful';

export const getContentfulEntryById = async (id: string) => {
  console.log(`getting ${id}`);
  try {
    console.log('creating client');
    const client = createClient({
      accessToken: process.env.REACT_APP_CONTENTFUL_KEY ?? '',
      space: process.env.REACT_APP_CONTENTFUL_SPACE ?? '',
    });
    console.log('created client');

    console.log('getting entry');
    const entry = await client.getEntry(id);
    console.log('got entry');
    console.log(entry);

    return entry;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export default {
  getContentfulEntryById,
};
