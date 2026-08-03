async function main() {
  try {
    const { hashPassword } = await import('./src/utils/password.ts');
    console.log(hashPassword);
  } catch (error) {
    console.error('ERROR OCCURRED:');
    console.error(error);
  }
}

main();
