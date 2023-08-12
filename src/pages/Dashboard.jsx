import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getStore } from "../api/apiStore";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const currentUser = useSelector((state) => state.auth);
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading, isError, error, data } = useQuery(
    ["store", storeId],
    async () => {
      if (!currentUser?.userInfo) navigate("/login");
      if (!storeId) navigate("/");

      return await getStore(currentUser?.userInfo?.userId, storeId);
    }
  );

  if (isLoading) return <div>로딩중...</div>;

  if (!data) {
    navigate("/");
  }

  return <div>Active Store : {data?.data.name}</div>;
};

export default Dashboard;
