const path = require('path');

const { payloadCloud } = require('@payloadcms/plugin-cloud');
const { mongooseAdapter } = require('@payloadcms/db-mongodb'); // database-adapter-import
const { webpackBundler } = require('@payloadcms/bundler-webpack'); // bundler-import
const { slateEditor } = require('@payloadcms/richtext-slate'); // editor-import
const { buildConfig } = require('payload/config');

const Users = require('./collections/Users');

module.exports = buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(), // bundler-config
  },
  editor: slateEditor({}), // editor-config
  collections: [Users],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  // database-adapter-config-start
  db: mongooseAdapter({
    url: process.env.MONGODB_URI,
  }),
  // database-adapter-config-end
});
