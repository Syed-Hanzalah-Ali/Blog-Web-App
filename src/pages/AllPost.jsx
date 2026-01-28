import React,{useState,useEffect} from 'react'
import { dbstorage } from '../appwrite/db.storage'
import { PostCard,Container } from '../components/index'

function AllPost() {
    const [posts,setPosts]=useState([]);

    useEffect(()=>{
        dbstorage.getAllPost()
        .then((posts)=>{
            setPosts(posts.documents)
        })
    },[])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
            {
                posts.map((post)=>{
                    return(
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard post={post}/>
                        </div>
                    )
                })
            }

            </div>
        </Container>
    </div>
  )
}

export default AllPost