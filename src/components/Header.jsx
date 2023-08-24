import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../slices/authSlice";

import useStoreModal from "../hooks/use-store-modal";
import SwitchStore from "./SwitchStore";

import { useQuery } from "@tanstack/react-query";
import { getStoreByUserId } from "../api/apiStore";
import UserButton from "./UserButton";

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
  }, []);

  const { isLoading, error, data } = useQuery(["store"], async () => {
    return await getStoreByUserId(currentUser?.userId);
  });

  if (isLoading) return <div>로딩중...</div>;
  console.log(error);

  const handleLogout = () => {
    console.log("로그아웃");
    localStorage.removeItem("userInfo");
    dispatch(logout({}));
    navigate("/login");
  };

  return (
    <div className="flex justify-between">
      {/*     메뉴 버튼        */}
      <div>
        <SwitchStore items={data?.data} />
      </div>

      {/*     유저 아바타        */}
      <div>
        <UserButton handleLogout={handleLogout} />
      </div>
    </div>
  );
};

export default Header;
