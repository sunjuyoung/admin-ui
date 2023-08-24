import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getStore } from "../api/apiStore";
import SettingsForm from "../components/form/SettingsForm";

const Settings = () => {
  const currentUser = useSelector((state) => state.auth);
  const { storeId } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, error, data } = useQuery(
    ["store", storeId],
    async () => {
      if (!currentUser?.userInfo) navigate("/login");
      if (!storeId) navigate("/");

      return await getStore(currentUser?.userInfo?.userId, storeId);
    }
  );

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div className="flex-col">
      <div className="flex-1 space-x-2">
        <SettingsForm data={data.data} />
      </div>
    </div>
  );
};

export default Settings;
