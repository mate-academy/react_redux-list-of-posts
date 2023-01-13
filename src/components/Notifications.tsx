import { FC, useEffect } from 'react';
import { SnackbarKey, useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import Notification from '../types/Notification';
import { appActions } from '../store/app/appSlice';
import { selectNotifications } from '../store/app/appSelectors';

let displayed:SnackbarKey[] = [];

const Notifications:FC = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const closeNotification = (key:SnackbarKey) => {
    dispatch(appActions.closeSnackbar({ key, dismissAll: Boolean(key) }));
  };

  const removeNotification = (key:SnackbarKey) => {
    dispatch(appActions.removeSnackbar(key));
  };

  const storeDisplayed = (key:SnackbarKey) => {
    displayed = [...displayed, key];
  };

  const removeDisplayed = (key:SnackbarKey) => {
    displayed = displayed.filter((id:SnackbarKey) => id !== key);
  };

  useEffect(() => {
    if (notifications) {
      notifications.forEach((
        {
          key,
          message,
          options = {},
          dismissed = false,
        }:Notification,
      ) => {
        if (dismissed) {
          closeSnackbar(key);

          return;
        }

        if (displayed.includes(key)) {
          return;
        }

        enqueueSnackbar(message, {
          key,
          ...options,
          action: (myKey:SnackbarKey) => (
            <Button
              style={{ color: 'white' }}
              size="small"
              onClick={() => closeNotification(myKey)}
            >
              <CloseIcon />
            </Button>
          ),
          onClose: (event, reason, myKey) => {
            if (options.onClose) {
              options.onClose(event, reason, myKey);
            }
          },
          onExited: (_, myKey:SnackbarKey) => {
            removeNotification(myKey);
            removeDisplayed(myKey);
          },
        });
        storeDisplayed(key);
      });
    }
  }, [notifications]);

  return null;
};

export default Notifications;
