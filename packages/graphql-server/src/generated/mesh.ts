import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export type Query = {
  /**
   * List all pets
   *
   * Equivalent to GET /pets
   */
  listPets?: Maybe<Array<Maybe<Pet>>>;
  /**
   * Info for a specific pet
   *
   * Equivalent to GET /pets/{petId}
   */
  showPetById?: Maybe<Pet>;
  /**
   * Returns a user based on a single ID, if the user does not have access to the pet
   *
   * Equivalent to GET /pets/{id}
   */
  findPetById?: Maybe<Pet>;
  /**
   * Returns all pets from the system that the user has access to
   * Nam sed condimentum est. Maecenas tempor sagittis sapien, nec rhoncus sem sagittis sit amet. Aenean at gravida augue, ac iaculis sem. Curabitur odio lorem, ornare eget elementum nec, cursus id lectus. Duis mi turpis, pulvinar ac eros ac, tincidunt varius justo. In hac habitasse platea dictumst. Integer at adipiscing ante, a sagittis ligula. Aenean pharetra tempor ante molestie imperdiet. Vivamus id aliquam diam. Cras quis velit non tortor eleifend sagittis. Praesent at enim pharetra urna volutpat venenatis eget eget mauris. In eleifend fermentum facilisis. Praesent enim enim, gravida ac sodales sed, placerat id erat. Suspendisse lacus dolor, consectetur non augue vel, vehicula interdum libero. Morbi euismod sagittis libero sed lacinia.
   *
   * Sed tempus felis lobortis leo pulvinar rutrum. Nam mattis velit nisl, eu condimentum ligula luctus nec. Phasellus semper velit eget aliquet faucibus. In a mattis elit. Phasellus vel urna viverra, condimentum lorem id, rhoncus nibh. Ut pellentesque posuere elementum. Sed a varius odio. Morbi rhoncus ligula libero, vel eleifend nunc tristique vitae. Fusce et sem dui. Aenean nec scelerisque tortor. Fusce malesuada accumsan magna vel tempus. Quisque mollis felis eu dolor tristique, sit amet auctor felis gravida. Sed libero lorem, molestie sed nisl in, accumsan tempor nisi. Fusce sollicitudin massa ut lacinia mattis. Sed vel eleifend lorem. Pellentesque vitae felis pretium, pulvinar elit eu, euismod sapien.
   *
   *
   * Equivalent to GET /pets
   */
  findPets?: Maybe<Array<Maybe<Pet>>>;
  /**
   * ## Behavior
   *
   * Equivalent to GET /get-approval-request
   */
  getApprovalRequestV5?: Maybe<V5ApprovalRequestApprovalRequestGet>;
};


export type QueryListPetsArgs = {
  limit?: Maybe<Scalars['Int']>;
};


export type QueryShowPetByIdArgs = {
  petId: Scalars['String'];
};


export type QueryFindPetByIdArgs = {
  id: Scalars['Float'];
};


export type QueryFindPetsArgs = {
  limit?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryGetApprovalRequestV5Args = {
  approvalRequestId: Scalars['String'];
  employeeId: Scalars['String'];
};

export type Mutation = {
  /**
   * Create a pet
   *
   * Equivalent to POST /pets
   */
  createPets?: Maybe<Scalars['JSON']>;
  /**
   * Creates a new pet in the store. Duplicates are allowed
   *
   * Equivalent to POST /pets
   */
  addPet?: Maybe<Pet>;
  /**
   * deletes a single pet based on the ID supplied
   *
   * Equivalent to DELETE /pets/{id}
   */
  deletePet?: Maybe<Scalars['JSON']>;
};


export type MutationAddPetArgs = {
  newPetInput: NewPetInput;
};


export type MutationDeletePetArgs = {
  id: Scalars['Float'];
};

export type Pet = {
  id: Scalars['Float'];
  name: Scalars['String'];
  tag?: Maybe<Scalars['String']>;
};


export type NewPetInput = {
  name: Scalars['String'];
  tag?: Maybe<Scalars['String']>;
};

export type V5ApprovalRequestApprovalRequestGet = {
  id: Scalars['String'];
  submissionTimestamp: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  Pet: ResolverTypeWrapper<Pet>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  NewPetInput: NewPetInput;
  V5ApprovalRequestApprovalRequestGet: ResolverTypeWrapper<V5ApprovalRequestApprovalRequestGet>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Mutation: {};
  Pet: Pet;
  Float: Scalars['Float'];
  String: Scalars['String'];
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  Boolean: Scalars['Boolean'];
  NewPetInput: NewPetInput;
  V5ApprovalRequestApprovalRequestGet: V5ApprovalRequestApprovalRequestGet;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  listPets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Pet']>>>, ParentType, ContextType, RequireFields<QueryListPetsArgs, never>>;
  showPetById?: Resolver<Maybe<ResolversTypes['Pet']>, ParentType, ContextType, RequireFields<QueryShowPetByIdArgs, 'petId'>>;
  findPetById?: Resolver<Maybe<ResolversTypes['Pet']>, ParentType, ContextType, RequireFields<QueryFindPetByIdArgs, 'id'>>;
  findPets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Pet']>>>, ParentType, ContextType, RequireFields<QueryFindPetsArgs, never>>;
  getApprovalRequestV5?: Resolver<Maybe<ResolversTypes['V5ApprovalRequestApprovalRequestGet']>, ParentType, ContextType, RequireFields<QueryGetApprovalRequestV5Args, 'approvalRequestId' | 'employeeId'>>;
}>;

export type MutationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createPets?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  addPet?: Resolver<Maybe<ResolversTypes['Pet']>, ParentType, ContextType, RequireFields<MutationAddPetArgs, 'newPetInput'>>;
  deletePet?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationDeletePetArgs, 'id'>>;
}>;

export type PetResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Pet'] = ResolversParentTypes['Pet']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type V5ApprovalRequestApprovalRequestGetResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['V5ApprovalRequestApprovalRequestGet'] = ResolversParentTypes['V5ApprovalRequestApprovalRequestGet']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  submissionTimestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Pet?: PetResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  V5ApprovalRequestApprovalRequestGet?: V5ApprovalRequestApprovalRequestGetResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = MeshContext> = Resolvers<ContextType>;

import { MeshContext as BaseMeshContext, ProjectionOptions } from '@graphql-mesh/runtime';

export type PetStoreSdk = {
  listPets: (args: QueryListPetsArgs, projectionOptions?: ProjectionOptions) => Promise<Query['listPets']>,
  showPetById: (args: QueryShowPetByIdArgs, projectionOptions?: ProjectionOptions) => Promise<Query['showPetById']>,
  createPets: (args?: {}, projectionOptions?: ProjectionOptions) => Promise<Mutation['createPets']>
};

export type PetStoreExtendedSdk = {
  findPetById: (args: QueryFindPetByIdArgs, projectionOptions?: ProjectionOptions) => Promise<Query['findPetById']>,
  findPets: (args: QueryFindPetsArgs, projectionOptions?: ProjectionOptions) => Promise<Query['findPets']>,
  addPet: (args: MutationAddPetArgs, projectionOptions?: ProjectionOptions) => Promise<Mutation['addPet']>,
  deletePet: (args: MutationDeletePetArgs, projectionOptions?: ProjectionOptions) => Promise<Mutation['deletePet']>
};

export type TestsSdk = {
  getApprovalRequestV5: (args: QueryGetApprovalRequestV5Args, projectionOptions?: ProjectionOptions) => Promise<Query['getApprovalRequestV5']>
};

export type PetStoreContext = { 
      PetStore: { api: PetStoreSdk }, 
    };

export type PetStoreExtendedContext = { 
      PetStoreExtended: { api: PetStoreExtendedSdk }, 
    };

export type TestsContext = { 
      Tests: { api: TestsSdk }, 
    };

export type MeshContext = PetStoreContext & PetStoreExtendedContext & TestsContext & BaseMeshContext;