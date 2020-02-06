
pragma solidity ^0.5.0;

import "./SafeMath.sol";
import "./IRPS.sol";

contract RPS_Proxy {

    address payable RPS_Implementation;
	address owner;
	
	constructor(address payable _RPS_Implementation) public {
		RPS_Implementation = _RPS_Implementation;
		owner = msg.sender;
    }

	function setRPS_Implementation(address payable _RPS_Implementation) public {
		require(msg.sender == owner);
		// Know what you are doing!
		
		RPS_Implementation = _RPS_Implementation;
	}

	function claimWinnings() public {
		IRPS _RPS = IRPS(RPS_Implementation);
		
		_RPS.claimWinnings();
	}
	
	function makeSaltedMove(bytes32 _hashedMove) public {
		IRPS _RPS = IRPS(RPS_Implementation);
		
		_RPS.makeSaltedMove(_hashedMove);	
	}
		
	function makeMove(uint8 _move) public {
		IRPS _RPS = IRPS(RPS_Implementation);
		
		_RPS.makeMove(_move);	
	}
		
	function revealSalt(uint256 _salt, uint8 _move) public {
		IRPS _RPS = IRPS(RPS_Implementation);
		
		_RPS.revealSalt(_salt, _move);	
	}
}