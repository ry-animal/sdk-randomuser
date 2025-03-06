import { HttpClient } from '../core/client';
import { RandomUser, RandomUserApiResponse, UserFetchParams, UserFormatOptions } from '../types';
import * as userFormatters from '../utils/user-formatters';

/**
 * Service for handling user-related API operations with RandomUser.me API
 */
export class UserService {
  /**
   * Creates a new UserService instance
   * @param httpClient The HTTP client for making API requests
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Fetch a list of users with optional parameters
   * @param params Optional parameters for the request
   * @returns Promise with the API response containing user results
   */
  public async getUsers(params?: UserFetchParams): Promise<RandomUserApiResponse> {
    // Prepare query parameters
    const queryParams: Record<string, any> = { ...params };
    
    // Handle nationality array if provided
    if (params?.nat && Array.isArray(params.nat)) {
      queryParams.nat = params.nat.join(',');
    }
    
    // Handle include fields array if provided
    if (params?.inc && Array.isArray(params.inc)) {
      queryParams.inc = params.inc.join(',');
    }
    
    // Handle exclude fields array if provided
    if (params?.exc && Array.isArray(params.exc)) {
      queryParams.exc = params.exc.join(',');
    }
    
    try {
      return await this.httpClient.get<RandomUserApiResponse>('/api/', queryParams);
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  /**
   * Fetch a single random user
   * @param params Optional parameters for filtering the user
   * @returns Promise with a single RandomUser object
   */
  public async getRandomUser(params?: Omit<UserFetchParams, 'results'>): Promise<RandomUser> {
    const response = await this.getUsers({
      ...params,
      results: 1
    });
    
    return response.results[0];
  }

  /**
   * Get a user's full name
   * @param user The user object
   * @returns The user's full name
   */
  public getFullName(user: RandomUser): string {
    return userFormatters.getFullName(user);
  }

  /**
   * Get a formatted address for a user
   * @param user The user object
   * @returns Formatted address string
   */
  public getFormattedAddress(user: RandomUser): string {
    return userFormatters.getFormattedAddress(user);
  }

  /**
   * Format a user's date of birth
   * @param user The user object
   * @param options Optional formatting options
   * @returns Formatted date string
   */
  public formatDateOfBirth(user: RandomUser, options?: UserFormatOptions): string {
    return userFormatters.formatDateOfBirth(user, options);
  }
}
