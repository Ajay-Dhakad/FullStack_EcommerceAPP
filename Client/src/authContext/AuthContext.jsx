import {createContext,useReducer,useContext} from 'react'

const authContext = createContext();

const AuthReducers = (state,action) => {

        switch(action.type) {
            case 'LOGIN':
                return {
                    isAuthenticated: true,
                    user: action.payload
                }
            case 'LOGOUT':

                localStorage.removeItem('auth_token')
                return {
                    isAuthenticated: false,
                    user: null
                }
            default:
                return state;
        

    }

}

export const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(AuthReducers,{
        isAuthenticated:false,
        user:null,
    }
        )

    return (
       
        <authContext.Provider value={{...state,dispatch}}>
        {children}
        </authContext.Provider>
    
    )
}

export const useAuth = () => {

    return useContext(authContext)
}