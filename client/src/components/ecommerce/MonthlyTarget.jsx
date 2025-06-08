import Chart from "react-apexcharts";
import { useState, useEffect } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import { Modal, Form, InputNumber } from "antd";

const serverURL = import.meta.env.VITE_SERVER_URL;

export default function MonthlyTarget({ data }) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [target, setTarget] = useState(0);
  const [series, setSeries] = useState([0]);
  const [dailyBooking, setDailyBooking] = useState(0);
  const thisMonth = new Date().getMonth();
  const [cur, setCur] = useState(data[thisMonth]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);

    const fetchApi = async () => {
      const values = await form.validateFields();
      const response = await fetch(`${serverURL}/api/admin/stat/target/create`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          ...values,
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        }),
        credentials: "include"
      })
      const result = await response.json();
      console.log(result);
    }
    fetchApi();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/stat/target`,
        {
          method: "GET",
          credential: "include",
        }
      );
      const result = await response.json();
      if (result) setTarget(result.target);
    };
    fetchApi();

    const fetchAppDaily = async () => {
      const response = await fetch(`${serverURL}/api/admin/stat/daily`,
        {
          method: "GET",
          credential: "include",
        }
      );
      const result = await response.json();
      if (result) setDailyBooking(result.count);
    };
    fetchAppDaily();
  }, [])

  useEffect(() => {
    setCur(data[thisMonth])
  }, [data]);

  useEffect(() => {
    if (target > 0 && typeof cur === 'number') {
      setSeries([(cur / target * 100).toFixed(2)]);
    } else {
      setSeries([0]);
    }
  }, [cur, target]);
  const options = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5, // margin is in pixels
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Monthly Target
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Target you’ve set for each month
            </p>
          </div>
          <div className="relative inline-block">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
            </button>
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="w-40 p-2"
            >
              <DropdownItem
                onItemClick={showModal}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Set New Target
              </DropdownItem>
            </Dropdown>
          </div>
          <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form
              form={form}
              initialValues={{
                target: target
              }}
            >
              <Form.Item
                name="target"
                label="Target"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <InputNumber />
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <div className="relative ">
          <div className="max-h-[330px]" id="chartDarkStyle">
            <Chart
              key={series[0]}
              options={options}
              series={series}
              type="radialBar"
              height={330}
            />
          </div>

        </div>
        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          There are {dailyBooking} bookings today
        </p>
      </div>

      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Target
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {target}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Revenue
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {cur}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Today
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {dailyBooking}
          </p>
        </div>
      </div>
    </div>
  );
}
