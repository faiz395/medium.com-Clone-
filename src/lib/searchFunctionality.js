import algoliasearch from 'algoliasearch'
import service from '../appwrite/config.js'

export function searchFunctionality(){
    
    const client = algoliasearch('A6775ZQA6S', 'b113d25cab89008c776fe9bca2173b70')
    
    const index = client.initIndex('medium_blog')
    
    service.getPosts()
        .then(function (articles) {
            console.log("pritingarticles: ",articles);
            
            const valuesToUpload = articles.documents.map((ele) => ({
                ...ele,
                featuredImage: `https://cloud.appwrite.io/v1/storage/buckets/66c35271002418f1038d/files/${ele.featuredImage}/preview?project=66c33365000fe9ad0224`,
            }));
    
            return index.saveObjects(valuesToUpload, {
                autoGenerateObjectIDIfNotExist: true
            })
        })
        .catch((err) => {
            console.log(err);
        })

}

