const axios = require('axios')

const main = async () => {
	const scope = 'api_scope'
	const payload = `grant_type=client_credentials&redirect_uri=&scope=${scope}`
	const {data} = await axios.post(`${process.env.OKTA_URL}/oauth2/default/v1/token`,
		payload, 
		{
			auth: {
				username: process.env.OKTA_CLIENT_ID,
				password: process.env.OKTA_CLIENT_SECRET
		  	},
		  	headers: {
		  		'Accept': 'application/json',
		  		'Content-Type': 'application/x-www-form-urlencoded'
		  	}
	});
	console.log(JSON.stringify(data, null, 4))
}

(async () => {
	try {
		await main()	
	} catch (e) {
		console.log(e)
	}
	
})()