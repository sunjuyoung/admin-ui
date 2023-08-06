import React from "react";
import Modal from "./ui/modal";

const Header = () => {
  return (
    <div>
      <Modal
        title="Modal"
        description="Modal description"
        isOpen={true}
        onClose={() => {}}
      >
        <div>Modal content</div>
      </Modal>
    </div>
  );
};

export default Header;
