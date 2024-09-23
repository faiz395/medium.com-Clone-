const conf={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),

    appwriteCollectionArticlesId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_ARTICLES),
    appwriteCollectionFollowersId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_FOLLOWERS),
    appwriteCollectionCommentsId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_COMMENTS),
    appwriteCollectionLikesId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_LIKES),
    appwriteCollectionUserProfileId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERPROFILE),
    
    appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),

    algoliaAppId:String(import.meta.env.VITE_APP_ALGOLIA_APP_ID),
    algoliaApiKey:String(import.meta.env.VITE_APP_API_KEY),
}

export default conf;