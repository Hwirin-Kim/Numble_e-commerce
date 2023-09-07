import styled from "styled-components";
import ReactDOM from "react-dom";

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

export default function Modal({ closeModal, children }: ModalProps) {
  const root = document.getElementById("modal")!;

  return ReactDOM.createPortal(
    <StModal onClick={closeModal}>
      <StModalBody onClick={(e) => e.stopPropagation()}>{children}</StModalBody>
    </StModal>,
    root
  );
}

const StModal = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StModalBody = styled.div`
  box-shadow: 0 10px 3px 0 rgba(34, 36, 38, 0.15);
`;
