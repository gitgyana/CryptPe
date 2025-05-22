// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionHistory {
    struct Transaction {
        string id;
        string txType;
        uint amount;
        string method;
        uint timestamp;
    }

    Transaction[] public transactions;
    address public owner;

    event TransactionAdded(string id, string txType, uint amount, string method, uint timestamp);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function addTransaction(
        string memory _id,
        string memory _txType,
        uint _amount,
        string memory _method,
        uint _timestamp
    ) public onlyOwner {
        transactions.push(Transaction(_id, _txType, _amount, _method, _timestamp));
        emit TransactionAdded(_id, _txType, _amount, _method, _timestamp);
    }

    function getTransactionCount() public view returns (uint) {
        return transactions.length;
    }

    function getTransaction(uint index) public view returns (
        string memory id,
        string memory txType,
        uint amount,
        string memory method,
        uint timestamp
    ) {
        require(index < transactions.length, "Index out of bounds");
        Transaction storage txData = transactions[index];
        return (txData.id, txData.txType, txData.amount, txData.method, txData.timestamp);
    }
}

