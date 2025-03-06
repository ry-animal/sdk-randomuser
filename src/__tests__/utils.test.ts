import { getFullName, getFormattedAddress, formatDateOfBirth } from '../utils';
import { RandomUser } from '../types';

describe('User Utility Functions', () => {
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

  describe('getFullName', () => {
    it('should format a full name correctly', () => {
      const fullName = getFullName(mockUser);
      expect(fullName).toBe('Mr John Doe');
    });

    it('should handle missing parts of the name', () => {
      const userWithMissingName = {
        ...mockUser,
        name: {
          title: '',
          first: 'John',
          last: ''
        }
      };
      const fullName = getFullName(userWithMissingName);
      expect(fullName).toBe('John');
    });
  });

  describe('getFormattedAddress', () => {
    it('should format an address correctly', () => {
      const address = getFormattedAddress(mockUser);
      expect(address).toBe('123 Main St, New York, NY, USA, 10001');
    });

    it('should handle different postcode types', () => {
      const userWithNumericPostcode = {
        ...mockUser,
        location: {
          ...mockUser.location,
          postcode: 10001
        }
      };
      const address = getFormattedAddress(userWithNumericPostcode);
      expect(address).toBe('123 Main St, New York, NY, USA, 10001');
    });
  });

  describe('formatDateOfBirth', () => {
    it('should format date of birth with default format (MM/DD/YYYY)', () => {
      const dob = formatDateOfBirth(mockUser);
      expect(dob).toBe('01/01/1990');
    });

    it('should format date of birth with custom format', () => {
      const dob = formatDateOfBirth(mockUser, { dateFormat: 'DD-MM-YYYY' });
      expect(dob).toBe('01-01-1990');
    });

    it('should handle YY format for year', () => {
      const dob = formatDateOfBirth(mockUser, { dateFormat: 'MM/DD/YY' });
      expect(dob).toBe('01/01/90');
    });

    it('should handle single digit formats', () => {
      const user = {
        ...mockUser,
        dob: {
          date: '1990-2-3T00:00:00.000Z',
          age: 32
        }
      };
      const dob = formatDateOfBirth(user, { dateFormat: 'M/D/YYYY' });
      expect(dob).toBe('2/3/1990');
    });
  });
}); 