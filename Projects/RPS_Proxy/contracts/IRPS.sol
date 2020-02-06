
pragma solidity ^0.5.0;

interface IRPS {
	//constructor(address payable _player_one, address payable _player_two, uint256 _betValue) public;
	function makeMove(uint8 _move) payable external;
	function makeSaltedMove(bytes32 _hashedMove) payable external;
	function claimWinnings() external;
	function revealSalt(uint256 _salt, uint8 _move) external;
}