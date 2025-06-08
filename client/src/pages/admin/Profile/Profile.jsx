import { useEffect } from "react";
import { useSelector } from "react-redux";
import UserMetaCard from "../../../components/UserProfile/UserMetaCard";
import UserInfoCard from "../../../components/UserProfile/UserInfoCard";
import PageMeta from "../../../components/common/PageMeta";

function AdminProfile() {
  const adminAccount = useSelector(state => state.accountReducer);
  return (
    <>
      <>
        <PageMeta
          title="Portfolio Page"
        />
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
            Profile
          </h3>
          <div className="space-y-6">
            <UserMetaCard userRole={adminAccount.role}/>
            <UserInfoCard userRole={adminAccount.role}/>
          </div>
        </div>
      </>
    </>
  )
}

export default AdminProfile;