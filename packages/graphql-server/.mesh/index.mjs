import { parse } from 'graphql';
import { getMesh } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { cwd } from 'process';
import { join, relative, isAbsolute } from 'path';
import ExternalModule_0 from 'ts-node/register/transpile-only';
import ExternalModule_1 from '@graphql-mesh/cache-inmemory-lru';
import ExternalModule_2 from './../dist/additional-resolvers.js';
import ExternalModule_3 from '@graphql-mesh/openapi';
import ExternalModule_4 from '@graphql-mesh/merger-stitching';
import ExternalModule_5 from './sources/PetStore/oas-schema.js';
import ExternalModule_6 from './sources/PetStoreExtended/oas-schema.js';
const importedModules = {
    // @ts-ignore
    [`ts-node/register/transpile-only`]: ExternalModule_0,
    // @ts-ignore
    [`@graphql-mesh/cache-inmemory-lru`]: ExternalModule_1,
    // @ts-ignore
    [`dist/additional-resolvers.js`]: ExternalModule_2,
    // @ts-ignore
    [`@graphql-mesh/openapi`]: ExternalModule_3,
    // @ts-ignore
    [`@graphql-mesh/merger-stitching`]: ExternalModule_4,
    // @ts-ignore
    [`.mesh/sources/PetStore/oas-schema.js`]: ExternalModule_5,
    // @ts-ignore
    [`.mesh/sources/PetStoreExtended/oas-schema.js`]: ExternalModule_6
};
const baseDir = join(cwd(), '');
const syncImportFn = (moduleId) => {
    const relativeModuleId = isAbsolute(moduleId) ? relative(baseDir, moduleId) : moduleId;
    if (!(relativeModuleId in importedModules)) {
        throw new Error(`Cannot find module '${relativeModuleId}'.`);
    }
    return importedModules[relativeModuleId];
};
const importFn = async (moduleId) => syncImportFn(moduleId);
const rootStore = new MeshStore('.mesh', new FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
}), {
    readonly: true,
    validate: false
});
import 'ts-node/register/transpile-only';
import MeshCache from '@graphql-mesh/cache-inmemory-lru';
import { PubSub } from 'graphql-subscriptions';
import { EventEmitter } from 'events';
import { DefaultLogger } from '@graphql-mesh/utils';
import OpenapiHandler from '@graphql-mesh/openapi';
import StitchingMerger from '@graphql-mesh/merger-stitching';
import { resolveAdditionalResolvers } from '@graphql-mesh/utils';
export const rawConfig = { "sources": [{ "name": "PetStore", "handler": { "openapi": { "source": "./src/petstore.yaml" } } }, { "name": "PetStoreExtended", "handler": { "openapi": { "source": "./src/petstore-expanded.yaml" } } }], "require": ["ts-node/register/transpile-only"], "additionalTypeDefs": "extend type Query {\n  getTrue: Boolean\n}\n", "additionalResolvers": ["./dist/additional-resolvers.js"] };
export function getMeshOptions() {
    const cache = new MeshCache({
        ...(rawConfig.cache || {}),
        store: rootStore.child('cache'),
    });
    const eventEmitter = new EventEmitter({ captureRejections: true });
    eventEmitter.setMaxListeners(Infinity);
    const pubsub = new PubSub({ eventEmitter });
    const sourcesStore = rootStore.child('sources');
    const logger = new DefaultLogger('Mesh');
    const sources = [];
    const transforms = [];
    const petStoreTransforms = [];
    const petStoreExtendedTransforms = [];
    const petStoreHandler = new OpenapiHandler({
        name: rawConfig.sources[0].name,
        config: rawConfig.sources[0].handler.openapi,
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(rawConfig.sources[0].name),
        logger: logger.child(rawConfig.sources[0].name),
        importFn
    });
    const petStoreExtendedHandler = new OpenapiHandler({
        name: rawConfig.sources[1].name,
        config: rawConfig.sources[1].handler.openapi,
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(rawConfig.sources[1].name),
        logger: logger.child(rawConfig.sources[1].name),
        importFn
    });
    sources.push({
        name: 'PetStore',
        handler: petStoreHandler,
        transforms: petStoreTransforms
    });
    sources.push({
        name: 'PetStoreExtended',
        handler: petStoreExtendedHandler,
        transforms: petStoreExtendedTransforms
    });
    const merger = new StitchingMerger({
        cache,
        pubsub,
        logger: logger.child('StitchingMerger'),
        store: rootStore.child('stitchingMerger')
    });
    const additionalTypeDefs = [parse(/* GraphQL */ `extend type Query {
  getTrue: Boolean
}
`),];
    const additionalResolvers = resolveAdditionalResolvers(baseDir, rawConfig.additionalResolvers, syncImportFn, pubsub);
    const liveQueryInvalidations = rawConfig.liveQueryInvalidations;
    return {
        sources,
        transforms,
        additionalTypeDefs,
        additionalResolvers,
        cache,
        pubsub,
        merger,
        logger,
        liveQueryInvalidations,
    };
}
export const documentsInSDL = /*#__PURE__*/ [];
export function getBuiltMesh() {
    const meshConfig = getMeshOptions();
    return getMesh(meshConfig);
}
export async function getMeshSDK() {
    const { sdkRequester } = await getBuiltMesh();
    return getSdk(sdkRequester);
}
export function getSdk(requester) {
    return {};
}
