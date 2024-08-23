import { DocumentPickerResult, FormState } from '@/app/(tabs)/create';
import { Account, Avatars, Client, Databases, ID, ImageGravity, Query, Storage } from 'react-native-appwrite';

export const config = {
    endPoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.mosima.aora',
    projectId: '66a7dcab000f6e4a2a7d',
    databaseId: '66a7de4c002aa284257e',
    userCollectionId: '66a7de7a0035d097dc36',
    videoCollectionId: '66a7dea40020b57ba50f',
    storageId: '66a7e09a0021c7f01f0a'
}

const {
    endPoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = config;

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
const storage = new Storage(client);

// Register User
export const createUser = async (email: string, password: string, username: string) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw new Error

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        )

        return newUser

    } catch (error) {
        console.log(error);
        // throw new Error(error);

    }
}

export const signIn = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session
    } catch (error) {
        console.log(error);
        // throw new Error(error as string);

    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()

        if (!currentAccount) throw new Error
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw new Error

        return currentUser.documents[0]


    } catch (error) {

    }
}

export const getALllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId
        );
        return posts.documents;
    } catch (error) {
        console.log(error);
        // throw new Error(error);
    }
}

export const getLatestlPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt'), Query.limit(7)]
        );
        return posts.documents;
    } catch (error) {
        console.log(error);
        // throw new Error(error);
    }
}

export const searchPosts = async (query: string | undefined) => {
    if (query)
        try {
            const posts = await databases.listDocuments(
                databaseId,
                videoCollectionId,
                [Query.search('title', query)]
            );
            return posts.documents;
        } catch (error) {
            console.log(error);
            // throw new Error(error);
        }
}

export const getUserPosts = async (userId: string | undefined) => {
    if (userId)
        try {
            const posts = await databases.listDocuments(
                databaseId,
                videoCollectionId,
                [Query.equal('creator', userId)]
            );


            return posts.documents;
        } catch (error) {
            console.log(error);
            // throw new Error(error);
        }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current')
        return session
    } catch (error) {
        console.log(error);
        // throw new Error(error);
    }
}

export const uploadFile = async (file: DocumentPickerResult | null, type: string) => {
    if (!file) return;

    const { mimeType, name, size, uri } = file;
   
    if (!name) {
        throw new Error("File name is required");
    }

    const asset = { type: mimeType ?? '', name, size: size ?? 0, uri };

    try {
        const uploadedFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type)
        
        return fileUrl;
    } catch (error) {
        console.error(error);
    }
}


export const creatVideo = async (form: FormState) => {
    try {
        const [thumbnail, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])

        const newPost = await databases.createDocument(
            databaseId, videoCollectionId, ID.unique(), {
                title: form.title,
                thumbnail: thumbnail,
                videoUrl: videoUrl,
                creator: form.userId
            }
        )

        return newPost;
    } catch (error) {
        console.log(error);
    }
}

export const getFilePreview = async (fileId: string, type: string) => {
    let fileUrl;
    
    try {
        if (type === 'video') {
            fileUrl = storage.getFileView(storageId, fileId)
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, ImageGravity.Top, 100);  
        } else {
            throw new Error('Invalid file type')
        }

        if (!fileUrl) throw Error;


        return fileUrl;

    } catch (error) {
        console.log(error);
        // throw new Error()
        
    }
}
