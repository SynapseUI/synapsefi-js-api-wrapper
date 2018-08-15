import _ from 'lodash';

export const addQueryParams = ({ originalUrl, query, page, per_page, show_refresh_tokens }) => {
  const arr = [];

  if (query !== undefined) {
    arr.push(`query=${query}`);
  }

  if (page !== undefined) {
    arr.push(`page=${page}`);
  }

  if (per_page !== undefined) {
    arr.push(`per_page=${per_page}`);
  }

  if (show_refresh_tokens !== undefined) {
    arr.push(`show_refresh_tokens=${show_refresh_tokens}`);
  }

  if (arr.length === 0) return originalUrl;

  return originalUrl + '?' + arr.join(';');
};

export const replacePathParams = ({ originalUrl, user_id, node_id, transaction_id }) => {
  let copiedUrl = originalUrl;

  if (user_id !== undefined) {
    copiedUrl = _.replace(copiedUrl, ':user_id', user_id);
  }

  if (node_id !== undefined) {
    copiedUrl = _.replace(copiedUrl, ':node_id', node_id);
  }

  if (transaction_id !== undefined) {
    copiedUrl = _.replace(copiedUrl, ':transaction_id', transaction_id);
  }

  return copiedUrl;
};
