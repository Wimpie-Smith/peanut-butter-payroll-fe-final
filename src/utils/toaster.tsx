import { toast, ToastOptions, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/** BCUSTOM TOASTER
 * @param isSuccess True - Success / False - Failed
 * @param header Item description, short heading
 * @param message Main message that can be displayed
*/

const customToaster = (isSuccess: boolean, header: string, message: string): void => {
    const toastContent = (
        <div>
            <h5 style={{ marginTop: '10px' }}>{header}</h5>
            <p style={{ marginTop: '-10px' }}>{message}</p>
        </div>
    );

    const successOptions: ToastOptions = {
        position: "bottom-right" as ToastPosition,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        icon: false,
        style: { backgroundColor: 'rgb(50, 168, 82)', color: 'white' } // Success toast style
    };

    const errorOptions: ToastOptions = {
        position: "bottom-right" as ToastPosition,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        icon: false,
        style: { backgroundColor: 'rgb(212, 72, 72)', color: 'white' } // Error toast style
    };

    if (isSuccess) {
        toast.success(toastContent, successOptions);
    } else {
        toast.error(toastContent, errorOptions);
    }
};

export default customToaster;
