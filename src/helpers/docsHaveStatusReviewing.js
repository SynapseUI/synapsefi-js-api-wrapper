const getDocsStatuses = documents => {
  let statuses = [];

  documents.forEach(({ physical_docs, social_docs, virtual_docs }) => {
    const allSubDocs = physical_docs.concat(social_docs, virtual_docs);
    statuses = allSubDocs.map(({ status }) => {
      return status;
    });
  });

  console.log('statuses: ', statuses);
  return statuses;
};

const hasStatusREVIEWING = statuses => {
  for (let i = 0; i < statuses.length; i++) {
    if (statuses[i].includes('REVIEWING')) {
      return true;
    }
  }

  return false;
};

module.exports = documents => {
  return hasStatusREVIEWING(getDocsStatuses(documents));
};
