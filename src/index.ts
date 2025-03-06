import { HttpClient } from './core/client';
import { UserService } from './api/user-service';
import { SDKConfig, RandomUser, UserFetchParams, UserFormatOptions, RandomUserApiResponse } from './types';

/**
 * RandomUserSDK - The main SDK class for accessing the Random User API
 */
export class RandomUserSDK {
  private httpClient: HttpClient;
  private userService: UserService;

  /**
   * Create a new SDK instance
   * @param config SDK configuration
   */
  constructor(config: SDKConfig = { baseURL: 'https://randomuser.me' }) {
    this.httpClient = new HttpClient(config);
    this.userService = new UserService(this.httpClient);
  }

  /**
   * Fetch a list of users from the Random User API
   * @param params Optional parameters for customizing the request
   * @returns Promise with the API response
   */
  public async getUsers(params?: UserFetchParams): Promise<RandomUserApiResponse> {
    return this.userService.getUsers(params);
  }

  /**
   * Fetch a single random user
   * @param params Optional parameters for filtering the user
   * @returns Promise with a single user
   */
  public async getRandomUser(params?: Omit<UserFetchParams, 'results'>): Promise<RandomUser> {
    return this.userService.getRandomUser(params);
  }

  /**
   * Get a user's full name (title + first + last)
   * @param user The user object
   * @returns The user's full name
   */
  public getFullName(user: RandomUser): string {
    return this.userService.getFullName(user);
  }

  /**
   * Get a formatted address for a user
   * @param user The user object
   * @returns Formatted address string
   */
  public getFormattedAddress(user: RandomUser): string {
    return this.userService.getFormattedAddress(user);
  }

  /**
   * Format a user's date of birth
   * @param user The user object
   * @param options Optional formatting options
   * @returns Formatted date string
   */
  public formatDateOfBirth(user: RandomUser, options?: UserFormatOptions): string {
    return this.userService.formatDateOfBirth(user, options);
  }
}

// Export types
export * from './types';

// Default export
export default RandomUserSDK;
