import CustomTab from './_components/customTab'
import UserProfile from './_components/userProfile'

export default function ProfilePage() {
  const userData = {
    id: '1',
    username: 'John Doe',
    email: 'johnDoe@gmail.com',
    profileImageURL: 'https://www.gstatic.com/webp/gallery/1.jpg',
  }
  const menuData = [
    {
      id: '1',
      name: 'Menu Name',
      description:
        'Menu Description ja Menu Description ja Menu Description ja Menu Description ja',
      imageUrl: 'https://www.gstatic.com/webp/gallery/1.jpg',
      isFavorite: false,
      isOwner: true,
    },
    {
      id: '12',
      name: 'Menu Name',
      description:
        'Menu Description ja Menu Description ja Menu Description ja Menu Description ja',
      imageUrl: 'https://www.gstatic.com/webp/gallery/1.jpg',
      isFavorite: false,
      isOwner: true,
    },
    {
      id: '13',
      name: 'Menu Name',
      description:
        'Menu Description ja Menu Description ja Menu Description ja Menu Description ja',
      imageUrl: 'https://www.gstatic.com/webp/gallery/1.jpg',
      isFavorite: false,
      isOwner: true,
    },
    {
      id: '2',
      name: 'Menu Name 2',
      description:
        'Menu Description ja Menu Description ja Menu Description ja Menu Description ja',
      imageUrl: 'https://www.gstatic.com/webp/gallery/1.jpg',
      isFavorite: true,
      isOwner: false,
    },
    {
      id: '3',
      name: 'Menu Name 3',
      description:
        'Menu Description ja Menu Description ja Menu Description ja Menu Description ja',
      imageUrl: 'https://www.gstatic.com/webp/gallery/1.jpg',
      isFavorite: false,
      isOwner: false,
    },
    {
      id: '555',
      name: 'Menu Name 555',
      description:
        'Menu Description ja Menu Description ja Menu Description ja Menu Description ja',
      imageUrl: 'https://www.gstatic.com/webp/gallery/1.jpg',
      isFavorite: false,
      isOwner: false,
    },
  ]
  return (
    <div className="flex w-full justify-center py-12">
      <div className="flex gap-12 flex-col lg:flex-row items-center lg:items-start px-10 lg:px-0">
        <UserProfile
          id={userData.id}
          username={userData.username}
          email={userData.email}
          profileImageURL={userData.profileImageURL}
        />
        <CustomTab menus={menuData} />
      </div>
    </div>
  )
}
