import { config } from "../config/config";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class DbStorage{
    client=new Client();
    tableDB;
    storage;

    constructor(){
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectID);

        this.tableDB=new TablesDB(client);
        this.storage=new Storage(client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.tableDB.createRow({
                databaseId:config.appwriteDatabaseID,
                tableId:config.appwriteCollectionID,
                rowId:slug,
                data:{
                    title,content,featuredImage,status,userId
                }
            })
        } 
        catch (error) {
            throw error;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.tableDB.updateRow({
                databaseId:config.appwriteDatabaseID,
                tableId:config.appwriteCollectionID,
                rowId:slug,
                data:{
                    title,content,featuredImage,status
                }
            })    
        } 
        catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.tableDB.deleteRow({
                databaseId:config.appwriteDatabaseID,
                tableId:config.appwriteCollectionID,
                rowId:slug
            })
            return true;
        } 
        catch (error) {
            throw error;
        }
    }

    async getPost(slug){
        try {
            return await this.tableDB.getRow({
                databaseId:config.appwriteDatabaseID,
                tableId:config.appwriteCollectionID,
                rowId:slug
            })
            
        } 
        catch (error) {
            throw error;
        }
    }

    async getAllPost(query=[Query.equal("status","active")]){
        try {
            return await this.tableDB.listRows({
                databaseId:config.appwriteDatabaseID,
                tableId:config.appwriteCollectionID,
                rowId:slug,
                queries:query
            })
            
        } 
        catch (error) {
            throw error;
        }
    }

    // file upload

    async uploadFile(file){
        try {
            return await this.storage.createFile({
                bucketId:config.appwriteBucketID,
                fileId:ID.unique(),
                file,

            })
        } 
        catch (error) {
            throw error;    
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile({
                bucketId:config.appwriteBucketID,
                fileId
                
            })
            return true;
        } 
        catch (error) {
            throw error;    
        }
    }

    FilePreview(fileId){
        
        return this.storage.getFilePreview({
            bucketId:config.appwriteBucketID,
            fileId,
        })
    
    }
}

export const dbstorage=new DbStorage()