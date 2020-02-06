// var truffleAssert = require('truffle-assertions');

const ERC20 = artifacts.require("ERC20");

contract("ERC20", async accounts => {
	var ERC20Contract;
	
	const address_zero = 0x0;
	const account_one = accounts[0];
	const account_two = accounts[1];
	
	beforeEach(async function() {
		ERC20Contract = await ERC20.new("ISCTE-IUL Token", "IIT", 0, 1000);
	});

	it("Test transfer successful", async () => {
	
		await ERC20Contract.transfer(account_two, 10, { from: account_one });
		
		let BalanceAccount1 = await ERC20Contract.balanceOf(account_one);

		assert.equal(
			  BalanceAccount1.toNumber(),
			  990,
			  "Balance of account_one is not 990 after transfer of 10 tokens to account_two");
			  
		let BalanceAccount2 = await ERC20Contract.balanceOf(account_two);

		assert.equal(
			  BalanceAccount2.toNumber(),
			  10,
			  "Balance of account_two is not 10 after transfer of 10 tokens from account_one");
	});
	
	/*it("Test transfer to address 0 should fail", async () => {
	
		await truffleAssert.reverts(ERC20Contract.transfer(address_zero, 10, { from: account_one }));
	});*/
	
});
