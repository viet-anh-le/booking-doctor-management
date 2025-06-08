import { useState, useEffect } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

const serverURL = import.meta.env.VITE_SERVER_URL;

export default function EcommerceMetrics() {
  const [userThisMonth, setUserThisMonth] = useState(0);
  const [userChange, setUserChange] = useState(0);
  const [appThisMonth, setAppThisMonth] = useState(0);
  const [appChange, setAppChange] = useState(0);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/stat/count-user`,
        {
          method: "GET",
          credential: "include",
        }
      );
      const result = await response.json();
      setUserThisMonth(result.thisMonth);
      setUserChange(result.change);
    };
    fetchApi();

    const fetchApp = async () => {
      const response = await fetch(`${serverURL}/api/admin/stat/count-appointment`,
        {
          method: "GET",
          credential: "include",
        }
      );
      const result = await response.json();
      setAppThisMonth(result.thisMonth);
      setAppChange(result.change);
    };
    fetchApp();
  }, [])
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Customers
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {userThisMonth}
            </h4>
          </div>
          <Badge color={userChange > 0 ? "success" : "error"}>
            {userChange > 0? <ArrowUpIcon /> : <ArrowDownIcon />}
            {userChange.toFixed(2)}%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Number of booking
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {appThisMonth}
            </h4>
          </div>

          <Badge color={appChange > 0 ? "success" : "error"}>
            {appChange > 0? <ArrowUpIcon /> : <ArrowDownIcon />}
            {appChange.toFixed(2)}%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
