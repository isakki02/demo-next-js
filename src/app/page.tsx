'use client'

import BlogPreviewCard from '@/components/Cards/BlogPreviewCard'
import Loader from '@/components/layout/Loader'
import Toast from '@/components/layout/Toast'
import { useGetAllPosts } from '@/hooks/postQueries'
import { PostProps } from '@/types/post'

const Home = () => {
  const getAllPostQuery = useGetAllPosts()

  // if (getAllPostQuery.isSuccess) {
  //   <Toast title='Posts fetched successfully' status='success' />
  // }

  if (getAllPostQuery.isLoading) {
    return <Loader />
  }

  return (
    <div className="container my-5">
      <div className='row g-3 justify-content-center'>
        {getAllPostQuery?.data?.records?.map((record: PostProps) => (
          <div key={record?.id} className='col-12 col-md-4 col-lg-3'>
            <BlogPreviewCard image='/blog-images/firstPic.jpg' title={record?.title} desc={record?.desc} postId={record?.id!!} authorId={record.authorId} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
