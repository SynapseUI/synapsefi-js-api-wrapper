const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const testHelperFuncsForUsers = require('../testHelper/testHelperFuncsForUsers');

describe('Card related', () => {
  xit('Creating card then resend and ship debit card', async () => {
    // create cip 1 personal user
    // check that user's permission is verify or not
    // once user is verify then create card
    // check card is created
    // delete user
    const { endUserApiWrapper } = await testHelperFuncsForUsers.createCip1PersonalUser();

    const promise = new Promise(resolve => {
      setTimeout(async () => {
        const { data } = await endUserApiWrapper.GET_USER();

        const userPermission = data.permission;
        const baseDocId = data.documents[0].id;

        resolve({
          userPermission,
          baseDocId,
        });
      }, 40000);
    });

    const { userPermission, baseDocId } = await promise;
    if (userPermission !== 'UNVERIFIED') {
      console.log('creating card...');
      const { data: depositNodeData } = await endUserApiWrapper.POST_CREATE_NODE({
        bodyParams: {
          type: 'DEPOSIT-US',
          info: {
            nickname: 'My Deposit Node',
          },
        },
      });

      const { data: cardNodeData } = await endUserApiWrapper.POST_CREATE_NODE({
        bodyParams: {
          type: 'CARD-US',
          info: {
            nickname: 'My Debit Card',
            document_id: baseDocId,
          },
        },
      });

      const depositNodeId = depositNodeData.nodes[0]._id;
      const cardNodeId = cardNodeData.nodes[0]._id;
      console.log('cardNodeId: ', cardNodeId);

      const { data: dataFromResetCard } = await endUserApiWrapper.PATCH_UPDATE_NODE({
        node_id: cardNodeId,
        bodyParams: {},
        queryParams: { reset: 'YES' },
      });
      console.log('dataFromResetCard: ', dataFromResetCard);

      const { data: dataFromShipCard } = await endUserApiWrapper
        .PATCH_UPDATE_NODE({
          node_id: cardNodeId,
          bodyParams: {
            fee_node_id: depositNodeId,
            expedite: true,
          },
          queryParams: { ship: 'YES' },
        })
        .catch(error => {
          console.log('error: ', error.response.data.error.en);
        });

      console.log('dataFromShipCard: ', dataFromShipCard);
    } else {
      console.log('user was UNVERIFIED');
    }

    console.log('???');
  });
});
