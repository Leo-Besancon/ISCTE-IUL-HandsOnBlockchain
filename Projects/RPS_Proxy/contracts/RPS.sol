
pragma solidity ^0.5.0;

import "./SafeMath.sol";
import "./IRPS.sol";

contract RPS is IRPS{

    using SafeMath for uint256;
	
	// NoMoves: 0;
	// Player1HasNoMoves: 1;
	// Player2HasNoMoves: 2;
	// Player1Wins: 3;
	// Player2Wins: 4;
	// Draw: 5;
	uint8 winner; 
	address payable player_one;
	address payable player_two;
	
	// Rock: 0
	// Paper: 1
	// Scissors: 2
	
	uint8 move_player_one;
	uint8 move_player_two;
	uint256 betValue;
	
	constructor(address payable _player_one, address payable _player_two, uint256 _betValue) public {
        player_one = _player_one;
        player_two = _player_two;
        
		betValue = _betValue;
    }
	
	function makeSaltedMove(bytes32 _hashedMove) payable public {
	
	}
	
	function revealSalt(uint256 _salt, uint8 _move) public {
	
	}

	function makeMove(uint8 _move) payable public {
		require(msg.value == betValue);
		require(_move >= 0);
		require(_move <= 2);
		
		if (msg.sender == player_one)
		{
			move_player_one = _move;
			if (winner == 0)
			{
				winner = 2;
			}
			else if (winner == 1)
			{		
				if (move_player_one == move_player_two)
				{
					winner = 5;
				}
				else if (move_player_one >= move_player_two || move_player_one == 0)
				{
					winner = 3;
				}
				else
				{
					winner = 4;
				}
			}
		}
		else 
		{
			require(msg.sender == player_two);
			
			move_player_two = _move;
		
			if (winner == 0)
			{
				winner = 1;
			}
			else if (winner == 2)
			{
				if (move_player_one == move_player_two)
				{
					winner = 5;
				}
				else if (move_player_one >= move_player_two || move_player_one == 0)
				{
					winner = 3;
				}
				else
				{
					winner = 4;
				}
			}
		}
	}

	function claimWinnings() public {
		require(winner >= 3);
		
		if (winner == 3)
		{
			if (!player_one.send(betValue.mul(2)))
			{
				revert();
			}
		}
		else if (winner == 4)
		{
			if (!player_two.send(betValue.mul(2)))
			{
				revert();
			}	
		}
		else if (winner == 5)
		{
			if (!player_one.send(betValue))
			{
				revert();
			}	
			if (!player_two.send(betValue))
			{
				revert();
			}				
		}
	}
}