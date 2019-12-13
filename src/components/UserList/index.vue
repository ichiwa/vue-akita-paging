<template>
  <div class="todo-list">
    <div class="container">
      <h1>User List</h1>
      <el-table :data="users" style="width: 100%" v-loading="isLoading">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="Name"></el-table-column>
      </el-table>
      <el-pagination
        :disabled="isLoading"
        layout="prev, pager, next"
        :total="userListState.paging.total"
        @prev-click="handleChange"
        @next-click="handleChange"
        @current-change="handleChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Watch } from 'vue-property-decorator';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { UsersQuery, usersService, User, usersQuery } from '../../shared/state';
import { guid, Order, ID } from '@datorama/akita';
import { UserListState, userListQuery, createInitialState } from './state';

@Component
export default class TodoList extends Vue {
  onDestroy = new Subject();
  users: User[] = [];
  isLoading: boolean = false;
  userListState: UserListState = createInitialState();

  mounted(): void {
    usersService.fetchUsers();
  }

  created(): void {
    usersQuery
      .selectLoading()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((loading: boolean) => (this.isLoading = loading));
    userListQuery
      .select()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((userListState: UserListState) => {
        this.userListState = userListState;
      });
  }

  destroyed(): void {
    this.onDestroy.next();
  }

  async handleChange(page: number): Promise<void> {
    usersService.fetchUsers(page);
  }

  @Watch('userListState')
  onUserListStatChanged(newVal: UserListState, oldVal: UserListState) {
    this.updateUserList();
  }

  updateUserList(): void {
    usersQuery
      .selectMany(this.userListState.ids)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }
}
</script>

<style scoped lang="scss">
.todo-list {
  padding: 2em;
  display: flex;
  justify-content: center;
}

.container {
  width: 500px;
}
</style>
