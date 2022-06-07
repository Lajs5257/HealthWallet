// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract RecordsContract {
    uint256 public recordsCounter = 0;

    struct Record {
        uint256 id;
        string section;
        string description;
        bool done;
        string patient;
        uint256 createdAt;
        
    }

    event RecordCreated(
        uint256 id,
        string section,
        string description,
        bool done,
        string patient,
        uint256 createdAt
    );
    event RecordToggledDone(uint256 id, bool done);

    mapping(uint256 => Record) public records;

    constructor() {
        createRecord("my first record", "my first description","");
    }

    function createRecord(string memory _section, string memory _description, string memory _patient)
        public
    {
        recordsCounter++;
        records[recordsCounter] = Record(
            recordsCounter,
            _section,
            _description,
            false,
            _patient,
            block.timestamp
        );
        emit RecordCreated(
            recordsCounter,
            _section,
            _description,
            false,
            _patient,
            block.timestamp
        );
    }

    function toggleDone(uint256 _id) public {
        Record memory _record = records[_id];
        _record.done = !_record.done;
        records[_id] = _record;
        emit RecordToggledDone(_id, _record.done);
    }
}
