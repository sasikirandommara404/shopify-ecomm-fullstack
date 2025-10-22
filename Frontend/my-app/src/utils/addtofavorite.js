import api from '../api/axios.js'
import {showError,showSuccess} from './toast.jsx'

const addToFavorite = async (productId,userId)=>{
    console.log(productId)
    console.log(userId)
    try{
        const response = await api.post('/add-to-favorites',{
            userId:userId,
            productId:productId
        })
        if(response.data.message === 'Product added to favorites'){
            showSuccess('Product added to favorite');

        }else{
            showError(response.data.message)
        }

    }catch(error){
        console.log(error)
        showError(error.response.data.message)
    }
}
export default addToFavorite;