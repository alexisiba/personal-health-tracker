import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schema";

const DATABASE_NAME = "personal-health-care.db";

// Local-only persistence: the app never syncs this database anywhere, so a
// single on-device SQLite file is the whole storage layer.
const expoDatabase = openDatabaseSync(DATABASE_NAME, { enableChangeListener: true });

export const db = drizzle(expoDatabase, { schema });
