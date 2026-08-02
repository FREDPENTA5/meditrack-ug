const bcrypt = require('bcrypt');
async function test() {
  const match = await bcrypt.compare(
    'Password123!',
    '$2b$12$GkDj7qWnTjBxuJ3aXAQVkOljC62VlWggyuacopaF5SjjHfuaRBiey',
  );
  console.log('Password123! match?', match);
}
test().catch(console.error);
