# Random User SDK

## Description

TypeScript SDK for fetching and simplifying data from [randomuser.me](https://randomuser.me/api/) to be able to fetch a list of users with different parameters and to fetch a single random user with filters. There are also utility functions for name, address and dob.

## Installation

```bash
npm install sdk-randomuser
# or
yarn add sdk-randomuser
```

## Quick Start

```typescript
import RandomUserSDK from 'sdk-randomuser';

// init sdk
const userSDK = new RandomUserSDK();

// get multiple with params
const users = await userSDK.getUsers({
  results: 10,
  gender: 'female',
  nat: ['us', 'gb', 'fr'],
});

// Expected output:
// users = {
//   results: [
//     {
//       gender: "female",
//       name: { title: "Miss", first: "Jennie", last: "Nichols" },
//       location: {...},
//       email: "jennie.nichols@example.com",
//       login: {...},
//       dob: { date: "1992-03-08T15:13:16.688Z", age: 30 },
//       registered: {...},
//       phone: "(272) 790-0888",
//       cell: "(489) 330-2385",
//       id: { name: "SSN", value: "405-88-3636" },
//       picture: {...},
//       nat: "US"
//     },
//     // ... 9 more female users from US, GB, or FR
//   ],
//   info: {
//     seed: "56d27f4a53bd5441",
//     results: 10,
//     page: 1,
//     version: "1.4"
//   }
// }

// get a random user with params
const user = await userSDK.getRandomUser({
  gender: 'male',
  nat: 'us',
});

// Expected output:
// user = {
//   gender: "male",
//   name: { title: "Mr", first: "John", last: "Smith" },
//   location: {
//     street: { number: 5925, name: "Hickory Creek Dr" },
//     city: "Albany",
//     state: "New York",
//     country: "United States",
//     // ... other location details
//   },
//   email: "john.smith@example.com",
//   login: { /* login details */ },
//   dob: { date: "1982-03-08T15:13:16.688Z", age: 40 },
//   // ... other user properties
//   nat: "US"
// }

// helpers
const fullName = userSDK.getFullName(user); // 'Mr John Doe'
const formattedAddress = userSDK.getFormattedAddress(user); // '123 Main St, New York, NY, USA, 10001'
const birthDate = userSDK.formatDateOfBirth(user); // '01/01/1990'
const customDateFormat = userSDK.formatDateOfBirth(user, {
  dateFormat: 'DD-MM-YYYY',
});
```

## API Reference

### Initialize SDK

```typescript
// with default config
const userSDK = new RandomUserSDK();

// with custom config
const userSDK = new RandomUserSDK({
  baseURL: 'https://randomuser.me', // base url
  timeout: 10000, // timeout in ms
  headers: {
    'X-Custom-Header': 'value',
  },
});
```

### Testing the Example

To run the provided examples, follow these steps:

```bash
# Install dependencies
npm install

# Build the SDK
npm run build

# Run the basic example
npm run example
```


### Fetch Users

```typescript
// fetch users with parameters
const users = await userSDK.getUsers({
  results?: number;               // Number of results to return
  gender?: 'male' | 'female';     // Gender filter
  nat?: string | string[];        // Nationality or array of nationalities
  seed?: string;                  // Seed for consistent results
  inc?: string | string[];        // Fields to include
  exc?: string | string[];        // Fields to exclude
  page?: number;                  // Page number for pagination
});
```

### Fetch Single User

```typescript
// fetch a single random user (with optional filters)
const user = await userSDK.getRandomUser({
  gender?: 'male' | 'female';     // Gender filter
  nat?: string | string[];        // Nationality or array of nationalities
  seed?: string;                  // Seed for consistent results
  inc?: string | string[];        // Fields to include
  exc?: string | string[];        // Fields to exclude
  page?: number;                  // Page number
});
```

### Helper Methods

```typescript
// get full name
const fullName = userSDK.getFullName(user);

// get formatted address
const address = userSDK.getFormattedAddress(user);

// format date of birth
const dob = userSDK.formatDateOfBirth(user, {
  dateFormat: 'MM/DD/YYYY', // default
  // supported: MM, DD, YYYY, YY, M, D
});
```

### DX Tooling

#### IDE

Cursor - VSCode fork

#### Language

Typescript / Node.js - typesafe runtime

#### Tests

Ts-jest - typescript version of jest

#### Consistency Tooling

eslint - linting
prettier - code formatting

#### Documentation

TypeDoc - generates api documentation from comments

#### API Testing

Thunder Client - lightweight Postman against randomuser.me

#### AI

Claude-sonnet-3.7 - helpful for configuration, modeling and comments.

## License

MIT# sdk-randomuser
