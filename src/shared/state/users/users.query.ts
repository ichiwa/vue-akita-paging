import { UsersState, usersStore, UsersStore } from './users.store';
import { User } from './user.model';
import { QueryEntity, QueryConfig, Order } from '@datorama/akita';

@QueryConfig({
  sortBy: 'id',
  sortByOrder: Order.ASC
})
export class UsersQuery extends QueryEntity<UsersState, User> {
  constructor(protected store: UsersStore) {
    super(store);
  }
}

export const usersQuery = new UsersQuery(usersStore);
