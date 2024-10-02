import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button 
    className="inline-block px-6 py-2 duration-200 font-bold text-[#16423C] hover:bg-[#6A9C89] rounded-full"
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn