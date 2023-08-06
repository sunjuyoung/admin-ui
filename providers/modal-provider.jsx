import { useEffect, useState } from "react";

import React from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return <div>modal-provider</div>;
};

export default ModalProvider;
