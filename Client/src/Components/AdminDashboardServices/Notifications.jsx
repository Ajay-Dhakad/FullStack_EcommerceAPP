import React from 'react'

function Notifications({classname}) {
    const handleNotifications = () => {

    }   
  return (
    <div className={classname}>
      <h1>Manage your notifications <button onClick={() => handleNotifications()}>+</button> </h1>
    </div>  
  ) 
}   

export default Notifications
