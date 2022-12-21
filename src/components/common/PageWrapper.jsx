import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../redux/features/appStateSlice";

const PageWrapper = ({ children, state }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAppState(state));
    }, [state, dispatch]);

    return children;
};

export default PageWrapper;
