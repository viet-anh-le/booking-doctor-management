import { useState, useEffect, use } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Rating from '@mui/material/Rating';
import { Button, Form, Modal, Input } from "antd";
import dayjs from "dayjs";
const serverURL = import.meta.env.VITE_SERVER_URL;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

function DoctorInfo() {
  const [form] = Form.useForm();
  const location = useLocation();
  const doctor = location.state?.doctor;
  const userAccount = useSelector(state => state.accountReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valueRating, setValueRating] = useState(0);
  const [allRates, setAllRates] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/reviews/${doctor._id}`,
        {
          method: "GET",
          credentials: "include"
        }
      );
      const result = await response.json();
      let averageRating = 0;
      const tempData = result.map(item => {
        const dayCreated = dayjs(item.createdAt).format('MMMM D YYYY [at] HH:mm');
        averageRating += item.rating;
        return (
          {
            ...item,
            dayCreated: dayCreated
          }
        )
      })
      if (result.length !== 0) averageRating /= result.length;
      setAverageRating(averageRating);
      setAllRates(tempData);
    };
    fetchApi();
  }, []);

  const handleOk = async () => {
    setIsModalOpen(false);
    try {
      const values = await form.validateFields();
      const fetchApi = async () => {
        const response = await fetch(`${serverURL}/api/reviews/create`, {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            ...values,
            doctor_id: doctor._id,
            client_name: userAccount.fullName
          }),
          credentials: "include"
        })
        const result = await response.json();
        if (result.status === 200) {
          const dayCreated = dayjs(result.dayCreated).format('MMMM D YYYY [at] HH:mm');
          setAllRates([...allRates, {
            ...values,
            client_name: userAccount.fullName,
            dayCreated: dayCreated
          }]);
        }
      }
      fetchApi();
    } catch (errorInfo) {
      console.log('Validation Failed:', errorInfo);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="list-view">
        <ul className="resultslist-content">
          <div>
            {doctor &&
              <>
                <li className="ep">
                  <div className="card-wrap w-[80%] m-auto">
                    <div className="card-body">
                      <article className="card-info-wrap">
                        <div className="card-img">
                          <img src={doctor.avatar} alt={doctor.fullName} />
                        </div>
                        <div className="card-content">
                          <div className="prov-name-wrap">
                            <h2>
                              <span className="prov-name" href="/">{doctor.fullName}</span>
                            </h2>
                          </div>
                          <p className="prov-speciality">
                            {doctor.specialization.join(", ")}
                          </p>
                          <div className="prov-addr-dist">
                            <address className="prov-address">
                              <span className="addr-text">{doctor.address}</span>
                            </address>
                          </div>
                          <div className="prov-bio">
                            <span className="bio-text">
                              <section>
                                <div className="html-content" dangerouslySetInnerHTML={{ __html: doctor.description }} />
                              </section>
                            </span>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </li>
              </>
            }
          </div>
        </ul>
      </div>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Reviews</h2>

            <div className="mt-2 flex items-center gap-2 sm:mt-0">
              <div className="flex items-center gap-0.5">
                <Rating value={averageRating} readOnly />
              </div>
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">{averageRating.toFixed(1)}</p>
              <span className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"> {allRates.length} Reviews </span>
            </div>
          </div>

          <div className="my-6 gap-8 sm:flex sm:items-start md:my-8">
            <div className="shrink-0 space-y-4">
              <Button type="primary" onClick={showModal}>Write a review</Button>
            </div>

          </div>
          {
            allRates?.map((rate, idx) => (
              <div key={idx} className="mt-6 border-b border-gray-200 dark:divide-gray-700">
                <div className="gap-3 pb-6 sm:flex sm:items-start">
                  <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                    <div className="flex items-center gap-0.5">
                      <Rating defaultValue={rate.rating} readOnly />
                    </div>

                    <div className="space-y-0.5">
                      <p className="text-base font-semibold text-gray-900 dark:text-white">{rate.client_name}</p>
                      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">{rate.dayCreated}</p>
                    </div>

                    <div className="inline-flex items-center gap-1">
                      <svg className="h-5 w-5 text-primary-700 dark:text-primary-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">{rate.description}</p>
                  </div>
                </div>
              </div>
            ))
          }

          <div className="mt-6 text-center">
            <Button type="primary">View more reviews</Button>
          </div>

          <Modal
            title={`Add a review for: ${doctor.fullName}`}
            open={isModalOpen}
            onOk={handleOk}
            okText="Add a review"
            onCancel={handleCancel}
            width={1000}
          >
            <Form
              form={form}
              {...layout}
              initialValues={{
                user: userAccount.fullName,
                rating: 0
              }}
            >
              <Form.Item
                name="user"
                label="Reviewer"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input readOnly />
              </Form.Item>
              <Form.Item
                name="rating"
                label="Rating"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Rating
                  value={valueRating}
                  onChange={(event, newValue) => {
                    setValueRating(newValue);
                    form.setFieldsValue({ rating: newValue });
                  }} />
              </Form.Item>
              <Form.Item
                name="description"
                label="Review Description"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </section>
    </>
  )
}

export default DoctorInfo;