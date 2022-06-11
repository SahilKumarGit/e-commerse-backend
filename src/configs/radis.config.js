const { createClient } = require("redis");
const env = require('./../environment/config.env')

const client = createClient({
    url: `redis://${env.redis.username}:${env.redis.password}@${env.redis.host}:${env.redis.port}`
});

client.connect()
    .then(_ => console.log("✅ Redis is connected!"))
    .catch(e => console.log("⚠️ Redis Error: ", e.message));


module.exports = client

/*
    const s = await redis.setEx('key', 60, 'value')
    const s = await redis.set('key', 'value')
    const s = await redis.get('key')
*/