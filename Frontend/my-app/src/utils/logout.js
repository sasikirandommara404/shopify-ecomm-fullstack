import store from '../store/store.jsx'
import { loginUser,updateUserInfo } from '../slice/slice.jsx'
import api,{setAccessToken} from '../api/axios.js'
import { showError,showSuccess } from './toast.jsx'

const AuthLogOut = async () =>{

    try{
        const data = await api.post('/user/logout')
        if(data.data.status === 'success'){
            showSuccess('Logout Sucessfully')
            setAccessToken(null)
            store.dispatch(loginUser(false))
            store.dispatch(updateUserInfo(null))
        }

    }catch(error){
        showError('Logouted Sucessfully')
        setAccessToken(null)
        store.dispatch(loginUser(false))
        store.dispatch(updateUserInfo(null))
    }

}
export default AuthLogOut