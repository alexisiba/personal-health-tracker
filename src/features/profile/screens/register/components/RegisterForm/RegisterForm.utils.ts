import { Directory, File, Paths } from "expo-file-system";

const PROFILE_IMAGES_DIRECTORY_NAME = "profile-images";

// The image picker returns a URI in a cache/temporary location that the OS
// can clear at any time, so it must be copied into the app's persistent
// document directory before its URI is stored in the database.
export async function copyProfileImageToPersistentStorage(pickedImageUri: string) {
  const profileImagesDirectory = new Directory(Paths.document, PROFILE_IMAGES_DIRECTORY_NAME);
  profileImagesDirectory.create({ intermediates: true, idempotent: true });

  const sourceFile = new File(pickedImageUri);
  const destinationFile = new File(profileImagesDirectory, `${Date.now()}-${sourceFile.name}`);

  await sourceFile.copy(destinationFile);

  return destinationFile.uri;
}
