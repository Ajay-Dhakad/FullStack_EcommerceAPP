import React, { useState,useEffect } from 'react'
import { useAuth } from '../authContext/AuthContext'
import { UpdateUserProfile } from './userAuthComponents/AuthHandlers/authHandlers'
import {Toaster,toast} from 'react-hot-toast'

function ProfilePage() {

  const [userData,setUserData] = useState(null)
  const [profileEditable,setProfileEditable] = useState(false)
  const [editedProfile,setEditedProfile] = useState({})


  const UpdatedProfileHandler = async () => {

    const data = await UpdateUserProfile(editedProfile)

    if (data.success){
      toast.success(data.message)
      setProfileEditable(false)
      // setEditedProfile({})
      setUserData(data.updatedUser)
    }
    else{
      toast.error(data.message)
    }

  }

    const {user} = useAuth()

    // console.log(editedProfile)
    
   
    useEffect(() => {
      setUserData(user)
      window.scrollTo({top: 0, behavior:'smooth'})
      // console.log(user)
    }, [])

   return (
    <>
    <Toaster position='top-center'/>
    <div className='profilepage'>
      <div className="profile-card">
        <div className="avatar">
            <img src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" alt="" />
        </div>
        <div className="userdetails">
            <h2>Profile</h2>
           <p>Username : <b style={{border:profileEditable && '1px solid white',overflowX:'scroll'}} contentEditable={profileEditable} onInput={(e) => setEditedProfile({...editedProfile,name:e.target.innerText}) }>{userData?.name}{userData?.role == 'admin' && '(Admin)'}</b></p>
            <p>Email : <b > {userData?.email}</b></p>
            {userData?.phoneNumber && <p>Phone Number : <b style={{border:profileEditable && '1px solid white'}} contentEditable={profileEditable} onInput={(e) => setEditedProfile({...editedProfile,phoneNumber:e.target.innerText}) }> {userData?.phoneNumber}</b></p>}
            <p>Address : <b style={{border:profileEditable && '1px solid white'}} contentEditable={profileEditable} onInput={(e) => setEditedProfile({...editedProfile,address:e.target.innerText}) }>{userData?.address}</b></p>
            <button onClick={() => {profileEditable ? UpdatedProfileHandler(): setProfileEditable(true)}} className="edit-btn">{ !profileEditable ? 'Edit Profile' : 'Save'}</button>
            {/* <button className="logout-btn">Logout</button> */}
    
      </div>
      </div>
    </div>
    </>
  )
}

export default ProfilePage
