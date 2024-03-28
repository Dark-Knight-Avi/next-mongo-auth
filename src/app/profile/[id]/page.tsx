interface UserProfilePageProps {
    params: {
        id: string
    }
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({params}) => {
   return (
       <div className="text-3xl flex justify-center bg-black text-white items-center min-h-screen">
           Profile page: <span className="bg-orange-500 text-black p-2 ml-2">{params.id}</span>
       </div>
   );
}

export default UserProfilePage;