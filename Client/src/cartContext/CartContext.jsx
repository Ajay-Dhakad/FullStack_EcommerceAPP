import { createContext,useContext,useReducer } from "react";

const CartContext = createContext();

const CartReducers = (state,action) => {
    switch(action.type) {

        case 'ADDTOCART':
            return{

                ...state,
                 userCart: action.payload
            }

        case 'ADDITEMTOCART':
            return{
                ...state,
                userCart:[ action.payload,...state.userCart]  
            };
            

        case 'REMOVEITEMFROMCART':
            return{
                ...state,
                userCart: state.userCart.filter(item => item._id!== action.payload)
            }

        case 'INCREASEQUANTITY':

            return{
                ...state,
                userCart: state.userCart.map((item)=> item._id == action.payload ? {...item,quantity:item.quantity+1} : item )

            }

        case 'DECREASEQUANTITY':

        return{
            ...state,
            userCart: state.userCart.map((item)=> item._id == action.payload ? {...item,quantity:item.quantity-1} : item )

        }

        case 'REMOVEFROMCART':

        return{
            ...state,
            userCart: state.userCart.filter((item)=> item._id != action.payload )
        }

        case 'ADDTOWISHLIST':

        return{

            
           ...state,
              userWishlist: action.payload
        }

        case 'REMOVEFROMWISHLIST':
            
        return{
            ...state,
            userWishlist: state.userWishlist.filter((item)=> item._id !== action.payload )
        }

        case 'ADDWISHLISTITEM':
            return{
                ...state,
                 userWishlist: [action.payload,...state.userWishlist]
            }

        case 'SETORDERS':
            
        return{
            ...state,
             userOrders: action.payload
        }

        default:
            return state;
    

    }
} 

export const CartContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(CartReducers,{
        userCart:[],
        userWishlist:[],
        userOrders:[],
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