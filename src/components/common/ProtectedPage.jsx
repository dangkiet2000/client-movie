import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";

/* 
  * Không cho sử dụng một số features khi user chưa đăng nhập. Và nếu chưa đăng nhập thì nó show cái modal login để user có thể đăng nhập.
  * If có user (Tức ng dùng đã đăng nhập rồi thì return cái children ko thì return null)
*/

const ProtectedPage = ({ children }) => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(setAuthModalOpen(!user));
    }, [user, dispatch]);

    return user ? children : null;
};

export default ProtectedPage;
