const Redis = require('ioredis');

async function main() {
  const redisUrl =
    'redis://default:E3lvbXKj60G9RMa5ok61z3t6hEdomqRm@kick-roan-cream-19630.db.redis.io:14968';
  const redis = new Redis(redisUrl);

  try {
    const keys = await redis.keys('*');
    console.log('Total keys in Redis:', keys.length);

    // Group keys by prefix to understand what's in there
    const groups = {};
    keys.forEach((key) => {
      const prefix = key.split(':')[0]; // usually BullMQ uses 'bull:queueName:...'
      groups[prefix] = (groups[prefix] || 0) + 1;
    });

    console.log('\nKey breakdown by prefix:');
    console.log(groups);

    // Get a few sample keys
    console.log('\nSample keys:');
    console.log(keys.slice(0, 10));
  } catch (error) {
    console.error('Error connecting to Redis:', error.message);
  } finally {
    redis.quit();
  }
}

main();
