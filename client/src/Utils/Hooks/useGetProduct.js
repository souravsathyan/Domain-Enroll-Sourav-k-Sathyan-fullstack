import { SERVER_API } from "../constants"
import axios from "axios"

const useGetProduct = async (paramsId, setEditProduct) => {
    try {
        const url = `${SERVER_API}/getProduct/${paramsId}`
        const response = await axios.get(url)
        const { product } = response
        setEditProduct(product)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

export default useGetProduct