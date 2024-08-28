import conf from "../conf/conf.js"
import { Client, Databases, ID, Storage, Query } from "appwrite";

class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, content, featuredImage, status="active", userId, category="Uncategorized" }) {
        try {
            // console.log(slug);
            // console.log(typeof(slug));

            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionArticlesId, ID.unique(), { title, content, featuredImage, status, userId, category });

        } catch (error) {
            console.log('error from createpost func in config.js: ', error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status, category }) {
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionArticlesId, slug, { title, content, featuredImage, status, category });
        } catch (error) {
            console.log('error from updatepost func in config.js: ', error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionArticlesId, slug);
            return true;
        } catch (error) {
            console.log('error from deletePost func in config.js: ', error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionArticlesId, slug);
        } catch (error) {
            console.log('error from getPost func in config.js: ', error);
        }
    }

    // issue was here
    // instead of giving getPosts I wrote getPost
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            const response= await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionArticlesId, queries);
            console.log("in get posts in appwrite ");
            
            console.log(response);
            return response;
            
        } catch (error) {
            console.log('error from getAllPosts func in config.js: ', error);
            return false;
        }
    }

    // Followers Service
    async addFollower({userId, followerId}){
        try {
            const response = await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionFollowersId,ID.unique(),{userId,followerId});
            return response;
        } catch (error) {
            console.log('error from addFollower func in config.js: ', error);
            return error;
        }
    }

    async getFollower({userId,followerId}){
        queries=[
            Query.equal('userId',userId),
            Query.equal('followerId',followerId),
        ];

        try {
            const response = await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionFollowersId,queries);
            console.log('Response from getFollower: ');
            console.log(response);
            
            return response;
            // return response[0];
        } catch (error) {
            console.log('error from getFollowers func in config.js: ', error);
        }
    }

    async getFollowers(userId){
        queries=[Query.equal('userId',userId)];
        try {
            const response = await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionFollowersId,queries);
            console.log('Response from getFollowers: ');
            console.log(response);
            return response;
        } catch (error) {
            console.log('error from getFollowers func in config.js: ', error);
        }
    }

    async removeFollower({userId,followerId}){
        const element = this.getFollower({userId,followerId})
        console.log('removefollower executed and below is the response: ');
        console.log(element);
        console.log(element.$id);
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionFollowersId, element.$id);
            return true;
        } catch (error) {
            console.log('error from removeFollower func in config.js: ', error);
        }
    }

    // file upload service
    async uploadFile(file) {
        try {
            return this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
        } catch (error) {
            console.log('error from uploadFile func in config.js: ', error);
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log('error from deleteFile func in config.js: ', error);
            return false;
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);

        } catch (error) {
            console.log('error from getFilePreview func in config.js: ', error);
            return false;

        }
    }
}

const service = new Service();

export default service;