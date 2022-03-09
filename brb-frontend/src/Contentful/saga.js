import { put, select, takeLatest, apply } from 'redux-saga/effects';
import { createClient } from 'contentful';

import {
  selectClient,
  contentfulCountries,
  contentfulFetchCountries,
  contentfulReviews,
  contentfulFetchReviews,
  contentfulCityGuides,
  contentfulFetchCityGuides,
  contentfulCityBlogs,
  contentfulFetchCityBlogs,
  contentfulCities,
  contentfulFetchCities,
} from './contentfulSlice';

export function* fetchCountries() {
  try {
    const contentfulClient = yield select(selectClient());
    const response = yield apply(
      contentfulClient,
      contentfulClient.getEntries,
      [{ content_type: 'countries' }],
    );
    const countries = response.items.map((item) => ({
      id: item.sys.id,
      country: item.fields.countryName,
      emoji: item.fields.emoji,
      cities: item.fields.cities.map((city) => ({
        city: city.fields.cityName,
        byLine: city.fields.byLine,
        shortDescription: city.fields.shortDescription,
        smallImage: city.fields.smallImage
          && city.fields.smallImage.fields.file
          && `https:${city.fields.smallImage.fields.file.url}`,
      })),
    }));

    yield put(contentfulCountries(countries));
  } catch (err) {
    console.log(err);
  }
}

export function* fetchUserReviews() {
  try {
    const client = createClient({
      accessToken: process.env.REACT_APP_CONTENTFUL_KEY ?? '',
      space: process.env.REACT_APP_CONTENTFUL_SPACE ?? '',
    });

    const contentfulClient = client;// yield select(selectClient());
    const response = yield apply(
      contentfulClient,
      contentfulClient.getEntries,
      [{ content_type: 'configurationItem' }],
    );
    const reviews = response.items.filter((item) => item.fields.name === 'Block - reviews').map((reviewsInfo) => reviewsInfo.fields.data.items ?? [])[0];

    const reviewsInfo = reviews.length ? reviews.slice(0, 3) : [];
    // console.log('confg item', reviews);
    yield put(contentfulFetchReviews(reviewsInfo));
  } catch (err) {
    console.log('error API', err);
  }
}

export function* fetchCityGuides() {
  try {
    const client = createClient({
      accessToken: process.env.REACT_APP_CONTENTFUL_KEY ?? '',
      space: process.env.REACT_APP_CONTENTFUL_SPACE ?? '',
    });

    const contentfulClient = client;

    const allGuides = [];

    let allResultsRetrieved = false;
    let skip = 0;

    while (!allResultsRetrieved) {
      const response = yield apply(
        contentfulClient,
        contentfulClient.getEntries,
        [{ content_type: 'cityGuide' }],
      );

      allGuides.push(...response.items.map((item) => ({
        id: item.sys.id,
        title: item.fields.cityName,
        subtitle: item.fields.title,
        description: item.fields.introduction,
        slug: item.fields.slug,
        isPdf: item.fields.isPdf,
        pdfGuide: item.fields.pdfGuide?.fields?.file?.url,
        createdAt: item.sys.createdAt,
        featuredImage: item.fields.featuredImage?.fields?.file?.url,
      })));

      skip += response.limit;

      if (skip > response.total) {
        allResultsRetrieved = true;
      }
    }

    yield put(contentfulFetchCityGuides(allGuides));
  } catch (err) {
    console.log(err);
  }
}

export function* fetchCityBlogs() {
  try {
    const client = createClient({
      accessToken: process.env.REACT_APP_CONTENTFUL_KEY ?? '',
      space: process.env.REACT_APP_CONTENTFUL_SPACE ?? '',
    });

    const contentfulClient = client;

    const allBlogs = [];

    let allResultsRetrieved = false;
    let skip = 0;

    while (!allResultsRetrieved) {
      const response = yield apply(
        contentfulClient,
        contentfulClient.getEntries,
        [{
          content_type: 'blogArticle',
          skip,
        }],
      );

      allBlogs.push(...response.items.filter((item) => item.metadata.tags.length > 0).map((item) => ({
        id: item.sys.id,
        title: item.fields.title,
        shortDescription: item.fields.shortDescription,
        author: item.fields.author,
        slug: item.fields.slug,
        createdAt: item.sys.createdAt,
        heroImage:
          item.fields.heroImage
          && item.fields.heroImage.fields.file
          && `https:${item.fields.heroImage.fields.file.url}`,
      })));

      skip += response.limit;

      if (skip > response.total) {
        allResultsRetrieved = true;
      }
    }

    yield put(contentfulFetchCityBlogs(allBlogs));
  } catch (err) {
    console.log(err);
  }
}

export function* fetchCities() {
  try {
    const client = createClient({
      accessToken: process.env.REACT_APP_CONTENTFUL_KEY ?? '',
      space: process.env.REACT_APP_CONTENTFUL_SPACE ?? '',
    });

    const contentfulClient = client;

    const allCities = [];

    let allResultsRetrieved = false;
    let skip = 0;

    while (!allResultsRetrieved) {
      const response = yield apply(
        contentfulClient,
        contentfulClient.getEntries,
        [{
          content_type: 'cities',
          skip,
        }],
      );

      allCities.push(...response.items.map((item) => ({
        id: item.sys.id,
        title: item.fields.title,
        shortDescription: item.fields.shortDescription,
        byLine: item.fields.byLine,
        guideId: item.fields?.guide?.sys?.id,
        slug: item.fields.slug,
        createdAt: item.sys.createdAt,
        image:
          item.fields.smallImage
          && item.fields.smallImage.fields.file
          && `https:${item.fields.smallImage.fields.file.url}`,
      })));

      skip += response.limit;

      if (skip > response.total) {
        allResultsRetrieved = true;
      }
    }

    yield put(contentfulFetchCities(allCities));
  } catch (err) {
    console.log(err);
  }
}

export function* contentfulWatcher() {
  yield takeLatest(contentfulFetchCountries().type, fetchCountries);
  yield takeLatest(contentfulReviews().type, fetchUserReviews);
  yield takeLatest(contentfulCityGuides().type, fetchCityGuides);
  yield takeLatest(contentfulCityBlogs().type, fetchCityBlogs);
  yield takeLatest(contentfulCities().type, fetchCities);
}
