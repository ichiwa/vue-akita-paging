import { Query } from '@datorama/akita';
import { UserListState, UserListStore, userListStore } from './userList.store';

export class UserListQuery extends Query<UserListState> {
  constructor(protected store: UserListStore) {
    super(store);
  }
}

export const userListQuery = new UserListQuery(userListStore);
