const https = require('https');

https.get('https://api.ipify.org', res => {
  let ip = '';
  res.on('data', chunk => {
    ip += chunk;
  });
  res.on('end', () => {
    console.log('🧠 Your current public IP is:', ip);
  });
});
