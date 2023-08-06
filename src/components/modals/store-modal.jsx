import Modal from "../ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

const StoreModal = () => {
  const storeModal = useStoreModal();

  return (
    <Modal
      title="상점 만들기"
      description="상점을 만들어보세요!"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    ></Modal>
  );
};

export default StoreModal;
