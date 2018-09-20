const { expect } = require('chai');

const platformUserApiWrapper = require('../testHelper/platformUserApiWrapper');
const testHelpersForNodes = require('../testHelper/testHelpersForNodes');

describe('DELETE_NODE', () => {
  // - DELETE_NODE
  //   - create node
  //   - > delete node
  //   - `expect last note = "Node's 'is_active' toggled to False"`
  //   - delete node
  it('delete node', async () => {
    const { node_id, initialTimeline } = await testHelpersForNodes.createDepositNode();

    const initialNote = initialTimeline[0].note;
    expect(initialNote).to.equal('Node created.');

    // ---------------------------------------------------------------------------------------
    const { data: { timeline: afterTimeline } } = await platformUserApiWrapper.DELETE_NODE({
      node_id,
    });
    // ---------------------------------------------------------------------------------------

    const lastNote = afterTimeline[afterTimeline.length - 1].note;
    expect(lastNote).to.equal("Node's 'is_active' toggled to False.");
  });
});
