import React, { useEffect } from "react";
import useStoreModal from "../hooks/use-store-modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);
  const currentUser = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser?.userInfo) {
      window.location.assign("/login");
    }

    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen, currentUser?.userInfo]);

  return null;
};

export default Home;
