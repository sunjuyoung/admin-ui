import React, { useEffect } from "react";
import useStoreModal from "../hooks/use-store-modal";

const Home = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <div className="">Home</div>;
};

export default Home;
