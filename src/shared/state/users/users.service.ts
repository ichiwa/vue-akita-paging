import { map } from 'lodash';
import { UsersStore, usersStore } from './users.store';
import {
  UserListStore,
  userListStore
} from '@/components/UserList/state/userList.store';
import { User } from './user.model';

const getUsers = (page: number): Promise<any> => {
  const limit = 10;
  const users = map(new Array(limit), (_, i) => {
    const index = limit * (page - 1) + (i + 1);
    return {
      id: index,
      name: `name ${index}`
    };
  });
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          paging: {
            page,
            total: 1000
          },
          users
        }
      });
    }, 1000);
  });
};

export class UsersService {
  constructor(
    private readonly userStore: UsersStore,
    private readonly userListStore: UserListStore
  ) {}

  async fetchUsers(page: number = 1): Promise<void> {
    this.userStore.setLoading(true);
    const {
      data: { users, paging }
    } = await getUsers(page);
    this.userStore.add(users);
    this.userListStore.update({ paging, ids: users.map((u: User) => u.id) });
    this.userStore.setLoading(false);
    return;
  }
}

export const usersService = new UsersService(usersStore, userListStore);
