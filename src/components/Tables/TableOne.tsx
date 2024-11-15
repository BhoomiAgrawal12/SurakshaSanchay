'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the type for the schema
interface Item {
  id: string;
  itemId: string;
  category: string;
  type: string;
  description?: string;
  quantity: number;
  location?: string;
  condition: string;
  acquisitionDate?: string;
  expiryDate?: string;
  price?: number;
  supplier?: string;
  assignedTo?: string;
  returnDate?: string;
  lastInspectionDate?: string;
  maintenanceSchedule?: string;
  maintenanceCharge?: number;
  issuedTo?: string;
  userId?: string;
  user?: string | null;
}

const TableOne: React.FC = () => {
  const [brandData, setBrandData] = useState<Item[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null); // Track which row is being edited
  const [formData, setFormData] = useState<Item | null>(null); // Track form inputs for editing

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mocked API data for development
        const data: Item[] = [
          {
            id: "1",
            itemId: "item001",
            category: "Electronics",
            type: "Laptop",
            description: "High-performance laptop",
            quantity: 10,
            location: "Warehouse A",
            condition: "new",
            acquisitionDate: "2023-01-01",
            expiryDate: "2025-01-01",
            price: 1500.0,
            supplier: "Tech Supplier Co.",
            assignedTo: "John Doe",
            returnDate: "2024-12-01",
            lastInspectionDate: "2023-11-01",
            maintenanceSchedule: "Monthly",
            maintenanceCharge: 200.0,
            issuedTo: "Jane Smith",
            userId: "user001",
            user: null,
          },
          {
            id: "2",
            itemId: "item002",
            category: "Furniture",
            type: "Chair",
            description: "Ergonomic office chair",
            quantity: 25,
            location: "Warehouse B",
            condition: "new",
            acquisitionDate: "2022-05-15",
            expiryDate: "2026-05-15",
            price: 300.0,
            supplier: "Office Supplies Inc.",
            assignedTo: "Sarah Brown",
            returnDate: "2024-11-30",
            lastInspectionDate: "2023-10-01",
            maintenanceSchedule: "Quarterly",
            maintenanceCharge: 50.0,
            issuedTo: "Mark Johnson",
            userId: "user002",
            user: null,
          },
        ];

        setBrandData(data); // Replace with API response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle editing a row
  const handleEdit = (index: number) => {
    setIsEditing(index);
    setFormData({ ...brandData[index] });
  };

  // Handle changes in form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof Item) => {
    if (formData) {
      setFormData({ ...formData, [key]: e.target.value });
    }
  };

  // Save the edited row
  const handleSave = async () => {
    if (!formData) return;
    try {
      // Replace with your backend PUT endpoint
      await axios.put(`/api/items/${formData.id}`, formData);
      const updatedData = [...brandData];
      updatedData[isEditing!] = formData;
      setBrandData(updatedData);
      setIsEditing(null);
      setFormData(null);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Delete a row
  const handleDelete = async (id: string) => {
    try {
      // Replace with your backend DELETE endpoint
      await axios.delete(`/api/items/${id}`);
      setBrandData(brandData.filter((brand) => brand.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Inventory Table
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Type</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Category</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Quantity</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Location</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Price</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Actions</h5>
          </div>
        </div>

        {brandData.map((brand, index) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-6 ${index === brandData.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"}`}
            key={brand.id}
          >
            {isEditing === index ? (
              <>
                <div className="p-2.5 xl:p-5">
                  <input
                    type="text"
                    value={formData?.type || ""}
                    onChange={(e) => handleInputChange(e, 'type')}
                    className="w-full p-1"
                  />
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <input
                    type="text"
                    value={formData?.category || ""}
                    onChange={(e) => handleInputChange(e, 'category')}
                    className="w-full p-1"
                  />
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <input
                    type="number"
                    value={formData?.quantity || 0}
                    onChange={(e) => handleInputChange(e, 'quantity')}
                    className="w-full p-1"
                  />
                </div>
                <div className="p-2.5 text-center xl:p-5">
                  <button className="text-green-500" onClick={handleSave}>
                    Save
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => {
                      setIsEditing(null);
                      setFormData(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="p-2.5 xl:p-5">{brand.type}</div>
                <div className="p-2.5 text-center xl:p-5">{brand.category}</div>
                <div className="p-2.5 text-center xl:p-5">{brand.quantity}</div>
                <div className="hidden p-2.5 text-center sm:block xl:p-5">{brand.location}</div>
                <div className="hidden p-2.5 text-center sm:block xl:p-5">${brand.price}</div>
                <div className="p-2.5 text-center xl:p-5">
                  <button
                    className="text-blue-500"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(brand.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
