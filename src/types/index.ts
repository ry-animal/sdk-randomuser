/**
 * SDK config options
 */
export interface SDKConfig {
  /** base URL for the API */
  baseURL: string;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Additional headers to include with requests */
  headers?: Record<string, string>;
}

/**
 * Random User API Response
 */
export interface RandomUserApiResponse {
  results: RandomUser[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

/**
 * Random User data model
 */
export interface RandomUser {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

/**
 * User fetch parameters
 */
export interface UserFetchParams {
  /** Number of results to return */
  results?: number;
  /** Gender filter (male or female) */
  gender?: 'male' | 'female';
  /** Nationality filter */
  nat?: string | string[];
  /** Seed for consistent results */
  seed?: string;
  /** Include specific fields */
  inc?: string | string[];
  /** Exclude specific fields */
  exc?: string | string[];
  /** Page number for pagination */
  page?: number;
}

/**
 * Format options for user data
 */
export interface UserFormatOptions {
  /** Date format for date of birth */
  dateFormat?: string;
}

// Keep these for backward compatibility but they're not needed for our implementation
export interface User extends RandomUser {}
export interface UserAddress {}
export interface PaginationParams {
  page?: number;
  limit?: number;
}
export interface UserFilters {
  gender?: string;
  nationality?: string;
}
export interface ApiResponse<T> {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}
