import React, {useState , useEffect} from 'react'
import { Container , PostCard } from '../components'
import appwriteService from '../appwrite/conf'
import { useNavigate } from 'react-router-dom'

import authService from '../appwrite/auth'

function Home() {

    const navigate = useNavigate()

    const [posts , setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    },[])
    
    
 
    
    if (posts.length === 0) {
        return (
          <div className="w-full h-screen flex items-center justify-center">
            <Container>
              <div className="flex flex-wrap justify-center">
                <div className="p-2 w-full text-center">
                  <h1 className="text-2xl font-bold text-[#16423C]">
                    Login to read posts
                  </h1>
                  <button
                    onClick={() => navigate("/login")}
                    type="button"
                    className="text-white mt-4 bg-[#6A9C89] hover:bg-[#16423C] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Login
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </Container>
          </div>
        );
    }
    
    
    return (
        <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
    
    )
}

export default Home