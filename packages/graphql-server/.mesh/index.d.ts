import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { DocumentNode } from 'graphql';
export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export declare type RequireFields<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    JSON: any;
};
export declare type Query = {
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
    getTrue?: Maybe<Scalars['Boolean']>;
};
export declare type QueryfindPetByIdArgs = {
    id: Scalars['Float'];
};
export declare type QueryfindPetsArgs = {
    limit?: Maybe<Scalars['Int']>;
    tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};
export declare type QuerylistPetsArgs = {
    limit?: Maybe<Scalars['Int']>;
};
export declare type QueryshowPetByIdArgs = {
    petId: Scalars['String'];
};
export declare type Mutation = {
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
    /**
     * Create a pet
     *
     * Equivalent to POST /pets
     */
    createPets?: Maybe<Scalars['JSON']>;
};
export declare type MutationaddPetArgs = {
    newPetInput: NewPetInput;
};
export declare type MutationdeletePetArgs = {
    id: Scalars['Float'];
};
export declare type Pet = {
    id: Scalars['Float'];
    name: Scalars['String'];
    tag?: Maybe<Scalars['String']>;
};
export declare type NewPetInput = {
    name: Scalars['String'];
    tag?: Maybe<Scalars['String']>;
};
export declare type WithIndex<TObject> = TObject & Record<string, any>;
export declare type ResolversObject<TObject> = WithIndex<TObject>;
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
    selectionSet: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs> | StitchingResolver<TResult, TParent, TContext, TArgs>;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export declare type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export declare type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = ResolversObject<{
    Query: ResolverTypeWrapper<{}>;
    Mutation: ResolverTypeWrapper<{}>;
    Pet: ResolverTypeWrapper<Pet>;
    Float: ResolverTypeWrapper<Scalars['Float']>;
    String: ResolverTypeWrapper<Scalars['String']>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    NewPetInput: NewPetInput;
    JSON: ResolverTypeWrapper<Scalars['JSON']>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;
/** Mapping between all available schema types and the resolvers parents */
export declare type ResolversParentTypes = ResolversObject<{
    Query: {};
    Mutation: {};
    Pet: Pet;
    Float: Scalars['Float'];
    String: Scalars['String'];
    Int: Scalars['Int'];
    NewPetInput: NewPetInput;
    JSON: Scalars['JSON'];
    Boolean: Scalars['Boolean'];
}>;
export declare type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
    findPetById?: Resolver<Maybe<ResolversTypes['Pet']>, ParentType, ContextType, RequireFields<QueryfindPetByIdArgs, 'id'>>;
    findPets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Pet']>>>, ParentType, ContextType, RequireFields<QueryfindPetsArgs, never>>;
    listPets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Pet']>>>, ParentType, ContextType, RequireFields<QuerylistPetsArgs, never>>;
    showPetById?: Resolver<Maybe<ResolversTypes['Pet']>, ParentType, ContextType, RequireFields<QueryshowPetByIdArgs, 'petId'>>;
    getTrue?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
}>;
export declare type MutationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
    addPet?: Resolver<Maybe<ResolversTypes['Pet']>, ParentType, ContextType, RequireFields<MutationaddPetArgs, 'newPetInput'>>;
    deletePet?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationdeletePetArgs, 'id'>>;
    createPets?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
}>;
export declare type PetResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Pet'] = ResolversParentTypes['Pet']> = ResolversObject<{
    id?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    tag?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export interface JSONScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
    name: 'JSON';
}
export declare type Resolvers<ContextType = MeshContext> = ResolversObject<{
    Query?: QueryResolvers<ContextType>;
    Mutation?: MutationResolvers<ContextType>;
    Pet?: PetResolvers<ContextType>;
    JSON?: GraphQLScalarType;
}>;
import { MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { SelectionSetParamOrFactory } from '@graphql-mesh/types';
export declare type QueryPetStoreExtendedSdk = {
    findPetById: (params: {
        root?: any;
        args: QueryfindPetByIdArgs;
        context: MeshContext;
        info: GraphQLResolveInfo;
        selectionSet?: SelectionSetParamOrFactory;
    }) => Promise<Query['findPetById']>;
    findPets: (params: {
        root?: any;
        args: QueryfindPetsArgs;
        context: MeshContext;
        info: GraphQLResolveInfo;
        selectionSet?: SelectionSetParamOrFactory;
    }) => Promise<Query['findPets']>;
};
export declare type MutationPetStoreExtendedSdk = {
    addPet: (params: {
        root?: any;
        args: MutationaddPetArgs;
        context: MeshContext;
        info: GraphQLResolveInfo;
        selectionSet?: SelectionSetParamOrFactory;
    }) => Promise<Mutation['addPet']>;
    deletePet: (params: {
        root?: any;
        args: MutationdeletePetArgs;
        context: MeshContext;
        info: GraphQLResolveInfo;
        selectionSet?: SelectionSetParamOrFactory;
    }) => Promise<Mutation['deletePet']>;
};
export declare type SubscriptionPetStoreExtendedSdk = {};
export declare type QueryPetStoreSdk = {
    listPets: (params: {
        root?: any;
        args: QuerylistPetsArgs;
        context: MeshContext;
        info: GraphQLResolveInfo;
        selectionSet?: SelectionSetParamOrFactory;
    }) => Promise<Query['listPets']>;
    showPetById: (params: {
        root?: any;
        args: QueryshowPetByIdArgs;
        context: MeshContext;
        info: GraphQLResolveInfo;
        selectionSet?: SelectionSetParamOrFactory;
    }) => Promise<Query['showPetById']>;
};
export declare type MutationPetStoreSdk = {
    createPets: (params: {
        root?: any;
        args?: {};
        context: MeshContext;
        info: GraphQLResolveInfo;
        selectionSet?: SelectionSetParamOrFactory;
    }) => Promise<Mutation['createPets']>;
};
export declare type SubscriptionPetStoreSdk = {};
export declare type PetStoreExtendedContext = {
    ["PetStoreExtended"]: {
        Query: QueryPetStoreExtendedSdk;
        Mutation: MutationPetStoreExtendedSdk;
        Subscription: SubscriptionPetStoreExtendedSdk;
    };
};
export declare type PetStoreContext = {
    ["PetStore"]: {
        Query: QueryPetStoreSdk;
        Mutation: MutationPetStoreSdk;
        Subscription: SubscriptionPetStoreSdk;
    };
};
export declare type MeshContext = PetStoreExtendedContext & PetStoreContext & BaseMeshContext;
import { GetMeshOptions } from '@graphql-mesh/runtime';
import { YamlConfig } from '@graphql-mesh/types';
import 'ts-node/register/transpile-only';
export declare const rawConfig: YamlConfig.Config;
export declare function getMeshOptions(): GetMeshOptions;
export declare const documentsInSDL: any[];
export declare function getBuiltMesh(): Promise<MeshInstance>;
export declare function getMeshSDK(): Promise<{}>;
export declare type Requester<C = {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>;
export declare function getSdk<C>(requester: Requester<C>): {};
export declare type Sdk = ReturnType<typeof getSdk>;
