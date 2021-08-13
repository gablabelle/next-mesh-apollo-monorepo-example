"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSdk = exports.getMeshSDK = exports.getBuiltMesh = exports.documentsInSDL = exports.getMeshOptions = exports.rawConfig = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const runtime_1 = require("@graphql-mesh/runtime");
const store_1 = require("@graphql-mesh/store");
const process_1 = require("process");
const path_1 = require("path");
const transpile_only_1 = tslib_1.__importDefault(require("ts-node/register/transpile-only"));
const cache_inmemory_lru_1 = tslib_1.__importDefault(require("@graphql-mesh/cache-inmemory-lru"));
const additional_resolvers_js_1 = tslib_1.__importDefault(require("./../dist/additional-resolvers.js"));
const openapi_1 = tslib_1.__importDefault(require("@graphql-mesh/openapi"));
const merger_stitching_1 = tslib_1.__importDefault(require("@graphql-mesh/merger-stitching"));
const oas_schema_js_1 = tslib_1.__importDefault(require("./sources/PetStoreExtended/oas-schema.js"));
const oas_schema_js_2 = tslib_1.__importDefault(require("./sources/PetStore/oas-schema.js"));
const importedModules = {
    // @ts-ignore
    [`ts-node/register/transpile-only`]: transpile_only_1.default,
    // @ts-ignore
    [`@graphql-mesh/cache-inmemory-lru`]: cache_inmemory_lru_1.default,
    // @ts-ignore
    [`dist/additional-resolvers.js`]: additional_resolvers_js_1.default,
    // @ts-ignore
    [`@graphql-mesh/openapi`]: openapi_1.default,
    // @ts-ignore
    [`@graphql-mesh/merger-stitching`]: merger_stitching_1.default,
    // @ts-ignore
    [`.mesh/sources/PetStoreExtended/oas-schema.js`]: oas_schema_js_1.default,
    // @ts-ignore
    [`.mesh/sources/PetStore/oas-schema.js`]: oas_schema_js_2.default
};
const baseDir = path_1.join(process_1.cwd(), '');
const syncImportFn = (moduleId) => {
    const relativeModuleId = path_1.isAbsolute(moduleId) ? path_1.relative(baseDir, moduleId) : moduleId;
    if (!(relativeModuleId in importedModules)) {
        throw new Error(`Cannot find module '${relativeModuleId}'.`);
    }
    return importedModules[relativeModuleId];
};
const importFn = async (moduleId) => syncImportFn(moduleId);
const rootStore = new store_1.MeshStore('.mesh', new store_1.FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
}), {
    readonly: true,
    validate: false
});
require("ts-node/register/transpile-only");
const cache_inmemory_lru_2 = tslib_1.__importDefault(require("@graphql-mesh/cache-inmemory-lru"));
const graphql_subscriptions_1 = require("graphql-subscriptions");
const events_1 = require("events");
const utils_1 = require("@graphql-mesh/utils");
const openapi_2 = tslib_1.__importDefault(require("@graphql-mesh/openapi"));
const merger_stitching_2 = tslib_1.__importDefault(require("@graphql-mesh/merger-stitching"));
const utils_2 = require("@graphql-mesh/utils");
exports.rawConfig = { "sources": [{ "name": "PetStore", "handler": { "openapi": { "source": "./src/petstore.yaml" } } }, { "name": "PetStoreExtended", "handler": { "openapi": { "source": "./src/petstore-expanded.yaml" } } }], "require": ["ts-node/register/transpile-only"], "additionalTypeDefs": "extend type Query {\n  getTrue: Boolean\n}\n", "additionalResolvers": ["./dist/additional-resolvers.js"] };
function getMeshOptions() {
    const cache = new cache_inmemory_lru_2.default({
        ...(exports.rawConfig.cache || {}),
        store: rootStore.child('cache'),
    });
    const eventEmitter = new events_1.EventEmitter({ captureRejections: true });
    eventEmitter.setMaxListeners(Infinity);
    const pubsub = new graphql_subscriptions_1.PubSub({ eventEmitter });
    const sourcesStore = rootStore.child('sources');
    const logger = new utils_1.DefaultLogger('Mesh');
    const sources = [];
    const transforms = [];
    const petStoreTransforms = [];
    const petStoreExtendedTransforms = [];
    const petStoreHandler = new openapi_2.default({
        name: exports.rawConfig.sources[0].name,
        config: exports.rawConfig.sources[0].handler.openapi,
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(exports.rawConfig.sources[0].name),
        logger: logger.child(exports.rawConfig.sources[0].name),
        importFn
    });
    const petStoreExtendedHandler = new openapi_2.default({
        name: exports.rawConfig.sources[1].name,
        config: exports.rawConfig.sources[1].handler.openapi,
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(exports.rawConfig.sources[1].name),
        logger: logger.child(exports.rawConfig.sources[1].name),
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
    const merger = new merger_stitching_2.default({
        cache,
        pubsub,
        logger: logger.child('StitchingMerger'),
        store: rootStore.child('stitchingMerger')
    });
    const additionalTypeDefs = [graphql_1.parse(/* GraphQL */ `extend type Query {
  getTrue: Boolean
}
`),];
    const additionalResolvers = utils_2.resolveAdditionalResolvers(baseDir, exports.rawConfig.additionalResolvers, syncImportFn, pubsub);
    const liveQueryInvalidations = exports.rawConfig.liveQueryInvalidations;
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
exports.getMeshOptions = getMeshOptions;
exports.documentsInSDL = [];
function getBuiltMesh() {
    const meshConfig = getMeshOptions();
    return runtime_1.getMesh(meshConfig);
}
exports.getBuiltMesh = getBuiltMesh;
async function getMeshSDK() {
    const { sdkRequester } = await getBuiltMesh();
    return getSdk(sdkRequester);
}
exports.getMeshSDK = getMeshSDK;
function getSdk(requester) {
    return {};
}
exports.getSdk = getSdk;
