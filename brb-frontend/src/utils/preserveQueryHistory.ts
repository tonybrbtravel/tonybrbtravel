// https://stackoverflow.com/questions/43613140/how-to-preserve-query-parameters-in-react-router-v4

import {
  History, LocationDescriptor, LocationDescriptorObject, createBrowserHistory,
} from 'history';
import queryString from 'query-string';

type CreateHistory<O, H> = (options?: O) => History & H;

function preserveQueryParameters(
  history: History,
  preserve: string[],
  location: LocationDescriptorObject,
): LocationDescriptorObject {
  const currentQuery = queryString.parse(history.location.search);
  if (currentQuery) {
    let preservedQuery: { [key: string]: unknown } = {};

    for (const p of preserve) {
      const v = currentQuery[p];
      if (v) {
        preservedQuery[p] = v;
      } else if (p === '*') {
        preservedQuery = currentQuery;
        break;
      }
    }

    if (location.search) {
      Object.assign(preservedQuery, queryString.parse(location.search));
    }
    location.search = queryString.stringify(preservedQuery);
  }
  return location;
}

function createLocationDescriptorObject(
  location: LocationDescriptor,
  state?: History.LocationState,
): LocationDescriptorObject {
  return typeof location === 'string'
    ? { pathname: location, state }
    : location;
}

export function createPreserveQueryHistory<O, H>(
  createHistory: CreateHistory<O, H>,
  queryParameters: string[],
): CreateHistory<O, H> {
  return (options?: O) => {
    const history = createHistory(options);
    const oldPush = history.push;
    const oldReplace = history.replace;
    history.push = (path: LocationDescriptor, state?: History.LocationState) => oldPush.apply(history, [
      preserveQueryParameters(
        history,
        queryParameters,
        createLocationDescriptorObject(path, state),
      ),
    ]);
    history.replace = (
      path: LocationDescriptor,
      state?: History.LocationState,
    ) => oldReplace.apply(history, [
      preserveQueryParameters(
        history,
        queryParameters,
        createLocationDescriptorObject(path, state),
      ),
    ]);
    return history;
  };
}

export const preserveQueryBrowserHistory = createPreserveQueryHistory(
  createBrowserHistory,
  ['*'],
)();
