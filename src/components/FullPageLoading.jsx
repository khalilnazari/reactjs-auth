import { ImSpinner3 } from "react-icons/im";

const FullPageLoading = () => {
    return (
        <div className="bg-gray-300/30 fixed top-0 right-0 left-0 bottom-0 h-screen">
            <div className="flex gap-1 items-center justify-center h-full">
                <ImSpinner3 />
                <p>Loading...</p>
            </div>
        </div>
    );
};

export default FullPageLoading;
