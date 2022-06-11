const redis = require("redis");
const env = require('./../environment/config.env')
const {
    promisify
} = require("util");


//redis
//Connect to redis
const redisClient = redis.createClient(env.redis.port, env.redis.host, { no_ready_check: true });

// auth here
redisClient.auth(env.redis.password, function (e) {
    if (e) console.log("⚠️ ", e.message);
});

// check connection
redisClient.on("connect", async function () {
    console.log("✅ Connected to Redis.");
});

// create commands
const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

// export here
module.exports = {
    SET_ASYNC,
    GET_ASYNC
}