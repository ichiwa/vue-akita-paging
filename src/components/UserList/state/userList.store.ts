import { Store, StoreConfig } from '@datorama/akita';

export interface UserListState {
  paging: {
    page: number;
    total: number | null;
  };
  ids: Array<number>;
}

export function createInitialState(): UserListState {
  return {
    paging: {
      page: 1,
      total: null
    },
    ids: []
  };
}

@StoreConfig({ name: 'userList' })
export class UserListStore extends Store<UserListState> {
  constructor() {
    super(createInitialState());
  }
}

export const userListStore = new UserListStore();
