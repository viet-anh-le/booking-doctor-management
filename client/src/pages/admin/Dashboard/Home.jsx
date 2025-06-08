import EcommerceMetrics from "../../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../../components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "../../../components/ecommerce/MonthlyTarget";
import { useState, useEffect } from "react";

const serverURL = import.meta.env.VITE_SERVER_URL;

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/stat/count-appointment12Month`,
        {
          method: "GET",
          credential: "include",
        }
      );
      const result = await response.json();
      setData(result.monthlyCounts);
    };
    fetchApi();
  }, [])
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart data={data}/>
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget data={data}/>
        </div>

      </div>
    </>
  );
}
