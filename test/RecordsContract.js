const { assert } = require("chai");

const RecordsContract = artifacts.require("RecordsContract.sol");

contract("RecordsContract", (accounts) => {
  before(async () => {
    this.recordsContract = await RecordsContract.deployed();
  });

  it("migrate deployed successfully", async () => {
    const address = await this.recordsContract.address;

    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });

  it("get record List", async () => {
    const recordsCounter = await this.recordsContract.recordsCounter();
    const record = await this.recordsContract.tasks(recordsCounter);

    assert.equal(record.id.toNumber(), recordsCounter.toNumber());
    assert.equal(record.section, "my first record");
    assert.equal(record.description, "my first record description");
    assert.equal(record.done, false);
    assert.equal(record.patient, '');
    assert.equal(recordsCounter, 1);
  });

  it("record created successfully", async () => {
    const result = await this.recordsContract.createRecord("some record two", "description two");
    const recordEvent = result.logs[0].args;
    const recordsCounter = await this.recordsContract.tasksCounter();

    assert.equal(recordsCounter, 2);
    assert.equal(record.id.toNumber(), 2);
    assert.equal(record.section, "my second record");
    assert.equal(record.description, "my second record description");
    assert.equal(record.done, false);
    assert.equal(record.patient, '');
    assert.equal(recordsCounter, 1);
  });

  it("record toggled done", async () => {
    const result = await this.recordsContract.toggleDone(1);
    const recordEvent = result.logs[0].args;
    const record = await this.recordsContract.tasks(1);

    assert.equal(record.done, true);
    assert.equal(recordEvent.id.toNumber(), 1);
    assert.equal(recordEvent.done, true);
  });
});
