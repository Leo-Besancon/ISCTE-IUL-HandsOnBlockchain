const RPS = artifacts.require("RPS");

contract("RPS", async accounts => {
	var RPSContract;
	
	const address_zero = 0x0;
	const account_one = accounts[0];
	const account_two = accounts[1];
	
	beforeEach(async function() {
		RPSContract = await RPS.new(account_one, account_two, 1e15);
	});

	it("Test Player 1 win", async () => {
	
		await RPSContract.makeMove(1, {value:1e15, from: account_one });
		await RPSContract.makeMove(0, {value:1e15, from: account_two });
		
		let BalanceAccount1Before = await web3.eth.getBalance(account_one)
		
		await RPSContract.claimWinnings({ from: account_two });
		
		let BalanceAccount1After = await web3.eth.getBalance(account_one)

		assert.equal(
			  BalanceAccount1Before,
			  BalanceAccount1After - 2e15,
			  "Balance of account_one is not 2 betValues greater");
	});
	
	it("Test Player 2 win", async () => {
	
		await RPSContract.makeMove(1, {value:1e15, from: account_one });
		await RPSContract.makeMove(2, {value:1e15, from: account_two });
		
		let BalanceAccount1Before = await web3.eth.getBalance(account_one)
		
		await RPSContract.claimWinnings({ from: account_two });
		
		let BalanceAccount1After = await web3.eth.getBalance(account_one)

		assert.equal(
			  BalanceAccount1Before,
			  BalanceAccount1After,
			  "Balance of account_one is not the same");
	});
	
	it("Test Draw", async () => {
	
		await RPSContract.makeMove(1, {value:1e15, from: account_one });
		await RPSContract.makeMove(1, {value:1e15, from: account_two });
		
		let BalanceAccount1Before = await web3.eth.getBalance(account_one)
		
		await RPSContract.claimWinnings({ from: account_two });
		
		let BalanceAccount1After = await web3.eth.getBalance(account_one)

		assert.equal(
			  BalanceAccount1Before,
			  BalanceAccount1After - 1e15,
			  "Balance of account_one did not get his bet back");
	});
});
