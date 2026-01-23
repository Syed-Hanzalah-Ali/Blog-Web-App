import { config } from "../config/config";
import {Client,Account,ID} from "appwrite"

export class AuthService{
    client=new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectID);

        this.account=new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
            const result=await this.account.create({
                userId:ID.unique(),
                email,
                password,
                name
            })
            if(result){
                return this.login({email,password})
            }
            else{
                return result;
            }
            
        } 
        catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            const result=await this.account.createEmailPasswordSession({
                email,password
            });
            return result;
            
        } 
        catch (error) {
            throw error;    
        }
    }

    async getCurrentUser(){
        try {
            const result=await this.account.get()
            if(result){
                return result;
            }
            return null;
        } 
        catch (error) {
            throw error;    
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions();    
        } 
        catch (error) {
            throw error;
        }
    }
}


export const authService=new AuthService()