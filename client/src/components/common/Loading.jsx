import { Loader2 } from 'lucide-react'

const Loading = () => {
  return (
    <div className='flex justify-center h-full items-center'>
      <Loader2 className='animate-spin' />
    </div>
  )
}

export default Loading