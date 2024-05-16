import { clerkClient } from '@clerk/clerk-sdk-node';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async getUsers() {
    return await clerkClient.users.getUserList();
  }
}
