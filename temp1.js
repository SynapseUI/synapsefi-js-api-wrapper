const getUserNodeTransIds = require('./test/testHelper/getUserNodeTransIds');

const func = async () => {
  const data = await getUserNodeTransIds();
  console.log('data: ', data);
};

func();
