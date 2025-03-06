import { UserService } from '../api/user-service';
import { HttpClient } from '../core/client';
import { RandomUser, RandomUserApiResponse } from '../types';

// Mock the HttpClient
jest.mock('../core/client');

describe('UserService', () => {
  let userService: UserService;
  let mockHttpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    // Create a mock HttpClient
    mockHttpClient = new HttpClient({
      baseURL: 'https://randomuser.me',
    }) as jest.Mocked<HttpClient>;

    // Create a new UserService with the mock HttpClient
    userService = new UserService(mockHttpClient);
  });

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

  describe('getUsers', () => {
    it('should fetch users with no parameters', async () => {
      // Mock response data
      const mockResponse: RandomUserApiResponse = {
        results: [mockUser],
        info: {
          seed: 'abc123',
          results: 1,
          page: 1,
          version: '1.3'
        }
      };

      // Setup the mock
      mockHttpClient.get.mockResolvedValueOnce(mockResponse);

      // Call the method
      const result = await userService.getUsers();

      // Assertions
      expect(mockHttpClient.get).toHaveBeenCalledWith('/api/', {});
      expect(result).toEqual(mockResponse);
    });

    it('should fetch users with specified parameters', async () => {
      // Mock response data
      const mockResponse: RandomUserApiResponse = {
        results: [mockUser],
        info: {
          seed: 'abc123',
          results: 5,
          page: 1,
          version: '1.3'
        }
      };

      // Setup the mock
      mockHttpClient.get.mockResolvedValueOnce(mockResponse);

      // Call the method with parameters
      const result = await userService.getUsers({
        results: 5,
        gender: 'male',
        nat: ['us', 'gb'],
        seed: 'test',
        inc: ['name', 'gender', 'email']
      });

      // Assertions
      expect(mockHttpClient.get).toHaveBeenCalledWith('/api/', {
        results: 5,
        gender: 'male',
        nat: 'us,gb',
        seed: 'test',
        inc: 'name,gender,email'
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getRandomUser', () => {
    it('should fetch a single random user', async () => {
      // Mock response data
      const mockResponse: RandomUserApiResponse = {
        results: [mockUser],
        info: {
          seed: 'abc123',
          results: 1,
          page: 1,
          version: '1.3'
        }
      };

      // Setup the mock
      mockHttpClient.get.mockResolvedValueOnce(mockResponse);

      // Call the method
      const result = await userService.getRandomUser();

      // Assertions
      expect(mockHttpClient.get).toHaveBeenCalledWith('/api/', {
        results: 1
      });
      expect(result).toEqual(mockUser);
    });

    it('should fetch a single random user with filters', async () => {
      // Mock response data
      const mockResponse: RandomUserApiResponse = {
        results: [mockUser],
        info: {
          seed: 'abc123',
          results: 1,
          page: 1,
          version: '1.3'
        }
      };

      // Setup the mock
      mockHttpClient.get.mockResolvedValueOnce(mockResponse);

      // Call the method with filters
      const result = await userService.getRandomUser({
        gender: 'male',
        nat: 'us'
      });

      // Assertions
      expect(mockHttpClient.get).toHaveBeenCalledWith('/api/', {
        results: 1,
        gender: 'male',
        nat: 'us'
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('helper methods', () => {
    it('should format a full name correctly', () => {
      const fullName = userService.getFullName(mockUser);
      expect(fullName).toBe('Mr John Doe');
    });

    it('should format an address correctly', () => {
      const address = userService.getFormattedAddress(mockUser);
      expect(address).toBe('123 Main St, New York, NY, USA, 10001');
    });

    it('should format date of birth correctly with default format', () => {
      const dob = userService.formatDateOfBirth(mockUser);
      expect(dob).toBe('01/01/1990');
    });

    it('should format date of birth correctly with custom format', () => {
      const dob = userService.formatDateOfBirth(mockUser, { dateFormat: 'DD-MM-YYYY' });
      expect(dob).toBe('01-01-1990');
    });
  });

  describe('error handling', () => {
    it('should throw an error when API request fails', async () => {
      // Setup the mock to reject
      const errorMessage = 'Network error';
      mockHttpClient.get.mockRejectedValueOnce(new Error(errorMessage));

      // Verify that the error is thrown
      await expect(userService.getUsers()).rejects.toThrow(errorMessage);
    });
  });
});
