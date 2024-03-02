import { Client, Account, Avatars, Databases, Storage } from "appwrite";

const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const projectUrl = import.meta.env.VITE_APPWRITE_PROJECT_URL;
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const storageId = import.meta.env.VITE_APPWRITE_STORAGE_ID;
const userCollectionId = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
const postCollectionId = import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID;
const savesCollectionId = import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID;

export const appwriteConfig = {
  projectId,
  projectUrl,
  databaseId,
  storageId,
  userCollectionId,
  postCollectionId,
  savesCollectionId,
};

export const client = new Client();

client.setEndpoint(projectUrl).setProject(projectId);

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
