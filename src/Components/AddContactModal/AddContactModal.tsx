import cl from "./AddContactModal.module.scss";

export const AddContactModal = ({ modalVisible, setModalVisible }: { modalVisible: boolean; setModalVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <div
      onClick={() => {
        setModalVisible(false);
      }}
      className={`${cl.modalWrapper} ${modalVisible ? cl.active : ""}`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cl.modalContent}
      >
        Misha
      </div>
    </div>
  );
};
