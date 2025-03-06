import RandomUserSDK from '../index';
import { HttpClient } from '../core/client';
import { UserService } from '../api/user-service';
import { RandomUser, RandomUserApiResponse } from '../types';

// Mock the HttpClient and UserService
jest.mock('../core/client');
jest.mock('../api/user-service');

describe('RandomUserSDK', () => {
  let sdk: RandomUserSDK;
  let mockUserService: jest.Mocked<UserService>;

  // Mock user data
  const mockUser: RandomUser = {
    gender: 'male',
    name: {
      title: 'Mr',
      first: 'John',
      last: 'Doe'
    },
    location: {
      street: {
        number: 123,
        name: 'Main St'
      },
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postcode: '10001',
      coordinates: {
        latitude: '40.7128',
        longitude: '-74.0060'
      },
      timezone: {
        offset: '-4:00',
        description: 'Eastern Time'
      }
    },
    email: 'john.doe@example.com',
    login: {
      uuid: '1234',
      username: 'johndoe',
      password: 'password',
      salt: 'salt',
      md5: 'md5',
      sha1: 'sha1',
      sha256: 'sha256'
    },
    dob: {
      date: '1990-01-01T00:00:00.000Z',
      age: 32
    },
    registered: {
      date: '2010-01-01T00:00:00.000Z',
      age: 12
    },
    phone: '123-456-7890',
    cell: '098-765-4321',
    id: {
      name: 'SSN',
      value: '123-45-6789'
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/men/1.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/1.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/1.jpg'
    },
    nat: 'US'
  };

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    // Set up the SDK with mocked services
    sdk = new RandomUserSDK();
    mockUserService = sdk['userService'] as jest.Mocked<UserService>;
  });

  describe('getUsers', () => {
    it('should call userService.getUsers with the correct parameters', async () => {
      // Mock response
      const mockResponse: RandomUserApiResponse = {
        results: [mockUser],
        info: {
          seed: 'abc123',
          results: 5,
          page: 1,
          version: '1.3'
        }
      };

      // Set up the mock to return the response
      mockUserService.getUsers.mockResolvedValueOnce(mockResponse);

      // Call the method
      const params = { results: 5, gender: 'male' as 'male' };
      const result = await sdk.getUsers(params);

      // Assertions
      expect(mockUserService.getUsers).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getRandomUser', () => {
    it('should call userService.getRandomUser with the correct parameters', async () => {
      // Set up the mock to return the user
      mockUserService.getRandomUser.mockResolvedValueOnce(mockUser);

      // Call the method
      const params = { gender: 'male' as 'male' };
      const result = await sdk.getRandomUser(params);

      // Assertions
      expect(mockUserService.getRandomUser).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockUser);
    });
  });

  describe('helper methods', () => {
    it('should call userService.getFullName with the correct user', () => {
      // Set up the mock to return a value
      mockUserService.getFullName.mockReturnValueOnce('Mr John Doe');

      // Call the method
      const result = sdk.getFullName(mockUser);

      // Assertions
      expect(mockUserService.getFullName).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual('Mr John Doe');
    });

    it('should call userService.getFormattedAddress with the correct user', () => {
      // Set up the mock to return a value
      mockUserService.getFormattedAddress.mockReturnValueOnce('123 Main St, New York, NY, USA, 10001');

      // Call the method
      const result = sdk.getFormattedAddress(mockUser);

      // Assertions
      expect(mockUserService.getFormattedAddress).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual('123 Main St, New York, NY, USA, 10001');
    });

    it('should call userService.formatDateOfBirth with the correct user and options', () => {
      // Set up the mock to return a value
      mockUserService.formatDateOfBirth.mockReturnValueOnce('01/01/1990');

      // Call the method
      const options = { dateFormat: 'MM/DD/YYYY' };
      const result = sdk.formatDateOfBirth(mockUser, options);

      // Assertions
      expect(mockUserService.formatDateOfBirth).toHaveBeenCalledWith(mockUser, options);
      expect(result).toEqual('01/01/1990');
    });
  });
}); 