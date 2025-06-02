import { Button, Space } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export const ComponentCard = ({
  title,
  children,
  className = "",
  desc = "",
  button = "",
  id = "",
  onToggle,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="px-6 py-5 flex justify-between items-start">
        {/* Left: Title + Description */}
        <div>

          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            <Space size="small">
              <Button type="link" onClick={() => navigate(-1)}> <ArrowLeftOutlined /> </Button>
              {title}
            </Space>
          </h3>
          {desc && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {desc}
            </p>
          )}
        </div>

        {/* Right: Button */}
        <div>
          {button === "Add Doctor" && (
            <Link to="/admin/add-doctor">
              <Button type="primary">{button}</Button>
            </Link>
          )}
          {button === "Add Department" && (
            <Link to={`/admin/add-department/${id}`}>
              <Button type="primary">{button}</Button>
            </Link>
          )}

          {button === "Add Service" && (
            <Link to={`/admin/add-service/${id}`}>
              <Button type="primary">{button}</Button>
            </Link>
          )}

          {(button === "Add Hospital" || button === "Add Clinic") && (
            <>
              <Button type="primary" className="m-2" onClick={onToggle}>
                {button === "Add Hospital" ? "Clinic" : "Hospital"}
              </Button>
              {
                button === "Add Hospital" &&
                <Link to="/admin/add-hospital">
                  <Button type="primary">{button}</Button>
                </Link>
              }
              {
                button === "Add Clinic" &&
                <Link to="/admin/add-clinic">
                  <Button type="primary">{button}</Button>
                </Link>
              }
            </>
          )}
        </div>
      </div>


      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

