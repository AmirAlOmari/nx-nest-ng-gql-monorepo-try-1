import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent
} from '@nestjs/graphql';
import { DocumentType } from '@typegoose/typegoose';

// Auth module
import { GqlAuthGuard } from '../../../auth/guards/gql-auth/gql-auth.guard';

// Shared module
import { GqlUser } from '../../../shared/decorators/gql-user/gql-user.decorator';

// User module
import { UserService } from '../../../users/services/user/user.service';
import { User as UserObjectType } from '../../../users/obj-types/user/user.obj-type';
import { User } from '../../../users/models/user/user.model';

// Task module
import { TaskService } from '../../services/task/task.service';
import { Task as TaskObjectType } from '../../obj-types/task/task.obj-type';
import { CreateMyTaskInput } from '../../inputs/create-my-task/create-my-task.input';

@Resolver(of => TaskObjectType)
export class TasksResolver {
  constructor(
    public taskService: TaskService,
    public userService: UserService
  ) {}

  @ResolveField(returns => UserObjectType)
  async user(@Parent() task: TaskObjectType) {
    const user = await this.userService.getUserById(task.userId);

    return user;
  }

  @Query(returns => [TaskObjectType])
  @UseGuards(GqlAuthGuard)
  async getMyTasks(@GqlUser() user: DocumentType<User>) {
    const myTasks = await this.taskService.getAllTasksByUserId(user._id);

    return myTasks;
  }

  @Mutation(returns => TaskObjectType)
  @UseGuards(GqlAuthGuard)
  async createMyTask(
    @Args('input') input: CreateMyTaskInput,
    @GqlUser() user: DocumentType<User>
  ): Promise<TaskObjectType> {
    const createdTask = await this.taskService.createTaskForUser(user, input);

    return createdTask.toObject();
  }

  @Mutation(returns => TaskObjectType)
  @UseGuards(GqlAuthGuard)
  async updateMyTask(
    @Args('input') input: CreateMyTaskInput,
    @GqlUser() user: DocumentType<User>
  ) {
    throw new Error('Not implemented yet');
  }

  @Mutation(returns => TaskObjectType)
  @UseGuards(GqlAuthGuard)
  async completeMyTask(
    @Args('input') input: CreateMyTaskInput,
    @GqlUser() user: DocumentType<User>
  ) {
    throw new Error('Not implemented yet');
  }

  @Mutation(returns => TaskObjectType)
  @UseGuards(GqlAuthGuard)
  async removeMyTask(
    @Args('input') input: CreateMyTaskInput,
    @GqlUser() user: DocumentType<User>
  ) {
    throw new Error('Not implemented yet');
  }
}
