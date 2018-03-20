const express = require('express')
const app = express()
const Issuer = require('openid-client').Issuer;
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
const AUTH_SERVER_ISSUER_URL = process.env.OKTA_AUTH_SERVER_ISSUER_URL;
const CLIENT_ID = process.env.OKTA_CLIENT_ID;
const CLIENT_SECRET = process.env.OKTA_CLIENT_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

(async () => {
  Issuer.defaultHttpOptions = { timeout: 3000};
  const issuer = await Issuer.discover(`${AUTH_SERVER_ISSUER_URL}/.well-known/openid-configuration`)
  const client = new issuer.Client({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  });
  
	const token = ACCESS_TOKEN;

  let userinfo;
  try {
    userinfo = await client.userinfo(token)
  } catch (e) {
  }

  let introspect;
  try {
    introspect = await client.introspect(token)
  } catch (e){

  }
  const data = {
    introspect: introspect,
    userinfo: userinfo
  };

  console.log(JSON.stringify(data, null, 4))
})()
