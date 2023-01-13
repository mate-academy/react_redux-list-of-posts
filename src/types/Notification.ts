import { SharedProps, SnackbarKey } from 'notistack';

interface Notification {
  key: SnackbarKey;
  message: string;
  options?: SharedProps;
  dismissed?: boolean;
}

export default Notification;
