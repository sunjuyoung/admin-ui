import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { redirect, useParams, useSearchParams } from "react-router-dom";
import { getStore } from "../api/apiStore";

const Dashboard = () => {
  const currentUser = useSelector((state) => state.auth);
  let [searchParams, setSearchParams] = useSearchParams();
  const { storeId } = useParams();

  const { isLoading, isError, error, data } = useQuery(
    ["store", currentUser.userInfo.userId],
    async () => {
      await getStore(currentUser.userInfo.userId, storeId);
    }
  );
  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  if (!currentUser.userInfo) {
    redirect("/login");
  }

  console.log(data);
  return <div>Dashboard</div>;
};

export default Dashboard;
