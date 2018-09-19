const { expect } = require('chai');

const urlBuilders = require('../../src/helpers/urlBuilders');

describe('url builders', () => {
  it('replacePathParams', () => {
    const outputUrl = urlBuilders.replacePathParams({
      originalUrl: 'origianlUrl/:user_id/:node_id/:trans_id',
      user_id: 'USER_ID',
      node_id: 'NODE_ID',
      trans_id: 'TRANS_ID',
    });

    expect(outputUrl).to.equal('origianlUrl/USER_ID/NODE_ID/TRANS_ID');
  });

  it('addQueryParams', () => {
    const outputUrl = urlBuilders.addQueryParams({
      originalUrl: 'origianlUrl',
      query: 'sean@gmail.com',
      page: '2',
      per_page: '10',
      show_refresh_tokens: 'yes',
      full_dehydrate: 'yes',
      type: 'DEPOSIT-US',
    });

    expect(outputUrl).to.equal(
      'origianlUrl?query=sean@gmail.com&page=2&per_page=10&show_refresh_tokens=yes&full_dehydrate=yes&type=DEPOSIT-US'
    );
  });
});
