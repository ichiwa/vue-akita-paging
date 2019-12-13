import { UserListStore, userListStore } from './userList.store';

export class UserListService {
  constructor(private userListStore: UserListStore) {}
}

export const usersService = new UserListService(userListStore);
