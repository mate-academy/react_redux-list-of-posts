import { FC } from 'react';
import { Modal } from 'react-bootstrap';

type Props = {
  show: boolean,
  handleClose: () => void,
  backdrop?: 'static' | boolean,
  keyboard?: boolean
  size?: 'sm' | 'lg' | 'xl',
  title: string,
  children: JSX.Element,
};

export const Wrapper: FC<Props> = ({
  show,
  handleClose,
  backdrop,
  keyboard,
  size,
  title,
  children,
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop={backdrop}
      keyboard={keyboard}
      size={size}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

Wrapper.defaultProps = {
  backdrop: true,
  keyboard: true,
  size: 'lg',
};
