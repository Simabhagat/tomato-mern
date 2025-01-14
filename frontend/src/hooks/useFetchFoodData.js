import { useState, useEffect } from "react";

const useFetchFoodData = () => {
    const [foodCategory, setFoodCategory] = useState([])
    const [foodItems, setFoodItems] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try{
                let response = await fetch("http://localhost:3000/api/foodData", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                response = await response.json()
                setFoodItems(response[0])
                setFoodCategory(response[1])
            }catch(error){
                console.error("Error fetching food data: ", error)
            }
        }

        fetchData()
    },[])
    return {foodCategory, foodItems}
}

export default useFetchFoodData