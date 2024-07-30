import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

export const config = {
    endPoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.mosima.aora',
    projectId: '66a7dcab000f6e4a2a7d',
    databaseId: '66a7de4c002aa284257e',
    userCollectionId: '66a7de4c002aa284257e',
    videoCollectionId: '66a7dea40020b57ba50f',
    storageId: '66a7e09a0021c7f01f0a'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endPoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)
    ;

const account = new Account(client);
const avatars = new Avatars(client)
const databases = new Databases(client);

// Register User
export const createUser = async (email: string, password: string, username: string) => {
    try {
        const newUser = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newUser) throw new Error

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        // const newUser = await databases.createDocument(
        //     config.databaseId,
        //     config.userCollectionId,
        //     con
        // )
        
    } catch (error) {
        console.log(error);
        throw new Error(error as string);
        
    }
}

export async function signIn(email: string, password: string){
    try {
        const session = await account.createEmailPasswordSession(email, password);

        return session
    } catch (error) {
        throw new Error(error as string);
        
    }
}

