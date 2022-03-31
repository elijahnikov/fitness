import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FoodDiary = {
  __typename?: 'FoodDiary';
  calorieTarget: Scalars['Float'];
  createdAt: Scalars['String'];
  food: SavedFood;
  foodId: Scalars['Float'];
  id: Scalars['Float'];
  type: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['Float'];
};

export type FoodDiaryInput = {
  foodId: Scalars['Int'];
  type: Scalars['String'];
};

export type GetActivities = {
  __typename?: 'GetActivities';
  activities: Array<Schedule>;
};

export type GetFoodEntries = {
  __typename?: 'GetFoodEntries';
  foodDiary: Array<FoodDiary>;
};

export type GetFoods = {
  __typename?: 'GetFoods';
  foods: Array<SavedFood>;
};

export type GetInvites = {
  __typename?: 'GetInvites';
  invites: Array<GroupInvites>;
};

export type GetMembers = {
  __typename?: 'GetMembers';
  members: Array<GroupMembers>;
};

export type GetWeightHistory = {
  __typename?: 'GetWeightHistory';
  weightHistory: Array<WeightHistory>;
};

export type GetWorkoutEntries = {
  __typename?: 'GetWorkoutEntries';
  workoutDiary: Array<WorkoutDiary>;
};

export type GetWorkouts = {
  __typename?: 'GetWorkouts';
  workouts: Array<SavedWorkout>;
};

export type Group = {
  __typename?: 'Group';
  createdAt: Scalars['String'];
  creatorId: Scalars['Float'];
  id: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type GroupActivity = {
  __typename?: 'GroupActivity';
  createdAt: Scalars['String'];
  foodDiary?: Maybe<FoodDiary>;
  foodDiaryId?: Maybe<Scalars['Float']>;
  groupId: Scalars['Float'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['Float'];
  weightHistory?: Maybe<WeightHistory>;
  weightHistoryId?: Maybe<Scalars['Float']>;
  workoutDiary?: Maybe<WorkoutDiary>;
  workoutDiaryId?: Maybe<Scalars['Float']>;
};

export type GroupError = {
  __typename?: 'GroupError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GroupInvites = {
  __typename?: 'GroupInvites';
  createdAt: Scalars['String'];
  group: Group;
  groupId: Scalars['Float'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  userMemberId: Scalars['Float'];
};

export type GroupMembers = {
  __typename?: 'GroupMembers';
  createdAt: Scalars['String'];
  groupId: Scalars['Float'];
  id: Scalars['Float'];
  isOwner: Scalars['Boolean'];
  updatedAt: Scalars['String'];
  user: User;
  userMemberId: Scalars['Float'];
};

export type GroupResponse = {
  __typename?: 'GroupResponse';
  errors?: Maybe<Array<GroupError>>;
  group?: Maybe<Group>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptResponse: Scalars['Boolean'];
  createActivity: Schedule;
  createGroup: GroupResponse;
  createInvite?: Maybe<GroupInvites>;
  createSavedFood: SavedFood;
  createSavedWorkout: SavedWorkout;
  createWeightEntry: WeightHistory;
  declineResponse: Scalars['Boolean'];
  deleteActivity: Scalars['Boolean'];
  deleteFoodDiaryEntry: Scalars['Boolean'];
  deleteGroup: Scalars['Boolean'];
  deleteSavedFood: Scalars['Boolean'];
  deleteSavedWorkout: Scalars['Boolean'];
  deleteWorkoutDiaryEntry: Scalars['Boolean'];
  editUserDetails: UserResponse;
  kickMember: Scalars['Boolean'];
  leaveGroup: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  newFoodDiaryEntry: FoodDiary;
  newWorkoutDiaryEntry: WorkoutDiary;
  register: UserResponse;
  signS3: S3Payload;
  updateSavedFood?: Maybe<SavedFood>;
  updateSavedWorkout?: Maybe<SavedWorkout>;
};


export type MutationCreateActivityArgs = {
  input: ScheduleInput;
};


export type MutationCreateGroupArgs = {
  name: Scalars['String'];
};


export type MutationCreateInviteArgs = {
  username: Scalars['String'];
};


export type MutationCreateSavedFoodArgs = {
  input: SavedFoodInput;
};


export type MutationCreateSavedWorkoutArgs = {
  input: SavedWorkoutInput;
};


export type MutationCreateWeightEntryArgs = {
  weight: Scalars['Float'];
};


export type MutationDeleteActivityArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteFoodDiaryEntryArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteGroupArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteSavedFoodArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteSavedWorkoutArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteWorkoutDiaryEntryArgs = {
  id: Scalars['Int'];
};


export type MutationEditUserDetailsArgs = {
  activityLevel?: InputMaybe<Scalars['String']>;
  age?: InputMaybe<Scalars['Int']>;
  avatar?: InputMaybe<Scalars['String']>;
  currentWeight?: InputMaybe<Scalars['Int']>;
  displayName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  goalWeight?: InputMaybe<Scalars['Int']>;
  heightFeet?: InputMaybe<Scalars['Int']>;
  heightInches?: InputMaybe<Scalars['Int']>;
};


export type MutationKickMemberArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationNewFoodDiaryEntryArgs = {
  input: FoodDiaryInput;
};


export type MutationNewWorkoutDiaryEntryArgs = {
  input: WorkoutDiaryInput;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationSignS3Args = {
  filename: Scalars['String'];
  filetype: Scalars['String'];
};


export type MutationUpdateSavedFoodArgs = {
  id: Scalars['Int'];
  input: SavedFoodInput;
};


export type MutationUpdateSavedWorkoutArgs = {
  id: Scalars['Int'];
  input: SavedWorkoutInput;
};

export type PaginatedActivity = {
  __typename?: 'PaginatedActivity';
  activities: Array<GroupActivity>;
  hasMore: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  activities: PaginatedActivity;
  activitiesByUser: GetActivities;
  checkIfInGroup: Scalars['Boolean'];
  checkIfOwner: Scalars['Boolean'];
  foods: GetFoods;
  getActivityByUserByDay: GetActivities;
  getFoodDiary: GetFoodEntries;
  getGroupByUser: Group;
  getGroupMembers: GetMembers;
  getInvites: GetInvites;
  getWeightHistoryByUser: GetWeightHistory;
  getWorkoutDiary: GetWorkoutEntries;
  me?: Maybe<User>;
  workouts: GetWorkouts;
};


export type QueryActivitiesArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryFoodsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type QueryGetActivityByUserByDayArgs = {
  day: Scalars['String'];
};


export type QueryGetFoodDiaryArgs = {
  date: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryGetGroupMembersArgs = {
  id: Scalars['Int'];
};


export type QueryGetWorkoutDiaryArgs = {
  date: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryWorkoutsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type S3Payload = {
  __typename?: 'S3Payload';
  signedRequest: Scalars['String'];
  url: Scalars['String'];
};

export type SavedFood = {
  __typename?: 'SavedFood';
  calories: Scalars['Float'];
  carbs: Scalars['Float'];
  createdAt: Scalars['String'];
  fat: Scalars['Float'];
  foodDiary?: Maybe<FoodDiary>;
  id: Scalars['Float'];
  pictureUrl?: Maybe<Scalars['String']>;
  protein: Scalars['Float'];
  serving: Scalars['Float'];
  title: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['Float'];
};

export type SavedFoodInput = {
  calories?: InputMaybe<Scalars['Float']>;
  carbs?: InputMaybe<Scalars['Float']>;
  fat?: InputMaybe<Scalars['Float']>;
  pictureUrl?: InputMaybe<Scalars['String']>;
  protein?: InputMaybe<Scalars['Float']>;
  serving?: InputMaybe<Scalars['Float']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type SavedWorkout = {
  __typename?: 'SavedWorkout';
  createdAt: Scalars['String'];
  duration?: Maybe<Scalars['Float']>;
  id: Scalars['Float'];
  reps?: Maybe<Scalars['String']>;
  sets?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['Float'];
  weight?: Maybe<Scalars['Float']>;
};

export type SavedWorkoutInput = {
  duration?: InputMaybe<Scalars['Float']>;
  reps?: InputMaybe<Scalars['String']>;
  sets?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['Float']>;
};

export type Schedule = {
  __typename?: 'Schedule';
  createdAt: Scalars['String'];
  day: Scalars['String'];
  duration: Scalars['Float'];
  id: Scalars['Float'];
  title: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['Float'];
};

export type ScheduleInput = {
  day?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Float']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  activityLevel?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Float']>;
  avatar?: Maybe<Scalars['String']>;
  calorieTarget?: Maybe<Scalars['Float']>;
  createdAt: Scalars['String'];
  currentWeight?: Maybe<Scalars['Float']>;
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  goalWeight?: Maybe<Scalars['Float']>;
  heightFeet?: Maybe<Scalars['Float']>;
  heightInches?: Maybe<Scalars['Float']>;
  id: Scalars['Float'];
  totalActivitiesScheduled?: Maybe<Scalars['Float']>;
  totalMealsLogged?: Maybe<Scalars['Float']>;
  totalMealsSaved?: Maybe<Scalars['Float']>;
  totalWorkoutsLogged?: Maybe<Scalars['Float']>;
  totalWorkoutsSaved?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type WeightHistory = {
  __typename?: 'WeightHistory';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  previousWeight?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['Float'];
  weight: Scalars['Float'];
};

export type WorkoutDiary = {
  __typename?: 'WorkoutDiary';
  createdAt: Scalars['String'];
  duration?: Maybe<Scalars['Float']>;
  id: Scalars['Float'];
  type: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['Float'];
  weight?: Maybe<Scalars['Float']>;
  workout: SavedWorkout;
  workoutId: Scalars['Float'];
  workouts: SavedWorkout;
};

export type WorkoutDiaryInput = {
  duration?: InputMaybe<Scalars['Float']>;
  type: Scalars['String'];
  weight?: InputMaybe<Scalars['Float']>;
  workoutId: Scalars['Float'];
};

export type UserFragmentFragment = { __typename?: 'User', id: number, username: string, displayName?: string | null, email: string, avatar?: string | null, currentWeight?: number | null, goalWeight?: number | null, heightFeet?: number | null, heightInches?: number | null, age?: number | null, gender?: string | null, activityLevel?: string | null, calorieTarget?: number | null, totalWorkoutsLogged?: number | null, totalMealsLogged?: number | null, totalWorkoutsSaved?: number | null, totalMealsSaved?: number | null, totalActivitiesScheduled?: number | null, createdAt: string, updatedAt: string };

export type EditUserDetailsMutationVariables = Exact<{
  displayName?: InputMaybe<Scalars['String']>;
  currentWeight?: InputMaybe<Scalars['Int']>;
  goalWeight?: InputMaybe<Scalars['Int']>;
  heightFeet?: InputMaybe<Scalars['Int']>;
  heightInches?: InputMaybe<Scalars['Int']>;
  age?: InputMaybe<Scalars['Int']>;
  gender?: InputMaybe<Scalars['String']>;
  activityLevel?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
}>;


export type EditUserDetailsMutation = { __typename?: 'Mutation', editUserDetails: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, displayName?: string | null, email: string, avatar?: string | null, currentWeight?: number | null, goalWeight?: number | null, heightFeet?: number | null, heightInches?: number | null, age?: number | null, gender?: string | null, activityLevel?: string | null, calorieTarget?: number | null, totalWorkoutsLogged?: number | null, totalMealsLogged?: number | null, totalWorkoutsSaved?: number | null, totalMealsSaved?: number | null, totalActivitiesScheduled?: number | null, createdAt: string, updatedAt: string } | null } };

export type CreateSavedFoodMutationVariables = Exact<{
  input: SavedFoodInput;
}>;


export type CreateSavedFoodMutation = { __typename?: 'Mutation', createSavedFood: { __typename?: 'SavedFood', id: number, title: string, serving: number, calories: number, protein: number, carbs: number, fat: number, type: string, pictureUrl?: string | null, createdAt: string, updatedAt: string } };

export type DeleteFoodDiaryEntryMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteFoodDiaryEntryMutation = { __typename?: 'Mutation', deleteFoodDiaryEntry: boolean };

export type DeleteSavedFoodMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteSavedFoodMutation = { __typename?: 'Mutation', deleteSavedFood: boolean };

export type NewFoodDiaryEntryMutationVariables = Exact<{
  input: FoodDiaryInput;
}>;


export type NewFoodDiaryEntryMutation = { __typename?: 'Mutation', newFoodDiaryEntry: { __typename?: 'FoodDiary', id: number, type: string, calorieTarget: number, userId: number, createdAt: string, updatedAt: string } };

export type AcceptResponseMutationVariables = Exact<{ [key: string]: never; }>;


export type AcceptResponseMutation = { __typename?: 'Mutation', acceptResponse: boolean };

export type CreateGroupMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'GroupResponse', errors?: Array<{ __typename?: 'GroupError', field: string, message: string }> | null, group?: { __typename?: 'Group', id: number, name: string, createdAt: string, updatedAt: string, creatorId: number } | null } };

export type CreateInviteMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type CreateInviteMutation = { __typename?: 'Mutation', createInvite?: { __typename?: 'GroupInvites', id: number, createdAt: string, updatedAt: string, groupId: number, userMemberId: number } | null };

export type DeclineResponseMutationVariables = Exact<{ [key: string]: never; }>;


export type DeclineResponseMutation = { __typename?: 'Mutation', declineResponse: boolean };

export type DeleteGroupMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteGroupMutation = { __typename?: 'Mutation', deleteGroup: boolean };

export type KickMemberMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type KickMemberMutation = { __typename?: 'Mutation', kickMember: boolean };

export type LeaveGroupMutationVariables = Exact<{ [key: string]: never; }>;


export type LeaveGroupMutation = { __typename?: 'Mutation', leaveGroup: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, displayName?: string | null, email: string, avatar?: string | null, currentWeight?: number | null, goalWeight?: number | null, heightFeet?: number | null, heightInches?: number | null, age?: number | null, gender?: string | null, activityLevel?: string | null, calorieTarget?: number | null, totalWorkoutsLogged?: number | null, totalMealsLogged?: number | null, totalWorkoutsSaved?: number | null, totalMealsSaved?: number | null, totalActivitiesScheduled?: number | null, createdAt: string, updatedAt: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, displayName?: string | null, email: string, avatar?: string | null, currentWeight?: number | null, goalWeight?: number | null, heightFeet?: number | null, heightInches?: number | null, age?: number | null, gender?: string | null, activityLevel?: string | null, calorieTarget?: number | null, totalWorkoutsLogged?: number | null, totalMealsLogged?: number | null, totalWorkoutsSaved?: number | null, totalMealsSaved?: number | null, totalActivitiesScheduled?: number | null, createdAt: string, updatedAt: string } | null } };

export type CreateActivityMutationVariables = Exact<{
  input: ScheduleInput;
}>;


export type CreateActivityMutation = { __typename?: 'Mutation', createActivity: { __typename?: 'Schedule', id: number, title: string, type: string, day: string, duration: number, createdAt: string, updatedAt: string } };

export type DeleteActivityMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteActivityMutation = { __typename?: 'Mutation', deleteActivity: boolean };

export type SignS3MutationVariables = Exact<{
  filetype: Scalars['String'];
  filename: Scalars['String'];
}>;


export type SignS3Mutation = { __typename?: 'Mutation', signS3: { __typename?: 'S3Payload', signedRequest: string, url: string } };

export type CreateWeightEntryMutationVariables = Exact<{
  weight: Scalars['Float'];
}>;


export type CreateWeightEntryMutation = { __typename?: 'Mutation', createWeightEntry: { __typename?: 'WeightHistory', id: number, weight: number, createdAt: string, updatedAt: string } };

export type CreatedSavedWorkoutMutationVariables = Exact<{
  input: SavedWorkoutInput;
}>;


export type CreatedSavedWorkoutMutation = { __typename?: 'Mutation', createSavedWorkout: { __typename?: 'SavedWorkout', id: number, title: string, type: string, sets?: string | null, reps?: string | null, weight?: number | null, duration?: number | null, createdAt: string, updatedAt: string } };

export type DeleteSavedWorkoutMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteSavedWorkoutMutation = { __typename?: 'Mutation', deleteSavedWorkout: boolean };

export type DeleteWorkoutDiaryEntryMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteWorkoutDiaryEntryMutation = { __typename?: 'Mutation', deleteWorkoutDiaryEntry: boolean };

export type NewWorkoutDiaryEntryMutationVariables = Exact<{
  input: WorkoutDiaryInput;
}>;


export type NewWorkoutDiaryEntryMutation = { __typename?: 'Mutation', newWorkoutDiaryEntry: { __typename?: 'WorkoutDiary', id: number, type: string, weight?: number | null, duration?: number | null, createdAt: string, updatedAt: string } };

export type GetFoodDiaryQueryVariables = Exact<{
  date: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetFoodDiaryQuery = { __typename?: 'Query', getFoodDiary: { __typename?: 'GetFoodEntries', foodDiary: Array<{ __typename?: 'FoodDiary', id: number, type: string, calorieTarget: number, createdAt: string, food: { __typename?: 'SavedFood', id: number, title: string, serving: number, calories: number, protein: number, carbs: number, fat: number, type: string, createdAt: string, updatedAt: string } }> } };

export type FoodsQueryVariables = Exact<{
  type?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
}>;


export type FoodsQuery = { __typename?: 'Query', foods: { __typename?: 'GetFoods', foods: Array<{ __typename?: 'SavedFood', id: number, title: string, serving: number, calories: number, protein: number, carbs: number, fat: number, type: string, pictureUrl?: string | null, createdAt: string, updatedAt: string }> } };

export type ActivitiesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type ActivitiesQuery = { __typename?: 'Query', activities: { __typename?: 'PaginatedActivity', hasMore: boolean, activities: Array<{ __typename?: 'GroupActivity', id: number, createdAt: string, updatedAt: string, userId: number, foodDiaryId?: number | null, workoutDiaryId?: number | null, weightHistoryId?: number | null, groupId: number, foodDiary?: { __typename?: 'FoodDiary', id: number, type: string, createdAt: string, updatedAt: string, food: { __typename?: 'SavedFood', id: number, calories: number, serving: number, protein: number, fat: number, carbs: number, title: string, pictureUrl?: string | null, type: string } } | null, workoutDiary?: { __typename?: 'WorkoutDiary', id: number, type: string, weight?: number | null, duration?: number | null, createdAt: string, updatedAt: string, workout: { __typename?: 'SavedWorkout', id: number, title: string, type: string, sets?: string | null, reps?: string | null } } | null, weightHistory?: { __typename?: 'WeightHistory', id: number, weight: number, previousWeight?: number | null, createdAt: string, updatedAt: string } | null, user: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } }> } };

export type CheckIfInGroupQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckIfInGroupQuery = { __typename?: 'Query', checkIfInGroup: boolean };

export type GetGroupByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGroupByUserQuery = { __typename?: 'Query', getGroupByUser: { __typename?: 'Group', id: number, name: string, createdAt: string, updatedAt: string, creatorId: number } };

export type GetGroupMembersQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetGroupMembersQuery = { __typename?: 'Query', getGroupMembers: { __typename?: 'GetMembers', members: Array<{ __typename?: 'GroupMembers', id: number, createdAt: string, updatedAt: string, groupId: number, userMemberId: number, isOwner: boolean, user: { __typename?: 'User', id: number, username: string, displayName?: string | null, avatar?: string | null } }> } };

export type GetInvitesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInvitesQuery = { __typename?: 'Query', getInvites: { __typename?: 'GetInvites', invites: Array<{ __typename?: 'GroupInvites', id: number, createdAt: string, updatedAt: string, groupId: number, userMemberId: number, group: { __typename?: 'Group', id: number, name: string, createdAt: string, updatedAt: string, creatorId: number } }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, displayName?: string | null, email: string, avatar?: string | null, currentWeight?: number | null, goalWeight?: number | null, heightFeet?: number | null, heightInches?: number | null, age?: number | null, gender?: string | null, activityLevel?: string | null, calorieTarget?: number | null, totalWorkoutsLogged?: number | null, totalMealsLogged?: number | null, totalWorkoutsSaved?: number | null, totalMealsSaved?: number | null, totalActivitiesScheduled?: number | null, createdAt: string, updatedAt: string } | null };

export type ActivitiesByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type ActivitiesByUserQuery = { __typename?: 'Query', activitiesByUser: { __typename?: 'GetActivities', activities: Array<{ __typename?: 'Schedule', id: number, title: string, type: string, day: string, duration: number, createdAt: string, updatedAt: string }> } };

export type ActivitiesByUserByDayQueryVariables = Exact<{
  day: Scalars['String'];
}>;


export type ActivitiesByUserByDayQuery = { __typename?: 'Query', getActivityByUserByDay: { __typename?: 'GetActivities', activities: Array<{ __typename?: 'Schedule', id: number, title: string, type: string, day: string, duration: number, createdAt: string, updatedAt: string }> } };

export type GetWeightHistoryByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWeightHistoryByUserQuery = { __typename?: 'Query', getWeightHistoryByUser: { __typename?: 'GetWeightHistory', weightHistory: Array<{ __typename?: 'WeightHistory', id: number, weight: number, createdAt: string, updatedAt: string }> } };

export type GetWorkoutDiaryQueryVariables = Exact<{
  date: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetWorkoutDiaryQuery = { __typename?: 'Query', getWorkoutDiary: { __typename?: 'GetWorkoutEntries', workoutDiary: Array<{ __typename?: 'WorkoutDiary', id: number, type: string, weight?: number | null, duration?: number | null, createdAt: string, updatedAt: string, workout: { __typename?: 'SavedWorkout', id: number, title: string, type: string, sets?: string | null, reps?: string | null, weight?: number | null, duration?: number | null, createdAt: string, updatedAt: string } }> } };

export type WorkoutsQueryVariables = Exact<{
  type?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
}>;


export type WorkoutsQuery = { __typename?: 'Query', workouts: { __typename?: 'GetWorkouts', workouts: Array<{ __typename?: 'SavedWorkout', id: number, title: string, type: string, sets?: string | null, reps?: string | null, weight?: number | null, duration?: number | null, createdAt: string, updatedAt: string }> } };

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  username
  displayName
  email
  avatar
  currentWeight
  goalWeight
  heightFeet
  heightInches
  age
  gender
  activityLevel
  calorieTarget
  totalWorkoutsLogged
  totalMealsLogged
  totalWorkoutsSaved
  totalMealsSaved
  totalActivitiesScheduled
  createdAt
  updatedAt
}
    `;
export const EditUserDetailsDocument = gql`
    mutation EditUserDetails($displayName: String, $currentWeight: Int, $goalWeight: Int, $heightFeet: Int, $heightInches: Int, $age: Int, $gender: String, $activityLevel: String, $avatar: String) {
  editUserDetails(
    displayName: $displayName
    currentWeight: $currentWeight
    goalWeight: $goalWeight
    heightFeet: $heightFeet
    heightInches: $heightInches
    age: $age
    gender: $gender
    activityLevel: $activityLevel
    avatar: $avatar
  ) {
    errors {
      field
      message
    }
    user {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;
export type EditUserDetailsMutationFn = Apollo.MutationFunction<EditUserDetailsMutation, EditUserDetailsMutationVariables>;

/**
 * __useEditUserDetailsMutation__
 *
 * To run a mutation, you first call `useEditUserDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserDetailsMutation, { data, loading, error }] = useEditUserDetailsMutation({
 *   variables: {
 *      displayName: // value for 'displayName'
 *      currentWeight: // value for 'currentWeight'
 *      goalWeight: // value for 'goalWeight'
 *      heightFeet: // value for 'heightFeet'
 *      heightInches: // value for 'heightInches'
 *      age: // value for 'age'
 *      gender: // value for 'gender'
 *      activityLevel: // value for 'activityLevel'
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useEditUserDetailsMutation(baseOptions?: Apollo.MutationHookOptions<EditUserDetailsMutation, EditUserDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserDetailsMutation, EditUserDetailsMutationVariables>(EditUserDetailsDocument, options);
      }
export type EditUserDetailsMutationHookResult = ReturnType<typeof useEditUserDetailsMutation>;
export type EditUserDetailsMutationResult = Apollo.MutationResult<EditUserDetailsMutation>;
export type EditUserDetailsMutationOptions = Apollo.BaseMutationOptions<EditUserDetailsMutation, EditUserDetailsMutationVariables>;
export const CreateSavedFoodDocument = gql`
    mutation CreateSavedFood($input: SavedFoodInput!) {
  createSavedFood(input: $input) {
    id
    title
    serving
    calories
    protein
    carbs
    fat
    type
    pictureUrl
    createdAt
    updatedAt
  }
}
    `;
export type CreateSavedFoodMutationFn = Apollo.MutationFunction<CreateSavedFoodMutation, CreateSavedFoodMutationVariables>;

/**
 * __useCreateSavedFoodMutation__
 *
 * To run a mutation, you first call `useCreateSavedFoodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSavedFoodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSavedFoodMutation, { data, loading, error }] = useCreateSavedFoodMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSavedFoodMutation(baseOptions?: Apollo.MutationHookOptions<CreateSavedFoodMutation, CreateSavedFoodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSavedFoodMutation, CreateSavedFoodMutationVariables>(CreateSavedFoodDocument, options);
      }
export type CreateSavedFoodMutationHookResult = ReturnType<typeof useCreateSavedFoodMutation>;
export type CreateSavedFoodMutationResult = Apollo.MutationResult<CreateSavedFoodMutation>;
export type CreateSavedFoodMutationOptions = Apollo.BaseMutationOptions<CreateSavedFoodMutation, CreateSavedFoodMutationVariables>;
export const DeleteFoodDiaryEntryDocument = gql`
    mutation DeleteFoodDiaryEntry($id: Int!) {
  deleteFoodDiaryEntry(id: $id)
}
    `;
export type DeleteFoodDiaryEntryMutationFn = Apollo.MutationFunction<DeleteFoodDiaryEntryMutation, DeleteFoodDiaryEntryMutationVariables>;

/**
 * __useDeleteFoodDiaryEntryMutation__
 *
 * To run a mutation, you first call `useDeleteFoodDiaryEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFoodDiaryEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFoodDiaryEntryMutation, { data, loading, error }] = useDeleteFoodDiaryEntryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFoodDiaryEntryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFoodDiaryEntryMutation, DeleteFoodDiaryEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFoodDiaryEntryMutation, DeleteFoodDiaryEntryMutationVariables>(DeleteFoodDiaryEntryDocument, options);
      }
export type DeleteFoodDiaryEntryMutationHookResult = ReturnType<typeof useDeleteFoodDiaryEntryMutation>;
export type DeleteFoodDiaryEntryMutationResult = Apollo.MutationResult<DeleteFoodDiaryEntryMutation>;
export type DeleteFoodDiaryEntryMutationOptions = Apollo.BaseMutationOptions<DeleteFoodDiaryEntryMutation, DeleteFoodDiaryEntryMutationVariables>;
export const DeleteSavedFoodDocument = gql`
    mutation DeleteSavedFood($id: Int!) {
  deleteSavedFood(id: $id)
}
    `;
export type DeleteSavedFoodMutationFn = Apollo.MutationFunction<DeleteSavedFoodMutation, DeleteSavedFoodMutationVariables>;

/**
 * __useDeleteSavedFoodMutation__
 *
 * To run a mutation, you first call `useDeleteSavedFoodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSavedFoodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSavedFoodMutation, { data, loading, error }] = useDeleteSavedFoodMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSavedFoodMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSavedFoodMutation, DeleteSavedFoodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSavedFoodMutation, DeleteSavedFoodMutationVariables>(DeleteSavedFoodDocument, options);
      }
export type DeleteSavedFoodMutationHookResult = ReturnType<typeof useDeleteSavedFoodMutation>;
export type DeleteSavedFoodMutationResult = Apollo.MutationResult<DeleteSavedFoodMutation>;
export type DeleteSavedFoodMutationOptions = Apollo.BaseMutationOptions<DeleteSavedFoodMutation, DeleteSavedFoodMutationVariables>;
export const NewFoodDiaryEntryDocument = gql`
    mutation NewFoodDiaryEntry($input: FoodDiaryInput!) {
  newFoodDiaryEntry(input: $input) {
    id
    type
    calorieTarget
    userId
    createdAt
    updatedAt
  }
}
    `;
export type NewFoodDiaryEntryMutationFn = Apollo.MutationFunction<NewFoodDiaryEntryMutation, NewFoodDiaryEntryMutationVariables>;

/**
 * __useNewFoodDiaryEntryMutation__
 *
 * To run a mutation, you first call `useNewFoodDiaryEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewFoodDiaryEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newFoodDiaryEntryMutation, { data, loading, error }] = useNewFoodDiaryEntryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNewFoodDiaryEntryMutation(baseOptions?: Apollo.MutationHookOptions<NewFoodDiaryEntryMutation, NewFoodDiaryEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewFoodDiaryEntryMutation, NewFoodDiaryEntryMutationVariables>(NewFoodDiaryEntryDocument, options);
      }
export type NewFoodDiaryEntryMutationHookResult = ReturnType<typeof useNewFoodDiaryEntryMutation>;
export type NewFoodDiaryEntryMutationResult = Apollo.MutationResult<NewFoodDiaryEntryMutation>;
export type NewFoodDiaryEntryMutationOptions = Apollo.BaseMutationOptions<NewFoodDiaryEntryMutation, NewFoodDiaryEntryMutationVariables>;
export const AcceptResponseDocument = gql`
    mutation AcceptResponse {
  acceptResponse
}
    `;
export type AcceptResponseMutationFn = Apollo.MutationFunction<AcceptResponseMutation, AcceptResponseMutationVariables>;

/**
 * __useAcceptResponseMutation__
 *
 * To run a mutation, you first call `useAcceptResponseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptResponseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptResponseMutation, { data, loading, error }] = useAcceptResponseMutation({
 *   variables: {
 *   },
 * });
 */
export function useAcceptResponseMutation(baseOptions?: Apollo.MutationHookOptions<AcceptResponseMutation, AcceptResponseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptResponseMutation, AcceptResponseMutationVariables>(AcceptResponseDocument, options);
      }
export type AcceptResponseMutationHookResult = ReturnType<typeof useAcceptResponseMutation>;
export type AcceptResponseMutationResult = Apollo.MutationResult<AcceptResponseMutation>;
export type AcceptResponseMutationOptions = Apollo.BaseMutationOptions<AcceptResponseMutation, AcceptResponseMutationVariables>;
export const CreateGroupDocument = gql`
    mutation CreateGroup($name: String!) {
  createGroup(name: $name) {
    errors {
      field
      message
    }
    group {
      id
      name
      createdAt
      updatedAt
      creatorId
    }
  }
}
    `;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const CreateInviteDocument = gql`
    mutation CreateInvite($username: String!) {
  createInvite(username: $username) {
    id
    createdAt
    updatedAt
    groupId
    userMemberId
  }
}
    `;
export type CreateInviteMutationFn = Apollo.MutationFunction<CreateInviteMutation, CreateInviteMutationVariables>;

/**
 * __useCreateInviteMutation__
 *
 * To run a mutation, you first call `useCreateInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInviteMutation, { data, loading, error }] = useCreateInviteMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCreateInviteMutation(baseOptions?: Apollo.MutationHookOptions<CreateInviteMutation, CreateInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInviteMutation, CreateInviteMutationVariables>(CreateInviteDocument, options);
      }
export type CreateInviteMutationHookResult = ReturnType<typeof useCreateInviteMutation>;
export type CreateInviteMutationResult = Apollo.MutationResult<CreateInviteMutation>;
export type CreateInviteMutationOptions = Apollo.BaseMutationOptions<CreateInviteMutation, CreateInviteMutationVariables>;
export const DeclineResponseDocument = gql`
    mutation DeclineResponse {
  declineResponse
}
    `;
export type DeclineResponseMutationFn = Apollo.MutationFunction<DeclineResponseMutation, DeclineResponseMutationVariables>;

/**
 * __useDeclineResponseMutation__
 *
 * To run a mutation, you first call `useDeclineResponseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineResponseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineResponseMutation, { data, loading, error }] = useDeclineResponseMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeclineResponseMutation(baseOptions?: Apollo.MutationHookOptions<DeclineResponseMutation, DeclineResponseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineResponseMutation, DeclineResponseMutationVariables>(DeclineResponseDocument, options);
      }
export type DeclineResponseMutationHookResult = ReturnType<typeof useDeclineResponseMutation>;
export type DeclineResponseMutationResult = Apollo.MutationResult<DeclineResponseMutation>;
export type DeclineResponseMutationOptions = Apollo.BaseMutationOptions<DeclineResponseMutation, DeclineResponseMutationVariables>;
export const DeleteGroupDocument = gql`
    mutation DeleteGroup($id: Int!) {
  deleteGroup(id: $id)
}
    `;
export type DeleteGroupMutationFn = Apollo.MutationFunction<DeleteGroupMutation, DeleteGroupMutationVariables>;

/**
 * __useDeleteGroupMutation__
 *
 * To run a mutation, you first call `useDeleteGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGroupMutation, { data, loading, error }] = useDeleteGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGroupMutation, DeleteGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGroupMutation, DeleteGroupMutationVariables>(DeleteGroupDocument, options);
      }
export type DeleteGroupMutationHookResult = ReturnType<typeof useDeleteGroupMutation>;
export type DeleteGroupMutationResult = Apollo.MutationResult<DeleteGroupMutation>;
export type DeleteGroupMutationOptions = Apollo.BaseMutationOptions<DeleteGroupMutation, DeleteGroupMutationVariables>;
export const KickMemberDocument = gql`
    mutation KickMember($id: Int!) {
  kickMember(id: $id)
}
    `;
export type KickMemberMutationFn = Apollo.MutationFunction<KickMemberMutation, KickMemberMutationVariables>;

/**
 * __useKickMemberMutation__
 *
 * To run a mutation, you first call `useKickMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useKickMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [kickMemberMutation, { data, loading, error }] = useKickMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useKickMemberMutation(baseOptions?: Apollo.MutationHookOptions<KickMemberMutation, KickMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<KickMemberMutation, KickMemberMutationVariables>(KickMemberDocument, options);
      }
export type KickMemberMutationHookResult = ReturnType<typeof useKickMemberMutation>;
export type KickMemberMutationResult = Apollo.MutationResult<KickMemberMutation>;
export type KickMemberMutationOptions = Apollo.BaseMutationOptions<KickMemberMutation, KickMemberMutationVariables>;
export const LeaveGroupDocument = gql`
    mutation LeaveGroup {
  leaveGroup
}
    `;
export type LeaveGroupMutationFn = Apollo.MutationFunction<LeaveGroupMutation, LeaveGroupMutationVariables>;

/**
 * __useLeaveGroupMutation__
 *
 * To run a mutation, you first call `useLeaveGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveGroupMutation, { data, loading, error }] = useLeaveGroupMutation({
 *   variables: {
 *   },
 * });
 */
export function useLeaveGroupMutation(baseOptions?: Apollo.MutationHookOptions<LeaveGroupMutation, LeaveGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveGroupMutation, LeaveGroupMutationVariables>(LeaveGroupDocument, options);
      }
export type LeaveGroupMutationHookResult = ReturnType<typeof useLeaveGroupMutation>;
export type LeaveGroupMutationResult = Apollo.MutationResult<LeaveGroupMutation>;
export type LeaveGroupMutationOptions = Apollo.BaseMutationOptions<LeaveGroupMutation, LeaveGroupMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    errors {
      field
      message
    }
    user {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String!) {
  register(username: $username, password: $password, email: $email) {
    errors {
      field
      message
    }
    user {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const CreateActivityDocument = gql`
    mutation CreateActivity($input: ScheduleInput!) {
  createActivity(input: $input) {
    id
    title
    type
    day
    duration
    createdAt
    updatedAt
  }
}
    `;
export type CreateActivityMutationFn = Apollo.MutationFunction<CreateActivityMutation, CreateActivityMutationVariables>;

/**
 * __useCreateActivityMutation__
 *
 * To run a mutation, you first call `useCreateActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createActivityMutation, { data, loading, error }] = useCreateActivityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateActivityMutation(baseOptions?: Apollo.MutationHookOptions<CreateActivityMutation, CreateActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateActivityMutation, CreateActivityMutationVariables>(CreateActivityDocument, options);
      }
export type CreateActivityMutationHookResult = ReturnType<typeof useCreateActivityMutation>;
export type CreateActivityMutationResult = Apollo.MutationResult<CreateActivityMutation>;
export type CreateActivityMutationOptions = Apollo.BaseMutationOptions<CreateActivityMutation, CreateActivityMutationVariables>;
export const DeleteActivityDocument = gql`
    mutation DeleteActivity($id: Int!) {
  deleteActivity(id: $id)
}
    `;
export type DeleteActivityMutationFn = Apollo.MutationFunction<DeleteActivityMutation, DeleteActivityMutationVariables>;

/**
 * __useDeleteActivityMutation__
 *
 * To run a mutation, you first call `useDeleteActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteActivityMutation, { data, loading, error }] = useDeleteActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteActivityMutation(baseOptions?: Apollo.MutationHookOptions<DeleteActivityMutation, DeleteActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteActivityMutation, DeleteActivityMutationVariables>(DeleteActivityDocument, options);
      }
export type DeleteActivityMutationHookResult = ReturnType<typeof useDeleteActivityMutation>;
export type DeleteActivityMutationResult = Apollo.MutationResult<DeleteActivityMutation>;
export type DeleteActivityMutationOptions = Apollo.BaseMutationOptions<DeleteActivityMutation, DeleteActivityMutationVariables>;
export const SignS3Document = gql`
    mutation SignS3($filetype: String!, $filename: String!) {
  signS3(filetype: $filetype, filename: $filename) {
    signedRequest
    url
  }
}
    `;
export type SignS3MutationFn = Apollo.MutationFunction<SignS3Mutation, SignS3MutationVariables>;

/**
 * __useSignS3Mutation__
 *
 * To run a mutation, you first call `useSignS3Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignS3Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signS3Mutation, { data, loading, error }] = useSignS3Mutation({
 *   variables: {
 *      filetype: // value for 'filetype'
 *      filename: // value for 'filename'
 *   },
 * });
 */
export function useSignS3Mutation(baseOptions?: Apollo.MutationHookOptions<SignS3Mutation, SignS3MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignS3Mutation, SignS3MutationVariables>(SignS3Document, options);
      }
export type SignS3MutationHookResult = ReturnType<typeof useSignS3Mutation>;
export type SignS3MutationResult = Apollo.MutationResult<SignS3Mutation>;
export type SignS3MutationOptions = Apollo.BaseMutationOptions<SignS3Mutation, SignS3MutationVariables>;
export const CreateWeightEntryDocument = gql`
    mutation CreateWeightEntry($weight: Float!) {
  createWeightEntry(weight: $weight) {
    id
    weight
    createdAt
    updatedAt
  }
}
    `;
export type CreateWeightEntryMutationFn = Apollo.MutationFunction<CreateWeightEntryMutation, CreateWeightEntryMutationVariables>;

/**
 * __useCreateWeightEntryMutation__
 *
 * To run a mutation, you first call `useCreateWeightEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWeightEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWeightEntryMutation, { data, loading, error }] = useCreateWeightEntryMutation({
 *   variables: {
 *      weight: // value for 'weight'
 *   },
 * });
 */
export function useCreateWeightEntryMutation(baseOptions?: Apollo.MutationHookOptions<CreateWeightEntryMutation, CreateWeightEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWeightEntryMutation, CreateWeightEntryMutationVariables>(CreateWeightEntryDocument, options);
      }
export type CreateWeightEntryMutationHookResult = ReturnType<typeof useCreateWeightEntryMutation>;
export type CreateWeightEntryMutationResult = Apollo.MutationResult<CreateWeightEntryMutation>;
export type CreateWeightEntryMutationOptions = Apollo.BaseMutationOptions<CreateWeightEntryMutation, CreateWeightEntryMutationVariables>;
export const CreatedSavedWorkoutDocument = gql`
    mutation CreatedSavedWorkout($input: SavedWorkoutInput!) {
  createSavedWorkout(input: $input) {
    id
    title
    type
    sets
    reps
    weight
    duration
    createdAt
    updatedAt
  }
}
    `;
export type CreatedSavedWorkoutMutationFn = Apollo.MutationFunction<CreatedSavedWorkoutMutation, CreatedSavedWorkoutMutationVariables>;

/**
 * __useCreatedSavedWorkoutMutation__
 *
 * To run a mutation, you first call `useCreatedSavedWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatedSavedWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createdSavedWorkoutMutation, { data, loading, error }] = useCreatedSavedWorkoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatedSavedWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<CreatedSavedWorkoutMutation, CreatedSavedWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatedSavedWorkoutMutation, CreatedSavedWorkoutMutationVariables>(CreatedSavedWorkoutDocument, options);
      }
export type CreatedSavedWorkoutMutationHookResult = ReturnType<typeof useCreatedSavedWorkoutMutation>;
export type CreatedSavedWorkoutMutationResult = Apollo.MutationResult<CreatedSavedWorkoutMutation>;
export type CreatedSavedWorkoutMutationOptions = Apollo.BaseMutationOptions<CreatedSavedWorkoutMutation, CreatedSavedWorkoutMutationVariables>;
export const DeleteSavedWorkoutDocument = gql`
    mutation DeleteSavedWorkout($id: Int!) {
  deleteSavedWorkout(id: $id)
}
    `;
export type DeleteSavedWorkoutMutationFn = Apollo.MutationFunction<DeleteSavedWorkoutMutation, DeleteSavedWorkoutMutationVariables>;

/**
 * __useDeleteSavedWorkoutMutation__
 *
 * To run a mutation, you first call `useDeleteSavedWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSavedWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSavedWorkoutMutation, { data, loading, error }] = useDeleteSavedWorkoutMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSavedWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSavedWorkoutMutation, DeleteSavedWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSavedWorkoutMutation, DeleteSavedWorkoutMutationVariables>(DeleteSavedWorkoutDocument, options);
      }
export type DeleteSavedWorkoutMutationHookResult = ReturnType<typeof useDeleteSavedWorkoutMutation>;
export type DeleteSavedWorkoutMutationResult = Apollo.MutationResult<DeleteSavedWorkoutMutation>;
export type DeleteSavedWorkoutMutationOptions = Apollo.BaseMutationOptions<DeleteSavedWorkoutMutation, DeleteSavedWorkoutMutationVariables>;
export const DeleteWorkoutDiaryEntryDocument = gql`
    mutation DeleteWorkoutDiaryEntry($id: Int!) {
  deleteWorkoutDiaryEntry(id: $id)
}
    `;
export type DeleteWorkoutDiaryEntryMutationFn = Apollo.MutationFunction<DeleteWorkoutDiaryEntryMutation, DeleteWorkoutDiaryEntryMutationVariables>;

/**
 * __useDeleteWorkoutDiaryEntryMutation__
 *
 * To run a mutation, you first call `useDeleteWorkoutDiaryEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkoutDiaryEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkoutDiaryEntryMutation, { data, loading, error }] = useDeleteWorkoutDiaryEntryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteWorkoutDiaryEntryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorkoutDiaryEntryMutation, DeleteWorkoutDiaryEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWorkoutDiaryEntryMutation, DeleteWorkoutDiaryEntryMutationVariables>(DeleteWorkoutDiaryEntryDocument, options);
      }
export type DeleteWorkoutDiaryEntryMutationHookResult = ReturnType<typeof useDeleteWorkoutDiaryEntryMutation>;
export type DeleteWorkoutDiaryEntryMutationResult = Apollo.MutationResult<DeleteWorkoutDiaryEntryMutation>;
export type DeleteWorkoutDiaryEntryMutationOptions = Apollo.BaseMutationOptions<DeleteWorkoutDiaryEntryMutation, DeleteWorkoutDiaryEntryMutationVariables>;
export const NewWorkoutDiaryEntryDocument = gql`
    mutation NewWorkoutDiaryEntry($input: WorkoutDiaryInput!) {
  newWorkoutDiaryEntry(input: $input) {
    id
    type
    weight
    duration
    createdAt
    updatedAt
  }
}
    `;
export type NewWorkoutDiaryEntryMutationFn = Apollo.MutationFunction<NewWorkoutDiaryEntryMutation, NewWorkoutDiaryEntryMutationVariables>;

/**
 * __useNewWorkoutDiaryEntryMutation__
 *
 * To run a mutation, you first call `useNewWorkoutDiaryEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewWorkoutDiaryEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newWorkoutDiaryEntryMutation, { data, loading, error }] = useNewWorkoutDiaryEntryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNewWorkoutDiaryEntryMutation(baseOptions?: Apollo.MutationHookOptions<NewWorkoutDiaryEntryMutation, NewWorkoutDiaryEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewWorkoutDiaryEntryMutation, NewWorkoutDiaryEntryMutationVariables>(NewWorkoutDiaryEntryDocument, options);
      }
export type NewWorkoutDiaryEntryMutationHookResult = ReturnType<typeof useNewWorkoutDiaryEntryMutation>;
export type NewWorkoutDiaryEntryMutationResult = Apollo.MutationResult<NewWorkoutDiaryEntryMutation>;
export type NewWorkoutDiaryEntryMutationOptions = Apollo.BaseMutationOptions<NewWorkoutDiaryEntryMutation, NewWorkoutDiaryEntryMutationVariables>;
export const GetFoodDiaryDocument = gql`
    query GetFoodDiary($date: String!, $limit: Int) {
  getFoodDiary(date: $date, limit: $limit) {
    foodDiary {
      id
      type
      calorieTarget
      createdAt
      food {
        id
        title
        serving
        calories
        protein
        carbs
        fat
        type
        createdAt
        updatedAt
      }
    }
  }
}
    `;

/**
 * __useGetFoodDiaryQuery__
 *
 * To run a query within a React component, call `useGetFoodDiaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFoodDiaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFoodDiaryQuery({
 *   variables: {
 *      date: // value for 'date'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetFoodDiaryQuery(baseOptions: Apollo.QueryHookOptions<GetFoodDiaryQuery, GetFoodDiaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFoodDiaryQuery, GetFoodDiaryQueryVariables>(GetFoodDiaryDocument, options);
      }
export function useGetFoodDiaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFoodDiaryQuery, GetFoodDiaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFoodDiaryQuery, GetFoodDiaryQueryVariables>(GetFoodDiaryDocument, options);
        }
export type GetFoodDiaryQueryHookResult = ReturnType<typeof useGetFoodDiaryQuery>;
export type GetFoodDiaryLazyQueryHookResult = ReturnType<typeof useGetFoodDiaryLazyQuery>;
export type GetFoodDiaryQueryResult = Apollo.QueryResult<GetFoodDiaryQuery, GetFoodDiaryQueryVariables>;
export const FoodsDocument = gql`
    query Foods($type: String, $cursor: String, $limit: Int, $title: String) {
  foods(cursor: $cursor, limit: $limit, type: $type, title: $title) {
    foods {
      id
      title
      serving
      calories
      protein
      carbs
      fat
      type
      pictureUrl
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useFoodsQuery__
 *
 * To run a query within a React component, call `useFoodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFoodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFoodsQuery({
 *   variables: {
 *      type: // value for 'type'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useFoodsQuery(baseOptions?: Apollo.QueryHookOptions<FoodsQuery, FoodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FoodsQuery, FoodsQueryVariables>(FoodsDocument, options);
      }
export function useFoodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FoodsQuery, FoodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FoodsQuery, FoodsQueryVariables>(FoodsDocument, options);
        }
export type FoodsQueryHookResult = ReturnType<typeof useFoodsQuery>;
export type FoodsLazyQueryHookResult = ReturnType<typeof useFoodsLazyQuery>;
export type FoodsQueryResult = Apollo.QueryResult<FoodsQuery, FoodsQueryVariables>;
export const ActivitiesDocument = gql`
    query Activities($limit: Int, $cursor: String) {
  activities(cursor: $cursor, limit: $limit) {
    activities {
      id
      createdAt
      updatedAt
      userId
      foodDiaryId
      workoutDiaryId
      weightHistoryId
      groupId
      foodDiary {
        id
        type
        createdAt
        updatedAt
        food {
          id
          calories
          serving
          protein
          fat
          carbs
          title
          pictureUrl
          type
        }
      }
      workoutDiary {
        id
        type
        weight
        duration
        createdAt
        updatedAt
        workout {
          id
          title
          type
          sets
          reps
        }
      }
      weightHistory {
        id
        weight
        previousWeight
        createdAt
        updatedAt
      }
      user {
        id
        username
        displayName
        avatar
      }
    }
    hasMore
  }
}
    `;

/**
 * __useActivitiesQuery__
 *
 * To run a query within a React component, call `useActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivitiesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useActivitiesQuery(baseOptions?: Apollo.QueryHookOptions<ActivitiesQuery, ActivitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivitiesQuery, ActivitiesQueryVariables>(ActivitiesDocument, options);
      }
export function useActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivitiesQuery, ActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivitiesQuery, ActivitiesQueryVariables>(ActivitiesDocument, options);
        }
export type ActivitiesQueryHookResult = ReturnType<typeof useActivitiesQuery>;
export type ActivitiesLazyQueryHookResult = ReturnType<typeof useActivitiesLazyQuery>;
export type ActivitiesQueryResult = Apollo.QueryResult<ActivitiesQuery, ActivitiesQueryVariables>;
export const CheckIfInGroupDocument = gql`
    query CheckIfInGroup {
  checkIfInGroup
}
    `;

/**
 * __useCheckIfInGroupQuery__
 *
 * To run a query within a React component, call `useCheckIfInGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckIfInGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckIfInGroupQuery({
 *   variables: {
 *   },
 * });
 */
export function useCheckIfInGroupQuery(baseOptions?: Apollo.QueryHookOptions<CheckIfInGroupQuery, CheckIfInGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckIfInGroupQuery, CheckIfInGroupQueryVariables>(CheckIfInGroupDocument, options);
      }
export function useCheckIfInGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckIfInGroupQuery, CheckIfInGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckIfInGroupQuery, CheckIfInGroupQueryVariables>(CheckIfInGroupDocument, options);
        }
export type CheckIfInGroupQueryHookResult = ReturnType<typeof useCheckIfInGroupQuery>;
export type CheckIfInGroupLazyQueryHookResult = ReturnType<typeof useCheckIfInGroupLazyQuery>;
export type CheckIfInGroupQueryResult = Apollo.QueryResult<CheckIfInGroupQuery, CheckIfInGroupQueryVariables>;
export const GetGroupByUserDocument = gql`
    query GetGroupByUser {
  getGroupByUser {
    id
    name
    createdAt
    updatedAt
    creatorId
  }
}
    `;

/**
 * __useGetGroupByUserQuery__
 *
 * To run a query within a React component, call `useGetGroupByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGroupByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetGroupByUserQuery, GetGroupByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupByUserQuery, GetGroupByUserQueryVariables>(GetGroupByUserDocument, options);
      }
export function useGetGroupByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupByUserQuery, GetGroupByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupByUserQuery, GetGroupByUserQueryVariables>(GetGroupByUserDocument, options);
        }
export type GetGroupByUserQueryHookResult = ReturnType<typeof useGetGroupByUserQuery>;
export type GetGroupByUserLazyQueryHookResult = ReturnType<typeof useGetGroupByUserLazyQuery>;
export type GetGroupByUserQueryResult = Apollo.QueryResult<GetGroupByUserQuery, GetGroupByUserQueryVariables>;
export const GetGroupMembersDocument = gql`
    query GetGroupMembers($id: Int!) {
  getGroupMembers(id: $id) {
    members {
      id
      createdAt
      updatedAt
      groupId
      userMemberId
      isOwner
      user {
        id
        username
        displayName
        avatar
      }
    }
  }
}
    `;

/**
 * __useGetGroupMembersQuery__
 *
 * To run a query within a React component, call `useGetGroupMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupMembersQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetGroupMembersQuery(baseOptions: Apollo.QueryHookOptions<GetGroupMembersQuery, GetGroupMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupMembersQuery, GetGroupMembersQueryVariables>(GetGroupMembersDocument, options);
      }
export function useGetGroupMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupMembersQuery, GetGroupMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupMembersQuery, GetGroupMembersQueryVariables>(GetGroupMembersDocument, options);
        }
export type GetGroupMembersQueryHookResult = ReturnType<typeof useGetGroupMembersQuery>;
export type GetGroupMembersLazyQueryHookResult = ReturnType<typeof useGetGroupMembersLazyQuery>;
export type GetGroupMembersQueryResult = Apollo.QueryResult<GetGroupMembersQuery, GetGroupMembersQueryVariables>;
export const GetInvitesDocument = gql`
    query GetInvites {
  getInvites {
    invites {
      id
      createdAt
      updatedAt
      groupId
      userMemberId
      group {
        id
        name
        createdAt
        updatedAt
        creatorId
      }
    }
  }
}
    `;

/**
 * __useGetInvitesQuery__
 *
 * To run a query within a React component, call `useGetInvitesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvitesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvitesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInvitesQuery(baseOptions?: Apollo.QueryHookOptions<GetInvitesQuery, GetInvitesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvitesQuery, GetInvitesQueryVariables>(GetInvitesDocument, options);
      }
export function useGetInvitesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvitesQuery, GetInvitesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvitesQuery, GetInvitesQueryVariables>(GetInvitesDocument, options);
        }
export type GetInvitesQueryHookResult = ReturnType<typeof useGetInvitesQuery>;
export type GetInvitesLazyQueryHookResult = ReturnType<typeof useGetInvitesLazyQuery>;
export type GetInvitesQueryResult = Apollo.QueryResult<GetInvitesQuery, GetInvitesQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ActivitiesByUserDocument = gql`
    query ActivitiesByUser {
  activitiesByUser {
    activities {
      id
      title
      type
      day
      duration
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useActivitiesByUserQuery__
 *
 * To run a query within a React component, call `useActivitiesByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivitiesByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivitiesByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useActivitiesByUserQuery(baseOptions?: Apollo.QueryHookOptions<ActivitiesByUserQuery, ActivitiesByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivitiesByUserQuery, ActivitiesByUserQueryVariables>(ActivitiesByUserDocument, options);
      }
export function useActivitiesByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivitiesByUserQuery, ActivitiesByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivitiesByUserQuery, ActivitiesByUserQueryVariables>(ActivitiesByUserDocument, options);
        }
export type ActivitiesByUserQueryHookResult = ReturnType<typeof useActivitiesByUserQuery>;
export type ActivitiesByUserLazyQueryHookResult = ReturnType<typeof useActivitiesByUserLazyQuery>;
export type ActivitiesByUserQueryResult = Apollo.QueryResult<ActivitiesByUserQuery, ActivitiesByUserQueryVariables>;
export const ActivitiesByUserByDayDocument = gql`
    query ActivitiesByUserByDay($day: String!) {
  getActivityByUserByDay(day: $day) {
    activities {
      id
      title
      type
      day
      duration
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useActivitiesByUserByDayQuery__
 *
 * To run a query within a React component, call `useActivitiesByUserByDayQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivitiesByUserByDayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivitiesByUserByDayQuery({
 *   variables: {
 *      day: // value for 'day'
 *   },
 * });
 */
export function useActivitiesByUserByDayQuery(baseOptions: Apollo.QueryHookOptions<ActivitiesByUserByDayQuery, ActivitiesByUserByDayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivitiesByUserByDayQuery, ActivitiesByUserByDayQueryVariables>(ActivitiesByUserByDayDocument, options);
      }
export function useActivitiesByUserByDayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivitiesByUserByDayQuery, ActivitiesByUserByDayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivitiesByUserByDayQuery, ActivitiesByUserByDayQueryVariables>(ActivitiesByUserByDayDocument, options);
        }
export type ActivitiesByUserByDayQueryHookResult = ReturnType<typeof useActivitiesByUserByDayQuery>;
export type ActivitiesByUserByDayLazyQueryHookResult = ReturnType<typeof useActivitiesByUserByDayLazyQuery>;
export type ActivitiesByUserByDayQueryResult = Apollo.QueryResult<ActivitiesByUserByDayQuery, ActivitiesByUserByDayQueryVariables>;
export const GetWeightHistoryByUserDocument = gql`
    query GetWeightHistoryByUser {
  getWeightHistoryByUser {
    weightHistory {
      id
      weight
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetWeightHistoryByUserQuery__
 *
 * To run a query within a React component, call `useGetWeightHistoryByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWeightHistoryByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWeightHistoryByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWeightHistoryByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetWeightHistoryByUserQuery, GetWeightHistoryByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWeightHistoryByUserQuery, GetWeightHistoryByUserQueryVariables>(GetWeightHistoryByUserDocument, options);
      }
export function useGetWeightHistoryByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWeightHistoryByUserQuery, GetWeightHistoryByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWeightHistoryByUserQuery, GetWeightHistoryByUserQueryVariables>(GetWeightHistoryByUserDocument, options);
        }
export type GetWeightHistoryByUserQueryHookResult = ReturnType<typeof useGetWeightHistoryByUserQuery>;
export type GetWeightHistoryByUserLazyQueryHookResult = ReturnType<typeof useGetWeightHistoryByUserLazyQuery>;
export type GetWeightHistoryByUserQueryResult = Apollo.QueryResult<GetWeightHistoryByUserQuery, GetWeightHistoryByUserQueryVariables>;
export const GetWorkoutDiaryDocument = gql`
    query GetWorkoutDiary($date: String!, $limit: Int) {
  getWorkoutDiary(date: $date, limit: $limit) {
    workoutDiary {
      id
      type
      weight
      duration
      createdAt
      updatedAt
      workout {
        id
        title
        type
        sets
        reps
        weight
        duration
        createdAt
        updatedAt
      }
    }
  }
}
    `;

/**
 * __useGetWorkoutDiaryQuery__
 *
 * To run a query within a React component, call `useGetWorkoutDiaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkoutDiaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkoutDiaryQuery({
 *   variables: {
 *      date: // value for 'date'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetWorkoutDiaryQuery(baseOptions: Apollo.QueryHookOptions<GetWorkoutDiaryQuery, GetWorkoutDiaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkoutDiaryQuery, GetWorkoutDiaryQueryVariables>(GetWorkoutDiaryDocument, options);
      }
export function useGetWorkoutDiaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkoutDiaryQuery, GetWorkoutDiaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkoutDiaryQuery, GetWorkoutDiaryQueryVariables>(GetWorkoutDiaryDocument, options);
        }
export type GetWorkoutDiaryQueryHookResult = ReturnType<typeof useGetWorkoutDiaryQuery>;
export type GetWorkoutDiaryLazyQueryHookResult = ReturnType<typeof useGetWorkoutDiaryLazyQuery>;
export type GetWorkoutDiaryQueryResult = Apollo.QueryResult<GetWorkoutDiaryQuery, GetWorkoutDiaryQueryVariables>;
export const WorkoutsDocument = gql`
    query Workouts($type: String, $cursor: String, $limit: Int, $title: String) {
  workouts(type: $type, cursor: $cursor, limit: $limit, title: $title) {
    workouts {
      id
      title
      type
      sets
      reps
      weight
      duration
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useWorkoutsQuery__
 *
 * To run a query within a React component, call `useWorkoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkoutsQuery({
 *   variables: {
 *      type: // value for 'type'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useWorkoutsQuery(baseOptions?: Apollo.QueryHookOptions<WorkoutsQuery, WorkoutsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorkoutsQuery, WorkoutsQueryVariables>(WorkoutsDocument, options);
      }
export function useWorkoutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkoutsQuery, WorkoutsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorkoutsQuery, WorkoutsQueryVariables>(WorkoutsDocument, options);
        }
export type WorkoutsQueryHookResult = ReturnType<typeof useWorkoutsQuery>;
export type WorkoutsLazyQueryHookResult = ReturnType<typeof useWorkoutsLazyQuery>;
export type WorkoutsQueryResult = Apollo.QueryResult<WorkoutsQuery, WorkoutsQueryVariables>;