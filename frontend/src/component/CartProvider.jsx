import { act, Children, createContext, useContext, useReducer } from "react";

//global state
const CartStateContext = createContext()
const CartDispatchContext = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            let arr = [...state]
            let updated = false
            for (const index in arr) {
                if (arr[index].id === action.id && arr[index].size === action.size) {
                    arr[index] = { ...arr[index], quantity: parseInt(action.quantity) + arr[index].quantity, price: action.price + arr[index].price }
                    updated = true
                    break
                }
            }
            if (updated) {
                // console.log(arr)
                return arr
            }
            // let arr = [...state]
            // let updated = false
            // arr.forEach((item, index) => {
            //     if (item.id === action.id && item.size === action.size) {
            //         arr[index] = { ...item, quantity: parseInt(action.quantity) + item.quantity, price: action.price + item.price }
            //         updated = true
            //     }
            // })
            // if (updated)
            //     return arr
            // console.log(state)
            return [...state, { id: action.id, name: action.name, size: action.size, quantity: parseInt(action.quantity), image: action.image, price: action.price }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr
        case "DROP":
            let empArray = []
            return empArray
        // case "UPDATE":
        //     let arr = [...state]
        //     arr.forEach((item, index) => {
        //         if(item.id === action.id && item.size === action.size){
        //             arr[index] = {...item, quantity: parseInt(action.quantity) + item.quantity, price: action.price + item.price}
        //         }
        //     })
        //     return arr
        default:
            console.log("Error in reducer")
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)