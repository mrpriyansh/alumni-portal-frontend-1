import Swal from 'sweetalert2/src/sweetalert2';
import '@sweetalert2/theme-dark/dark.css';
import './styles.css';
import registerPopsvg from '../../assets/images/registerPopup.svg';

const getAlert = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    background: '#10116E',
    timerProgressBar: true,
    onOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  return Toast;
};

export const triggerAlert = data => {
  const toast = getAlert();
  toast.fire(data);
};

export const registerPopup = notify => {
  Swal.fire({
    timer: 4500,
    title: 'Thank You for registration!!',
    text: notify,
    imageUrl: registerPopsvg,
    background: '#fff',
    width: '30%',
    // height: '16.875%',
    imageWidth: '80%',
    imageHeight: '80%',
    imageAlt: 'Custom image',
    timerProgressBar: true,
    // animation: false,
    customClass: {
      container: 'container-class',
      popup: 'popup-class',
      header: 'header-class',
      title: 'title-class',
      content: 'content-class',
      actions: 'actions-class',
    },
    // onClose: redirectToLanding,
  });
};
export default getAlert;
