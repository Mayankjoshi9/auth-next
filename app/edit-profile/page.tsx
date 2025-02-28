import ProtectedRoute from '@/components/auth/ProtectedRoute'
import EditPage from '@/components/pages/EditPage'

const page = () => {
  return (
    <ProtectedRoute>
      <EditPage/>

    </ProtectedRoute>
    
  )
}

export default page