// This example assumes the SDK has been built to dist/
const RandomUserSDK = require('../dist/index.cjs.js').default;

// Basic example of using the Random User SDK
async function main() {
  // Initialize the SDK
  const userSDK = new RandomUserSDK();
  
  console.log('Initializing Random User SDK example...\n');
  
  try {
    // Example 1: Fetch a list of 5 users
    console.log('Example 1: Fetching 5 random users...');
    const userList = await userSDK.getUsers({ results: 5 });
    
    console.log(`Fetched ${userList.results.length} users`);
    console.log('First user:', userList.results[0].name);
    console.log('API Info:', userList.info);
    console.log('-------------------\n');
    
    // Example 2: Fetch only female users from US and UK
    console.log('Example 2: Fetching 3 female users from US and UK...');
    const femaleUsers = await userSDK.getUsers({
      results: 3,
      gender: 'female',
      nat: ['us', 'gb']
    });
    
    femaleUsers.results.forEach((user, index) => {
      console.log(`User ${index + 1}: ${user.name.first} ${user.name.last} (${user.nat})`);
    });
    console.log('-------------------\n');
    
    // Example 3: Fetch a single random user
    console.log('Example 3: Fetching a single random user...');
    const singleUser = await userSDK.getRandomUser();
    
    console.log('User details:');
    console.log('- Name:', userSDK.getFullName(singleUser));
    console.log('- Address:', userSDK.getFormattedAddress(singleUser));
    console.log('- Date of Birth:', userSDK.formatDateOfBirth(singleUser));
    console.log('- Formatted DoB (DD-MM-YY):', userSDK.formatDateOfBirth(singleUser, { dateFormat: 'DD-MM-YY' }));
    console.log('-------------------\n');
    
    // Example 4: Using seeds for consistent results
    console.log('Example 4: Using seeds for consistent results...');
    const seed = 'my-fixed-seed';
    
    console.log('First call with seed:', seed);
    const firstCall = await userSDK.getRandomUser({ seed });
    console.log('User:', userSDK.getFullName(firstCall));
    
    console.log('Second call with same seed:', seed);
    const secondCall = await userSDK.getRandomUser({ seed });
    console.log('User:', userSDK.getFullName(secondCall));
    
    console.log('The users from both calls should be identical');
    console.log('-------------------\n');
    
    // Example 5: Including/excluding specific fields
    console.log('Example 5: Including only specific fields...');
    const minimalUser = await userSDK.getRandomUser({
      inc: ['name', 'email', 'nat']
    });
    
    console.log('Minimal user data:');
    console.log(minimalUser);
    
  } catch (error) {
    console.error('Error in Random User SDK example:', error);
  }
}

// Run the example
main().catch(console.error); 