const axios = require('axios')

const main = async () => {
	const scope = 'api_scope'
	const payload = `grant_type=client_credentials&redirect_uri=http%3A%2F%2Flocalhost%3A8080&scope=${scope}`
	const {data} = await axios.post(`${process.env.OKTA_URL}/oauth2/default/v1/token`,
		payload, 
		{
			auth: {
				username: process.env.CLIENT_ID,
				password: process.env.CLIENT_SECRET
		  	},
		  	headers: {
		  		'Content-Type': 'application/x-www-form-urlencoded'
		  	}
	});
	console.log(data)
}

(async () => {
	try {
		await main()	
	} catch (e) {
		console.log(e)
	}
	
})()