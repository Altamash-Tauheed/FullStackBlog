import appwriteService from '../appwrite/conf'
import { Link } from 'react-router-dom'

function PostCard({$id, title , featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-[#C4DAD2] rounded-xl p-3'>
            <div className='w-auto items-center justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl w-full h-60 object-cover'/>
            </div>
            <h2 className='text-xl font-bold text-[#16423C]'>{title}</h2>
        </div>
    </Link>
    
  )
}

export default PostCard