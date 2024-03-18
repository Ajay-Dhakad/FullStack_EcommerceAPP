
export const UseLogin = async(email,password) => {

    const data = await fetch(`${import.meta.env.VITE_API_URI}/api/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password})
    })

    const json = await data.json()

    console.log(json)

    return json;
}

export const UseRegister = async(name,email,password,address,phoneNumber) => {
    const data = await fetch(`${import.meta.env.VITE_API_URI}/api/signup`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email,password,address,phoneNumber})
    })

    const json = await data.json()
    
    return json;
}

export const UpdateUserProfile = async (editedProfile) => {
    const data = await fetch(`${import.meta.env.VITE_API_URI}/api/updateprofile`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({...editedProfile})
    })

    const json = await data.json()
    
    return json;
}