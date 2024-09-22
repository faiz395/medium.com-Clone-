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

    async createPost({ title, content, featuredImage, status = "active", postId, userId, category = "Uncategorized" }) {
        try {
            // console.log(slug);
            // console.log(typeof(slug));

            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionArticlesId, postId, { title, content, featuredImage, status, userId, category });

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
            const response = await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionArticlesId, queries);
            console.log("in get posts in appwrite ");

            console.log(response);
            return response;

        } catch (error) {
            console.log('error from getAllPosts func in config.js: ', error);
            return false;
        }
    }

    // likes
    // function to add a like
    async addLike(postId, userId, likeId) {
        try {
            const response = await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionLikesId, likeId, {
                postId,
                userId,
                timestamp: new Date(),
            });
            return response;
        } catch (error) {
            console.log('error from addLike func in config.js: ', error);
            return false;
        }
    }

    // function to remove a like
    async removeLike(likeId) {
        try {
            const response = await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionLikesId, likeId);
            return response;

        } catch (error) {
            console.log('error from removeLike func in config.js: ', error);
            return false;
        }
    }
    async getLike(likeId) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionLikesId, likeId);
        } catch (error) {
            console.log('error from getLike func in config.js: ', error);
        }
    }
    // Fetch likes for a post
    async getLikes(queries = [Query.equal("status", "active")]) {
        try {

            const likes = await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionLikesId, queries);
            console.log("retrieved likes from DB sucessfully");

            return likes;
        } catch (error) {
            console.log('error from getLikes func in config.js: ', error);
            return false;
        }
    }

    // comment service:
    // Example function to add a comment
    async addComment(postId, userId, userName, commentText, CommentId) {
        try {
            const response = await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionCommentsId, CommentId, {
                postId,
                userId,
                userName,
                commentText,
                timestamp: new Date(),
            });
            return response;
        } catch (error) {
            console.log('error from addComment func in config.js: ', error);
            return false;
        }
    }

    // delete comment
    // delete comment
    async deleteComment(commentId) {
        try {
            const response = await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionCommentsId, commentId);
            return response;
        } catch (error) {
            console.log('error from deleteComment func in config.js: ', error);
            return false;
        }
    }

    async updateComment(id, { commentText }) {
        try {
            console.log("udatecommentfromappwrite");

            const response = await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionCommentsId, id, { commentText });
            console.log("response from update comment is ", response);
            return response;

        } catch (error) {
            console.log('error from updateComment func in config.js: ', error);
        }
    }

    // Fetch comments for a post
    async getComments() {
        try {
            const comments = await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionCommentsId, [
                Query.equal('status', "active"),
                Query.orderDesc('timestamp'), // To get the latest comments first
            ]);
            console.log("retrieved comments from DB sucessfully", comments);

            return comments;
        } catch (error) {
            console.log('error from getComments func in config.js: ', error);
            return false;
        }
    }


    // Followers Service
    async addFollower(userId_following, userId_follower) {
        try {
            const response = await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionFollowersId, ID.unique(), { userId_following, userId_follower });
            return response;
        } catch (error) {
            console.log('error from addFollower func in config.js: ', error);
            return error;
        }
    }

    async getFollower(userId_following, userId_follower) {
        queries = [
            Query.equal('userId', userId),
            Query.equal('followerId', followerId),
        ];

        try {
            const response = await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionFollowersId, queries);
            console.log('Response from getFollower: ');
            console.log(response);

            return response;
            // return response[0];
        } catch (error) {
            console.log('error from getFollowers func in config.js: ', error);
        }
    }

    async getFollowers(queries = [Query.equal('status', 'active')]) {

        try {
            const response = await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionFollowersId, queries);
            console.log('Response from getFollowers: ');
            console.log(response);
            return response;
        } catch (error) {
            console.log('error from getFollowers func in config.js: ', error);
        }
    }

    async removeFollower(id) {
        // const element = this.getFollower({ userId, followerId })
        // console.log('removefollower executed and below is the response: ');
        // console.log(element);
        // console.log(element.$id);
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionFollowersId, id);
            return true;
        } catch (error) {
            console.log('error from removeFollower func in config.js: ', error);
        }
    }

    async addUserProfile({userId,featuredImage,bio,pronoun,userName,status}) {
        try {
            const response = await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionUserProfileId, ID.unique(), {
                userId,
                featuredImage,
                bio,
                pronoun,
                userName,
                status,
            });
            return response;
        } catch (error) {
            console.log('error from addUserProfile func in config.js: ', error);
            return false;
        }

    }
    async updateUserProfile(id, { userId, featuredImage, bio, pronoun, userName, status }) {
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionUserProfileId, id, {
                userId,
                featuredImage,
                bio,
                pronoun,
                userName,
                status,
            });
        } catch (error) {
            console.log('error from updateUserProfile func in config.js: ', error);
        }

    }
    async deleteUserProfile(id) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionUserProfileId, id);
            return true;
        } catch (error) {
            console.log('error from deleteUserProfile func in config.js: ', error);
            return false;
        }

    }

    async getUserProfiles(queries = [Query.equal("status", "active")]) {
        try {
            const response = await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionUserProfileId, queries);
            console.log("in getUserProfiles in appwrite ");
            console.log(response);
            return response;

        } catch (error) {
            console.log('error from getUserProfiles func in config.js: ', error);
            return false;
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