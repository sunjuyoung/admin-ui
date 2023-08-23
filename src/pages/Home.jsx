import React, { useEffect } from "react";
import useStoreModal from "../hooks/use-store-modal";
import { useSelector } from "react-redux";

const Home = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);
  const currentUser = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser?.userInfo?.userId) {
      window.location.href = "/login";
    }

    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default Home;
