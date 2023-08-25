import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../slices/authSlice";

import useStoreModal from "../hooks/use-store-modal";
import SwitchStore from "./SwitchStore";

import { useQuery } from "@tanstack/react-query";
import { getStoreByUserId } from "../api/apiStore";
import UserButton from "./UserButton";
import MainNav from "./MainNav";

const Header = () => {
  const [open, setOpen] = useState(false);
  const currentUser = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();

  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  const dispatch = useDispatch();
  const param = useParams();

  useEffect(() => {
    if (!currentUser?.userId) navigate("/login");
  }, [currentUser?.userId, navigate]);

  const userId = currentUser?.userId;

  const { isLoading, isError, error, data } = useQuery(
    ["store", userId],
    async () => {
      if (!userId) navigate("/login");

      return await getStoreByUserId(userId);
    }
  );

  if (isLoading) return <div>로딩중...</div>;
  console.log(error);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(logout({}));
    navigate("/login");
  };

  return (
    <div className="flex h-16 items-center px-4">
      {/*     메뉴 버튼        */}
      <div className="mx-4">
        <SwitchStore items={data?.data} />
      </div>
      <MainNav />
      {/*     유저 아바타        */}
      <div className="ml-auto flex items-center space-x-4">
        <UserButton handleLogout={handleLogout} />
      </div>
    </div>
  );
};

export default Header;
