import React, { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";

const AlertModal = ({ isOpen, onClose, onConfirm, loading }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="상점을 삭제 하시겠습니까?"
      description="삭제된 상점은 복구할 수 없습니다."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-4 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          취소
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          삭제
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
