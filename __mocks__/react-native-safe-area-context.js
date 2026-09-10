// The library's own jest mock (react-native-safe-area-context/jest/mock.tsx)
// bundles everything under a default export. Flatten it here so named
// imports (e.g. `import { useSafeAreaInsets } from "..."`) resolve like
// they do against the real package.
module.exports = require("react-native-safe-area-context/jest/mock").default;
