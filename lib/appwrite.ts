import { Account, Client, ID } from 'react-native-appwrite';
import { Platform } from "react-native";

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

// Register User
account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
