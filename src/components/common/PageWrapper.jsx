import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../redux/features/appStateSlice";

/*
    ? Why do we need this component??
    * Chúng ta có cái menu on Topbar và làm sao để active cái item của menu nào đang được show on screen.
    * => We use this component to wrap các component tương ứng với các item của menu và setState cho entire application.
    * Nhờ this component mà we know which item's menu is actived và còn nhiều benefits nữa.
*/

const PageWrapper = ({ children, state }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0); // * When app state change (from home state => search state) => Go to top of screen => UX
        dispatch(setAppState(state));
    }, [state, dispatch]);

    return children;
};

export default PageWrapper;
