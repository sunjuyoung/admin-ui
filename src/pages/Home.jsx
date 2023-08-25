import React, { useEffect } from "react";
import useStoreModal from "../hooks/use-store-modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);
  const onClose = useStoreModal((state) => state.onClose);
  const currentUser = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser?.userInfo) {
      onClose();
      navigate("/login");
    }

    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen, currentUser?.userInfo, onClose, navigate]);

  return null;
};

export default Home;
