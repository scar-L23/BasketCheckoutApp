const HOSTNAME = 'http://localhost';
const PORT = 9001;

const getProducts = async () => {
	const response = await fetch(`${HOSTNAME}:${PORT}/products`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		referrerPolicy: 'no-referrer'
	});
	const json = await response.json();
	if (response.ok) {
		console.log(json);
		return json;
	} else {
		return null;
	}	
};

const getUnreliableProducts = async () => {
	const response = await fetch(`${HOSTNAME}:${PORT}/unreliable_products`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		referrerPolicy: 'no-referrer'
	});
	const json = await response.json();
	if (response.ok) {
		console.log(json);
		return json;
	} else {
		console.log('Error retrieving product list');
		return null;
	}	
};

const checkout = async (basketData) => {
	const response = await fetch(`${HOSTNAME}:${PORT}/checkout`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(basketData)
	});
	const json = await response.json();
	if (response.ok) {
		console.log(json.msg);
	} else {
		console.log(json.error);
	}
	return json;
};

export {
	checkout,
	getProducts,
	getUnreliableProducts
};