const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Let Metro resolve/bundle Drizzle's generated .sql migration files (see
// babel.config.js's inline-import plugin, which turns them into strings).
config.resolver.sourceExts.push("sql");

module.exports = config;
