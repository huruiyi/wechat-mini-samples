const crypto = require('crypto');

function decodePhoneNumber(sessionKey, encryptedData, iv) {
  const sessionKeyBuffer = new Buffer(sessionKey, 'base64');
  const encryptedDataBuffer = new Buffer(encryptedData, 'base64');
  const ivBuffer = new Buffer(iv, 'base64');

  const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKeyBuffer, ivBuffer);
  decipher.setAutoPadding(true);

  let decoded = decipher.update(encryptedDataBuffer, 'binary', 'utf8');
  decoded += decipher.final('utf8');

  decoded = JSON.parse(decoded);

  if (decoded.watermark.appid !== "wx2aade0a32a20e7a4") {
    throw new Error('Invalid appId');
  }

  return decoded;
}

var data= decodePhoneNumber("Rn96ndKlRyr9OSLUYJjcgQ==",
    "jKjbCouZCadnYOXAQ6k6hm5ksJaV3fqOnkNMv2LZRwzzblIMYO82SQAAYnGDv2qFJNDs90hWQBwM9lNX4l+Y5HujzbN2fP3/jkTz315ApabUV15C9eTmoNLQnsuf0Vbigh0GPUIJ0IFprPSOYVjLG7UWZlb4nj8EfCVfHbOvwBzLk7hdCgcIBltHqye/XwnmjtYH2pZqkljewj06CVcXhg==",
    "4pGaR3ExN97+UPCup5sKpQ==")
console.log(data)
