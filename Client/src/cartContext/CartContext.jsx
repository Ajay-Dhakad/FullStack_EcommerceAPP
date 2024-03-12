import { createContext,useContext,useReducer } from "react";

const CartContext = createContext();

const CartReducers = (state,action) => {
    switch(action.type) {

        case 'ADDTOCART':
            return{
                userCart: action.payload
            }

        case 'INCREASEQUANTITY':

            return{
                userCart: state.userCart.map((item)=> item._id == action.payload ? {...item,quantity:item.quantity+1} : item )

            }

        case 'DECREASEQUANTITY':

        return{
            userCart: state.userCart.map((item)=> item._id == action.payload ? {...item,quantity:item.quantity-1} : item )

        }

        case 'REMOVEFROMCART':

        return{
            userCart: state.userCart.filter((item)=> item._id != action.payload )
        }

        default:
            return state;
    

    }
} 

export const CartContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(CartReducers,{
        userCart:[]
    })
    return (
        <CartContext.Provider value={{...state,dispatch}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}