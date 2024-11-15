"use client";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import DatePickerTwo from "@/components/FormElements/DatePicker/DatePickerTwo";
import MultiSelect from "@/components/FormElements/MultiSelect";

const AddInventory = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="ADD INVENTORY ITEMS" />

      <div className="container mx-auto px-6">
        {/* <h1 className="text-2xl font-bold mb-4">Add Inventory Item</h1> */}

        <form className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Item ID */}
          <div className="flex flex-col">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Item ID
            </label>
            <input
              type="text"
              name="itemId"
              placeholder="Enter Item ID"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Category
            </label>
            <MultiSelect
              id="category"
              options={[
                "communicationDevice",
                "computerAndITEquipment",
                "networkingEquipment",
                "surveillanceAndTracking",
                "vehicleAndAccessories",
                "protectiveGear",
                "firearm",
                "forensicEquipment",
                "medicalFirstAid",
                "officeSupply"
              ]}
            />
          </div>

          {/* Type */}
          <div className="flex flex-col">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Type
            </label>
            <input
              type="text"
              name="type"
              placeholder="Enter Type"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col md:col-span-2 lg:col-span-3">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter Description"
              rows={4}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            ></textarea>
          </div>

          {/* Quantity */}
          <div className="flex flex-col">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              min="1"
              placeholder="Enter Quantity"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter Location"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Condition */}
          <div className="flex flex-col">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Condition
            </label>
            <input
              type="text"
              name="condition"
              placeholder="Enter Condition"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Acquisition Date */}
          <div className="flex flex-col">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Acquisition Date
            </label>
            <DatePickerOne />
          </div>

          {/* Expiry Date */}
          <div className="flex flex-col">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Expiry Date
            </label>
            <DatePickerTwo />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter Price"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Supplier */}
          <div className="flex flex-col">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Supplier
            </label>
            <input
              type="text"
              name="supplier"
              placeholder="Enter Supplier"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Assigned To */}
          <div className="flex flex-col">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Assigned To
            </label>
            <input
              type="text"
              name="assignedTo"
              placeholder="Enter Assignee"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Return Date */}
          <div className="flex flex-col">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Return Date
            </label>
            <input
              type="date"
              name="returnDate"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Last Inspection Date */}
          <div className="flex flex-col">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Last Inspection Date
            </label>
            <input
              type="date"
              name="lastInspectionDate"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Maintenance Schedule */}
          <div className="flex flex-col">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Maintenance Schedule
            </label>
            <input
              type="text"
              name="maintenanceSchedule"
              placeholder="Enter Maintenance Schedule"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Maintenance Charge */}
          <div className="flex flex-col">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Maintenance Charge
            </label>
            <input
              type="number"
              name="maintenanceCharge"
              placeholder="Enter Maintenance Charge"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Issued To */}
          <div className="flex flex-col">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Issued To
            </label>
            <input
              type="text"
              name="issuedTo"
              placeholder="Enter Issued To"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              User ID
            </label>
            <input
              type="text"
              name="userId"
              placeholder="Enter User Id"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AddInventory;
