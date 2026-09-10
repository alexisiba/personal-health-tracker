module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // Lets Drizzle's generated SQL migration files be imported directly and
    // bundled as strings (see src/db/migrations), instead of read from disk —
    // Expo's JS bundle has no filesystem access to the source .sql files at
    // runtime.
    plugins: [["inline-import", { extensions: [".sql"] }]],
  };
};
