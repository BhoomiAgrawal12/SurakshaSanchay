"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { toast } from "react-toastify";


interface itemData {
  itemId: string;
  category: string;
  categoryDetails: Record<string, any>;
  type: string;
  description: string;
  quantity: number;
  location: string;
  condition: string;
  acquisitionDate: string;
  expiryDate: string;
  price: string;
  supplier: string;
  returnDate: string;
  lastInspectionDate: string;
  maintenanceSchedule: string;
  maintenanceCharge: string;
  issuedTo: string;
  userId: string;
}

const Modal = ({
  show,
  onClose,
  children,
}: {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50 p-6">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-lg bg-white p-8 shadow-lg">
        <button
          className="absolute bottom-10 left-15 rounded bg-green-900 p-1 text-white hover:text-gray-900"
          onClick={onClose}
        >
          Submit
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};
const AddInventory = () => {
  // State for Inventory Form
  const [itemData, setItemData] = useState<itemData>({
    itemId: "",
    category: "",
    categoryDetails: [],
    type: "",
    description: "",
    quantity: 0,
    location: "",
    condition: "",
    acquisitionDate: "",
    expiryDate: "",
    price: "",
    supplier: "",
    returnDate: "",
    lastInspectionDate: "",
    maintenanceSchedule: "",
    maintenanceCharge: "",
    issuedTo: "",
    userId: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [categoryType, setCategoryType] = useState<string>(""); // To hold the currently selected category type

  const handleInventoryChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setItemData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleCategoryChange = (selectedCategory: string) => {
    setItemData((prev) => ({
      ...prev,
      category: selectedCategory, // Update the category in the state
    }));
    setCategoryType(selectedCategory); // Set the category type for the form rendering logic
    setShowModal(true); // Open the modal
  };
  const handleCategoryFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setItemData((prev) => ({
      ...prev,
      categoryDetails: {
        ...prev.categoryDetails,
        [categoryType]: prev.categoryDetails[categoryType] || {}, // Ensure the category details are stored in state
      },
    }));
    setShowModal(false); // Close the modal after submission
  };
  const handleInventorySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(itemData);
    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemData }), // Send the entire `itemData` object
      });

      if (response.ok) {
        toast.success("Inventory added successfully", {
          position: "top-right",
          autoClose: 3000,
        });

        // Reset the form after successful submission
        setItemData({
          itemId: "",
          category: "",
          categoryDetails: {}, // Clear category details
          type: "",
          description: "",
          quantity: 1,
          location: "",
          condition: "",
          acquisitionDate: "",
          expiryDate: "",
          price: "",
          supplier: "",
          returnDate: "",
          lastInspectionDate: "",
          maintenanceSchedule: "",
          maintenanceCharge: "",
          issuedTo: "",
          userId: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting inventory form:", error);
      toast.error("Failed to submit the inventory.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  const renderCategoryForm = () => {
    switch (categoryType) {
      case "communicationDevice":
        return (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Communication Device Form
              </h3>
            </div>
            <form onSubmit={handleCategoryFormSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Frequency Range
                  </label>
                  <input
                    type="text"
                    placeholder="Enter frequency range"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.communicationDevice
                        ?.frequencyRange || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.communicationDevice = {
                        ...updatedDetails.communicationDevice,
                        frequencyRange: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Battery Type
                  </label>
                  <input
                    type="text"
                    placeholder="Enter battery type"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.communicationDevice
                        ?.batteryType || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.communicationDevice = {
                        ...updatedDetails.communicationDevice,
                        batteryType: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Connectivity
                  </label>
                  <input
                    type="text"
                    placeholder="Enter connectivity"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.communicationDevice
                        ?.connectivity || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.communicationDevice = {
                        ...updatedDetails.communicationDevice,
                        connectivity: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                {/* <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Submit
                </button> */}
              </div>
            </form>
          </div>
        );
      case "computerAndITEquipment":
        return (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Computer and IT Equipment Form
              </h3>
            </div>
            <form onSubmit={handleCategoryFormSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Processor
                  </label>
                  <input
                    type="text"
                    placeholder="Enter processor details"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.computerAndITEquipment
                        ?.processor || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.computerAndITEquipment = {
                        ...updatedDetails.computerAndITEquipment,
                        processor: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    RAM
                  </label>
                  <input
                    type="text"
                    placeholder="Enter RAM details"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.computerAndITEquipment?.RAM || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.computerAndITEquipment = {
                        ...updatedDetails.computerAndITEquipment,
                        RAM: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Storage
                  </label>
                  <input
                    type="text"
                    placeholder="Enter storage details"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.computerAndITEquipment
                        ?.storage || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.computerAndITEquipment = {
                        ...updatedDetails.computerAndITEquipment,
                        storage: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Operating System
                  </label>
                  <input
                    type="text"
                    placeholder="Enter operating system details"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.computerAndITEquipment?.OS || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.computerAndITEquipment = {
                        ...updatedDetails.computerAndITEquipment,
                        OS: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                {/* <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Submit
                </button> */}
              </div>
            </form>
          </div>
        );
      case "networkingEquipment":
        return (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Networking Equipment Form
              </h3>
            </div>
            <form onSubmit={handleCategoryFormSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Bandwidth
                  </label>
                  <input
                    type="text"
                    placeholder="Enter bandwidth"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.networkingEquipment?.bandwidth ||
                      ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.networkingEquipment = {
                        ...updatedDetails.networkingEquipment,
                        bandwidth: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Ports
                  </label>
                  <input
                    type="text"
                    placeholder="Enter ports"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.networkingEquipment?.ports || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.networkingEquipment = {
                        ...updatedDetails.networkingEquipment,
                        ports: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Protocols
                  </label>
                  <input
                    type="text"
                    placeholder="Enter protocols"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.networkingEquipment?.protocols ||
                      ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.networkingEquipment = {
                        ...updatedDetails.networkingEquipment,
                        protocols: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                {/* <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Submit
                </button> */}
              </div>
            </form>
          </div>
        );
      case "surveillanceAndTracking":
        return (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Surveillance and Tracking Form
              </h3>
            </div>
            <form onSubmit={handleCategoryFormSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Camera Resolution
                  </label>
                  <input
                    type="text"
                    placeholder="Enter camera resolution"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.surveillanceAndTracking
                        ?.cameraResolution || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.surveillanceAndTracking = {
                        ...updatedDetails.surveillanceAndTracking,
                        cameraResolution: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Night Vision
                  </label>
                  <input
                    type="checkbox"
                    checked={
                      itemData.categoryDetails.surveillanceAndTracking
                        ?.nightVision || false
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.surveillanceAndTracking = {
                        ...updatedDetails.surveillanceAndTracking,
                        nightVision: e.target.checked,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    GPS Accuracy
                  </label>
                  <input
                    type="text"
                    placeholder="Enter GPS accuracy"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.surveillanceAndTracking
                        ?.GPSAccuracy || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.surveillanceAndTracking = {
                        ...updatedDetails.surveillanceAndTracking,
                        GPSAccuracy: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                {/* <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Submit
                </button> */}
              </div>
            </form>
          </div>
        );
      case "vehicleAndAccessories":
        return (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Vehicle and Accessories Form
              </h3>
            </div>
            <form onSubmit={handleCategoryFormSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Vehicle Type
                  </label>
                  <input
                    type="text"
                    placeholder="Enter vehicle type"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.vehicleAndAccessories
                        ?.vehicleType || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.vehicleAndAccessories = {
                        ...updatedDetails.vehicleAndAccessories,
                        vehicleType: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Make and Model
                  </label>
                  <input
                    type="text"
                    placeholder="Enter make and model"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.vehicleAndAccessories
                        ?.makeAndModel || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.vehicleAndAccessories = {
                        ...updatedDetails.vehicleAndAccessories,
                        makeAndModel: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    License Plate
                  </label>
                  <input
                    type="text"
                    placeholder="Enter license plate"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.vehicleAndAccessories
                        ?.licensePlate || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.vehicleAndAccessories = {
                        ...updatedDetails.vehicleAndAccessories,
                        licensePlate: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Engine Capacity
                  </label>
                  <input
                    type="text"
                    placeholder="Enter engine capacity"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.vehicleAndAccessories
                        ?.engineCapacity || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.vehicleAndAccessories = {
                        ...updatedDetails.vehicleAndAccessories,
                        engineCapacity: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Accessories
                  </label>
                  <input
                    type="text"
                    placeholder="Enter accessories"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.vehicleAndAccessories
                        ?.accessories || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.vehicleAndAccessories = {
                        ...updatedDetails.vehicleAndAccessories,
                        accessories: e.target.value.split(","),
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                {/* <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Submit
                </button> */}
              </div>
            </form>
          </div>
        );
      case "protectiveGear":
        return (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Protective Gear Form
              </h3>
            </div>
            <form onSubmit={handleCategoryFormSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Gear Type
                  </label>
                  <input
                    type="text"
                    placeholder="Enter gear type"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.protectiveGear?.gearType || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.protectiveGear = {
                        ...updatedDetails.protectiveGear,
                        gearType: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Size
                  </label>
                  <input
                    type="text"
                    placeholder="Enter size"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={itemData.categoryDetails.protectiveGear?.size || ""}
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.protectiveGear = {
                        ...updatedDetails.protectiveGear,
                        size: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Material
                  </label>
                  <input
                    type="text"
                    placeholder="Enter material"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.protectiveGear?.material || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.protectiveGear = {
                        ...updatedDetails.protectiveGear,
                        material: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                {/* <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Submit
                </button> */}
              </div>
            </form>
          </div>
        );
      case "firearm":
        return (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Firearm Form
              </h3>
            </div>
            <form onSubmit={handleCategoryFormSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Caliber
                  </label>
                  <input
                    type="text"
                    placeholder="Enter caliber"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={itemData.categoryDetails.firearm?.caliber || ""}
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.firearm = {
                        ...updatedDetails.firearm,
                        caliber: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Ammo Type
                  </label>
                  <input
                    type="text"
                    placeholder="Enter ammo type"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={itemData.categoryDetails.firearm?.ammoType || ""}
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.firearm = {
                        ...updatedDetails.firearm,
                        ammoType: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Serial Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter serial number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={itemData.categoryDetails.firearm?.serialNumber || ""}
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.firearm = {
                        ...updatedDetails.firearm,
                        serialNumber: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    License Details
                  </label>
                  <input
                    type="text"
                    placeholder="Enter license details"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.firearm?.licenseDetails || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.firearm = {
                        ...updatedDetails.firearm,
                        licenseDetails: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                {/* <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Submit
                </button> */}
              </div>
            </form>
          </div>
        );
      case "forensicEquipment":
        return (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Forensic Equipment Form
              </h3>
            </div>
            <form onSubmit={handleCategoryFormSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Usage Type
                  </label>
                  <input
                    type="text"
                    placeholder="Enter usage type"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.forensicEquipment?.usageType ||
                      ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.forensicEquipment = {
                        ...updatedDetails.forensicEquipment,
                        usageType: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Sensitivity
                  </label>
                  <input
                    type="text"
                    placeholder="Enter sensitivity"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.forensicEquipment?.sensitivity ||
                      ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.forensicEquipment = {
                        ...updatedDetails.forensicEquipment,
                        sensitivity: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Storage Requirements
                  </label>
                  <input
                    type="text"
                    placeholder="Enter storage requirements"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.forensicEquipment
                        ?.storageRequirements || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.forensicEquipment = {
                        ...updatedDetails.forensicEquipment,
                        storageRequirements: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                {/* <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Submit
                </button> */}
              </div>
            </form>
          </div>
        );
      case "medicalFirstAid":
        return (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Medical First Aid Form
              </h3>
            </div>
            <form onSubmit={handleCategoryFormSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    placeholder="Enter expiration date"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.medicalFirstAid
                        ?.expirationDate || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.medicalFirstAid = {
                        ...updatedDetails.medicalFirstAid,
                        expirationDate: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Dosage
                  </label>
                  <input
                    type="text"
                    placeholder="Enter dosage"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.medicalFirstAid?.dosage || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.medicalFirstAid = {
                        ...updatedDetails.medicalFirstAid,
                        dosage: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Storage Conditions
                  </label>
                  <input
                    type="text"
                    placeholder="Enter storage conditions"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.medicalFirstAid
                        ?.storageConditions || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.medicalFirstAid = {
                        ...updatedDetails.medicalFirstAid,
                        storageConditions: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                {/* <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Submit
                </button> */}
              </div>
            </form>
          </div>
        );
      case "officeSupply":
        return (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Office Supply Form
              </h3>
            </div>
            <form onSubmit={handleCategoryFormSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Item Type
                  </label>
                  <input
                    type="text"
                    placeholder="Enter item type"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.officeSupply?.itemType || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.officeSupply = {
                        ...updatedDetails.officeSupply,
                        itemType: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    placeholder="Enter dimensions"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.officeSupply?.dimensions || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.officeSupply = {
                        ...updatedDetails.officeSupply,
                        dimensions: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Material
                  </label>
                  <input
                    type="text"
                    placeholder="Enter material"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={
                      itemData.categoryDetails.officeSupply?.material || ""
                    }
                    onChange={(e) => {
                      const updatedDetails = { ...itemData.categoryDetails };
                      updatedDetails.officeSupply = {
                        ...updatedDetails.officeSupply,
                        material: e.target.value,
                      };
                      setItemData({
                        ...itemData,
                        categoryDetails: updatedDetails,
                      });
                    }}
                  />
                </div>

                {/* <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Submit
                </button> */}
              </div>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="ADD INVENTORY FORM" />

      {/* Full-Width Inventory Form */}
      <div className="flex flex-col gap-9 overflow-x-hidden ">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleInventorySubmit}>
            <div className="md:grid md:grid-cols-1 flex flex-col gap-6 p-6.5 sm:grid-cols-3">
              {/* Item ID */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Item ID <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="itemId"
                  placeholder="Enter Item ID"
                  value={itemData.itemId}
                  onChange={handleInventoryChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Category */}
              {/* <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Category <span className="text-meta-1">*</span>
                </label>
                <select
  name="category"
  value={itemData.category}
  onChange={handleCategoryChange}
  required
  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
>
  <option value="">Select Category</option>
  <option value="communicationDevice">Communication Device</option>
  <option value="COMPUTER_AND_IT_EQUIPMENT">Computer and IT Equipment</option>
  <option value="networkingEquipment">Networking Equipment</option>
  <option value="surveillanceAndTracking">Surveillance and Tracking</option>
  <option value="vehicleAndAccessories">Vehicle and Accessories</option>
  <option value="protectiveGear">Protective Gear</option>
  <option value="firearm">Firearm</option>
  <option value="forensicEquipment">Forensic Equipment</option>
  <option value="medicalFirstAid">Medical First Aid</option>
  <option value="officeSupply">Office Supply</option>
</select>
              </div> */}
              {/* <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Category <span className="text-meta-1">*</span>
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
                  "officeSupply",
                ]}
                selectedOptions={itemData.category}
                onChange={handleCategoryChange}
              />
            </div>

           
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              {renderCategoryForm()}
            </Modal> */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Category <span className="text-meta-1">*</span>
                </label>
                {/* Single Select Dropdown for Category */}
                <select
                  id="category"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={itemData.category || ""} // Default value to handle state
                  onChange={(e) => handleCategoryChange(e.target.value)} // Get selected value
                >
                  <option value="">Select a category</option>{" "}
                  {/* Placeholder */}
                  <option value="communicationDevice">
                    Communication Device
                  </option>
                  <option value="computerAndITEquipment">
                    Computer and IT Equipment
                  </option>
                  <option value="networkingEquipment">
                    Networking Equipment
                  </option>
                  <option value="surveillanceAndTracking">
                    Surveillance and Tracking
                  </option>
                  <option value="vehicleAndAccessories">
                    Vehicle and Accessories
                  </option>
                  <option value="protectiveGear">Protective Gear</option>
                  <option value="firearm">Firearm</option>
                  <option value="forensicEquipment">Forensic Equipment</option>
                  <option value="medicalFirstAid">Medical First Aid</option>
                  <option value="officeSupply">Office Supply</option>
                </select>
              </div>

              {/* Modal for category form */}
              <Modal show={showModal} onClose={() => setShowModal(false)}>
                {renderCategoryForm()}
              </Modal>

              {/* Type */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Type <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="type"
                  placeholder="Enter Type"
                  value={itemData.type}
                  onChange={handleInventoryChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Description <span className="text-meta-1">*</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Enter Description"
                  value={itemData.description}
                  onChange={handleInventoryChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Quantity <span className="text-meta-1">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={itemData.quantity}
                  onChange={handleInventoryChange}
                  required
                  min="1"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Location */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Location <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter Location"
                  value={itemData.location}
                  onChange={handleInventoryChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Condition */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Condition <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="condition"
                  placeholder="Enter Condition"
                  value={itemData.condition}
                  onChange={handleInventoryChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Acquisition Date */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Acquisition Date <span className="text-meta-1">*</span>
                </label>
                <input
                  type="date"
                  name="acquisitionDate"
                  value={itemData.acquisitionDate}
                  onChange={handleInventoryChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>
              {/* Expiry Date */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={itemData.expiryDate}
                  onChange={handleInventoryChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Price */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Price <span className="text-meta-1">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter Price"
                  value={itemData.price}
                  onChange={handleInventoryChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Supplier */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Supplier
                </label>
                <input
                  type="text"
                  name="supplier"
                  placeholder="Enter Supplier"
                  value={itemData.supplier}
                  onChange={handleInventoryChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Return Date */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Return Date
                </label>
                <input
                  type="date"
                  name="returnDate"
                  value={itemData.returnDate}
                  onChange={handleInventoryChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Last Inspection Date */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Last Inspection Date
                </label>
                <input
                  type="date"
                  name="lastInspectionDate"
                  value={itemData.lastInspectionDate}
                  onChange={handleInventoryChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Maintenance Schedule */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Maintenance Schedule
                </label>
                <select
  name="maintenanceSchedule"
  value={itemData.maintenanceSchedule}
  onChange={handleInventoryChange}
  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
>
  <option value="" disabled>Select Maintenance Schedule</option>
  <option value="monthly">Monthly</option>
  <option value="half-yearly">Half Yearly</option>
  <option value="yearly">Yearly</option>
</select>

              </div>

              {/* Maintenance Charge */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Maintenance Charge
                </label>
                <input
                  type="number"
                  name="maintenanceCharge"
                  placeholder="Enter Maintenance Charge"
                  value={itemData.maintenanceCharge}
                  onChange={handleInventoryChange}
                  min="0"
                  step="0.01"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Issued To */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Issued To
                </label>
                <input
                  type="text"
                  name="issuedTo"
                  placeholder="Enter Name of Person or Unit"
                  value={itemData.issuedTo}
                  onChange={handleInventoryChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* User ID */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Gov ID
                </label>
                <input
                  type="text"
                  name="userId"
                  placeholder="Enter User ID"
                  value={itemData.userId}
                  onChange={handleInventoryChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>
            </div>

            <div className="col-span-full flex justify-end">
              <button
                type="submit"
                className="w-half mb-4 mr-4 rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
              >
                Add Inventory Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddInventory;
