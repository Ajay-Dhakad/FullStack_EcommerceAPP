import React,{useState,useEffect} from 'react'
import { getAllUsers } from '../ProductHandlers/ProductHandler'
import {motion} from 'framer-motion'
import { beautifyDate } from '../Utils/BeutifyDate'
function UsersAdminpage({classname}) {

  const [users,setusers] = useState(null)

  const getusers = async() => {
    const data = await getAllUsers()
    if (data?.success && data?.users?.length > 0) {
      setusers(data.users)
      console.log(data.users)
    } else {
      setusers([])
    }
  }

  useEffect(() => {
    getusers()
  },[])

  return (
    <div className={classname}>
        <h1 className='title'>Users({users?.length || 0})</h1>

        {users !== null && users.length > 0 && (
          <motion.table
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5 }}
            border='0'
          >
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Phone</th>
                <th>JoinedOn</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0, translateY: -20 }}
                  whileInView={{ opacity: 1, translateY: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.01 }}
                >
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.phoneNumber || 'N/A'}</td>
                
                  <td>
                    <small>{beautifyDate(user.createdAt)}</small>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        )}



    </div>
  )
}

export default UsersAdminpage
