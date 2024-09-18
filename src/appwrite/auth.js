import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js"

class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId); 

        this.account=new Account(this.client);
    }

    async createAccount({ name, email, password }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                // console.log('In createAccount func: account created successfully in appwrite');
                // call a function to login automatically
        
                return this.login({ email, password });
            }
            else {
                return userAccount;
            }
        } catch (error) {
            console.log('In createAccount func: ERROR: account created not done in appwrite: ',error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            // try to use Dispatch to mark the value as true
            console.log('login successfull in appwrite');
            
            return await this.account.createEmailPasswordSession(email, password);

        } catch (error) {
            console.log("Error is Login createEmailSession",error);
            
            throw error;
        }

    }

    async getCurrentUser() {
        try {
            const details= await this.account.get()
            // .then(() => { console.log("in FUNC logged in") }).catch((err) => {
            //     console.log("in FUNC Error" + err);
            // }).finally(() => {
            //     console.log("in FUNC FINALLY");
            // });
            // console.log("In gettcurrentUser details val is mentioned below ");
            // console.log(details);
            return details;

        } catch (error) {
            console.log('error in getCurrentUser function in auth.js: ', error);
            // return false;
        }

        return false;
    }

    async logout() {
        try {
            return this.account.deleteSessions()
        } catch (error) {
            console.log('error in logout function in auth.js: ', error);
        }
    }

    async updateUserName(name){
        try{
            const response = await this.account.updateName(name);
            return response;
        }
        catch(error){
            console.log("Error is update username in auth.js: ",error);
            throw error;
        }
    }

    async updateProfilePrefs(prefs){

        // 1. upload image - frontend

        // prefs={
        //     'profileImage':'66d690110034b494832d',
        //     'pronoun':'him',
        //     'bio':'hello world from bio!',
        // }

        //  2. Change name - frontend

        // 3. update prefs
        try{
            const response = await this.account.updatePrefs(prefs);
            return response;
        }
        catch(error){
            console.log("Error is updateprefs in auth.js: ",error);
            throw error;
        }
        
    }


     // list users
     async getAllTheUsers() {
        try {
            const response = await this.functions.createExecution('66e8e1d90031003541f9');
            const result = JSON.parse(response.response);
            console.log("response from getAllTheUsers is ", result);
            return result;
        } catch (error) {
            console.log('Error in getAllTheUsers function: ', error);
            throw error;
        }
    }
    

}

const authService = new AuthService();

export default authService;
