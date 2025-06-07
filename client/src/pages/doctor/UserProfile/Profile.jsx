import { useEffect } from "react";
import { useSelector } from "react-redux";
import UserMetaCard from "../../../components/UserProfile/UserMetaCard";
import UserInfoCard from "../../../components/UserProfile/UserInfoCard";
import UserAddressCard from "../../../components/UserProfile/UserAddressCard";
import PageMeta from "../../../components/common/PageMeta";

function Profile() {
  const doctorAccount = useSelector(state => state.doctorAccountReducer);
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
            <UserMetaCard userRole={doctorAccount.role}/>
            <UserInfoCard userRole={doctorAccount.role}/>
            <UserAddressCard userRole={doctorAccount.role}/>
          </div>
        </div>
      </>
    </>
  )
}

export default Profile;