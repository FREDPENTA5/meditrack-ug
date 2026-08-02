import { authService } from './src/services/auth.service';

async function main() {
  try {
    const result = await authService.login({
      email: 'pharmacist@gayaza.ug',
      password: 'Password123!',
      rememberMe: true,
    });
    console.log('Login success:', result.accessToken ? 'Got access token' : 'No token');
  } catch (error) {
    console.error('Login error:', error);
  }
  process.exit(0);
}

main().catch(console.error);
