import api from '../api/axios.js'
import { showError, showSuccess } from './toast.jsx'


const AddToCart = async (productId, userId) => {
    if (!userId) {
        showError('Please Login to add to cart');
        return false;
    }
    
    try {
        const response = await api.post('/add-to-cart', {
            userId: userId,
            productId: productId
        });
        
        if (response.data.status === 'success') {
            showSuccess('Product added to cart successfully');
            return true;
        } else {
            showError(response.data.message || 'Failed to add to cart');
            return false;
        }
    } catch (err) {
        console.error('Add to cart error:', err);
        showError(err.response?.data?.message || 'Please try again later');
        return false;
    }
}

export default AddToCart;