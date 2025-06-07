import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function UserAddressCard({ userRole }) {
  const [account, setAccount] = useState(undefined);
  const doctorAccount = useSelector(state => state.doctorAccountReducer);
  const userAccount = useSelector(state => state.accountReducer);
  useEffect(() => {
    if (userRole === "client") setAccount(userAccount);
    else if (userRole === "doctor") {
      setAccount(doctorAccount);
    }
    else if (userRole === "admin") console.log("Admin role selected");
  }, []);
  
  return (
    account &&
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Address
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Province
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {account.hospital.province}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  District
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {account.hospital.district}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Hospital name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {account.hospital.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
