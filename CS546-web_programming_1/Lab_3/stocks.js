const axios = require('axios');

async function getstocks() {
	const { data } = await axios.get(
		'https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json'
	);
	return data; // this will be the array of people objects
}

async function getPeople() {
	let { data } = await axios.get(
		'https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json'
	);
	return data; // this will be the array of people objects
}

function checkStockName(stockName) {
	if (typeof stockName === 'undefined') throw 'Input is undefined';
	else if (stockName === null) throw 'Input is null Value';
	else if (!(typeof stockName === 'string' || stockName instanceof String))
		throw 'Input is not a String';
	else if (stockName.trim().length === 0) throw 'Input contains only Spaces';
}

function checkName(first, last) {
	if (typeof first === 'undefined' || typeof last === 'undefined')
		throw 'Input is undefined';
	else if (first === null || last === null) throw 'Input is null Value';
	else if (
		!(
			(typeof first === 'string' || first instanceof String) &&
			(typeof last === 'string' || last instanceof String)
		)
	)
		throw 'Input is not a String';
	else if (first.trim().length === 0 || first.trim().length === 0)
		throw 'Input contains only Spaces';
}

function checkCapital(first) {
	// to create uniform captilization inthe inputs
	let Input = first.toLowerCase();
	let Inputarr = Input.split('');
	Inputarr[0] = Inputarr[0].toUpperCase();
	final = Inputarr.join('');
	return final;
}

async function listShareHolders(stockName) {
	checkStockName(stockName);
	let nametrim = stockName.trim();
	let stockdata = await getstocks();
	let peopledata = await getPeople();
	let shareHolders = {};
	let shareHoldArr = [];
	let flag = false;
	for (d in stockdata) {
		if (stockdata[d].stock_name.toUpperCase() === nametrim.toUpperCase()) {
			flag = true;
			shareHolders = {
				id: stockdata[d].id,
				stockName: stockdata[d].stock_name,
			};
			let testid = stockdata[d].shareholders;
			for (t in testid) {
				for (p in peopledata) {
					if (testid[t].userId === peopledata[p].id) {
						shareHoldArr.push({
							first_name: peopledata[p].first_name,
							last_name: peopledata[p].last_name,
							number_of_shares: testid[t].number_of_shares,
						});
					}
				}
			}
		}
	}
	if (flag === false) throw 'Stock name cannot be found';

	shareHolders['shareholders'] = shareHoldArr;
	return shareHolders;
}

async function totalShares(stockName) {
	checkStockName(stockName);
	let nametrim = stockName.trim();
	let stockdata = await getstocks();
	let totalShares = 0;
	let totalShareHolders = 0;
	let flag = false;
	for (d in stockdata) {
		if (stockdata[d].stock_name.toUpperCase() === nametrim.toUpperCase()) {
			flag = true;
			let testid = stockdata[d].shareholders;
			totalShareHolders = stockdata[d].shareholders.length;
			for (t in testid) {
				totalShares += testid[t].number_of_shares;
			}
		}
	}
	if (flag === false) throw 'No Matches found for the given Stock Name';
	else if (totalShareHolders === 0)
		return `${stockName} currently has no shareholders.`;
	else if (totalShareHolders === 1)
		return `${stockName}, has ${totalShareHolders} shareholder that owns a total of ${totalShares} shares.`;
	else
		return `${stockName}, has ${totalShareHolders} shareholders that own a total of ${totalShares} shares.`;
}

async function listStocks(firstName, lastName) {
	checkName(firstName, lastName);
	let trimfirst = firstName.trim();
	let trimlast = lastName.trim();
	let First = checkCapital(trimfirst);
	let Last = checkCapital(trimlast);
	let stockdata = await getstocks();
	let peopledata = await getPeople();
	let personHoldings = [];
	let flag = false;
	let flagownsshares = false;
	for (p in peopledata) {
		if (
			peopledata[p].first_name === First &&
			peopledata[p].last_name === Last
		) {
			flag = true;
			for (s in stockdata) {
				let temp = stockdata[s].shareholders;
				for (v in temp) {
					if (peopledata[p].id === temp[v].userId) {
						flagownsshares = true;
						personHoldings.push({
							stock_name: stockdata[s].stock_name,
							number_of_shares: temp[v].number_of_shares,
						});
					}
				}
			}
		}
	}
	if (flag === false) throw `${First} ${Last} was not found`;
	else if (flagownsshares === false)
		throw `${First} ${Last} does not own any shares`;
	else return personHoldings;
}

async function getStockById(id) {
	checkStockName(id);
	let nametrim = id.trim();
	let stockdata = await getstocks();
	let flag = false;
	for (d in stockdata) {
		if (stockdata[d].id === nametrim) {
			flag = true;
		}
		if (flag) return stockdata[d];
	}
	if (!flag) throw 'stock not found';
}

module.exports = {
	listShareHolders,
	totalShares,
	listStocks,
	getStockById,
};
