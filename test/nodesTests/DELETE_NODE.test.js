const { expect } = require('chai');

const platformUserApiCannon = require('../testHelper/platformUserApiCannon');
const testHelperFuncs = require('../testHelper/testHelperFuncs');

describe('DELETE_NODE', () => {
  // - DELETE_NODE
  //   - create node
  //   - > delete node
  //   - `expect last note = "Node's 'is_active' toggled to False"`
  //   - delete node
  it.only('delete node', async () => {
    const {
      data: { nodes: { [0]: { _id: node_id, timeline: initialTimeline } } },
    } = await platformUserApiCannon.POST_CREATE_NODE({
      reqBody: {
        type: 'DEPOSIT-US',
        info: {
          nickname: 'My Checking',
        },
      },
    });

    const initialNote = initialTimeline[0].note;
    expect(initialNote).to.equal('Node created.');

    // ---------------------------------------------------------------------------------------
    const { data: { timeline: afterTimeline } } = await platformUserApiCannon.DELETE_NODE({
      node_id,
    });
    // ---------------------------------------------------------------------------------------

    const lastNote = afterTimeline[afterTimeline.length - 1].note;
    expect(lastNote).to.equal("Node's 'is_active' toggled to False.");
  });
});
