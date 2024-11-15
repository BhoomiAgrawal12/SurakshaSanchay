
'use client';
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

interface Package {
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
  status?: string;
}

const defaultData: Package[] = [
  {
    itemId: "Default",
    category: "Default",
    type: "Default",
    issuedTo: "Default",
    quantity: 0,
    location: "Default",
    condition: "Default",
    acquisitionDate: "Default",
    expiryDate: "Default",
    price: 0.0,
    supplier: "Default",
    assignedTo: "Default",
    returnDate: "Default",
    lastInspectionDate: "Default",
    maintenanceSchedule: "Default",
    status: "Pending",
    maintenanceCharge: 0,
    userId: "Default",
  },
  {
    itemId: "001",
    category: "Electronics",
    type: "Laptop",
    issuedTo: "John Doe",
    quantity: 5,
    location: "Warehouse A",
    condition: "New",
    acquisitionDate: "2023-01-13",
    expiryDate: "2024-01-13",
    price: 1500.0,
    supplier: "TechCorp",
    assignedTo: "Jane Smith",
    returnDate: "2023-12-01",
    lastInspectionDate: "2023-11-01",
    maintenanceSchedule: "Monthly",
    maintenanceCharge: 5000,
    status: "Paid",
    userId: "John123",
  },
];

const  viewInventory = () => {
  const [packageData, setPackageData] = useState<Package[]>(defaultData);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<number | null>(null); // Track the row being edited by index
  const [editedRow, setEditedRow] = useState<Partial<Package>>({}); // Store data being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [rowToDelete, setRowToDelete] = useState<number | null>(null); // Track the row to delete

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/packageData");
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setPackageData(data);
          } else {
            setPackageData(defaultData);
          }
        } else {
          setPackageData(defaultData); 
        }
      } catch (error) {
        setPackageData(defaultData); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Enter edit mode for a specific row
  const handleEditClick = (index: number): void => {
    setEditMode(index);
    setEditedRow({ ...packageData[index] });
  };

  // Save the edited row data
  const handleSaveClick = (index: number): void => {
    const updatedData = [...packageData];
    updatedData[index] = editedRow as Package;
    setPackageData(updatedData);
    setEditMode(null);
  };

  // Delete a row from the table
  const handleDeleteClick = (index: number): void => {
    setRowToDelete(index);
    setIsModalOpen(true); 
  };

  const handleConfirmDelete = (): void => {
    if (rowToDelete !== null) {
      const updatedData = packageData.filter((_, i) => i !== rowToDelete);
      setPackageData(updatedData);
    }
    setIsModalOpen(false); 
  };

  const handleCancelDelete = (): void => {
    setIsModalOpen(false); 
  };

  // Handle input changes during editing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Package): void => {
    const { value } = e.target;
    setEditedRow((prev) => ({
      ...prev,
      [field]: isNaN(Number(value)) ? value : Number(value),
    }));
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="VIEW INVENTORY ITEMS" />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">Item Id</th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Category</th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">Type</th>
                {/* <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Issued To</th> */}
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Quantity</th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Location</th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Condition</th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Acquisition Date</th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Expiry Date</th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Price</th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Supplier</th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Assigned to</th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Return Date</th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Last Inspection Date</th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Maintenance Schedule</th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Maintenance Charge</th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Issued To</th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">User Id</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packageData.map((item, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {editMode === index ? (
                      <input
                        type="text"
                        name="itemId"
                        value={editedRow.itemId || ""}
                        onChange={(e) => handleInputChange(e, "itemId")}
                        className="border p-1"
                      />
                    ) : (
                      item.itemId
                    )}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {editMode === index ? (
                      <input
                        type="text"
                        name="category"
                        value={editedRow.category || ""}
                        onChange={(e) => handleInputChange(e, "category")}
                        className="border p-1"
                      />
                    ) : (
                      item.category
                    )}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {editMode === index ? (
                      <input
                        type="text"
                        name="type"
                        value={editedRow.type || ""}
                        onChange={(e) => handleInputChange(e, "type")}
                        className="border p-1"
                      />
                    ) : (
                      item.type
                    )}
                  </td>
                  {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {editMode === index ? (
                      <input
                        type="text"
                        name="issuedTo"
                        value={editedRow.issuedTo || ""}
                        onChange={(e) => handleInputChange(e, "issuedTo")}
                        className="border p-1"
                      />
                    ) : (
                      item.issuedTo
                    )}
                  </td> */}
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {editMode === index ? (
                      <input
                        type="number"
                        name="quantity"
                        value={editedRow.quantity || 0}
                        onChange={(e) => handleInputChange(e, "quantity")}
                        className="border p-1"
                      />
                    ) : (
                      item.quantity
                    )}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {editMode === index ? (
                      <input
                        type="text"
                        name="location"
                        value={editedRow.location || ""}
                        onChange={(e) => handleInputChange(e, "location")}
                        className="border p-1"
                      />
                    ) : (
                      item.location
                    )}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {editMode === index ? (
                      <input
                        type="text"
                        name="condition"
                        value={editedRow.condition || ""}
                        onChange={(e) => handleInputChange(e, "condition")}
                        className="border p-1"
                      />
                    ) : (
                      item.condition
                    )}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {editMode === index ? (
                      <input
                        type="text"
                        name="acquisitionDate"
                        value={editedRow.acquisitionDate || ""}
                        onChange={(e) => handleInputChange(e, "acquisitionDate")}
                        className="border p-1"
                      />
                    ) : (
                      item.acquisitionDate
                    )}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {editMode === index ? (
                      <input
                        type="text"
                        name="expiryDate"
                        value={editedRow.expiryDate || ""}
                        onChange={(e) => handleInputChange(e, "expiryDate")}
                        className="border p-1"
                      />
                    ) : (
                      item.expiryDate
                    )}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {editMode === index ? (
                      <input
                        type="number"
                        name="price"
                        value={editedRow.price || 0}
                        onChange={(e) => handleInputChange(e, "price")}
                        className="border p-1"
                      />
                    ) : (
                      item.price
                    )}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {editMode === index ? (
                      <input
                        type="text"
                        name="supplier"
                        value={editedRow.supplier || ""}
                        onChange={(e) => handleInputChange(e, "supplier")}
                        className="border p-1"
                      />
                    ) : (
                      item.supplier
                    )}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {editMode === index ? (
                      <input
                        type="text"
                        name="assignedTo"
                        value={editedRow.assignedTo || ""}
                        onChange={(e) => handleInputChange(e, "assignedTo")}
                        className="border p-1"
                      />
                    ) : (
                      item.assignedTo
                    )}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {editMode === index ? (
                      <input
                        type="text"
                        name="returnDate"
                        value={editedRow.returnDate || ""}
                        onChange={(e) => handleInputChange(e, "returnDate")}
                        className="border p-1"
                      />
                    ) : (
                      item.returnDate
                    )}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {editMode === index ? (
                      <input
                        type="text"
                        name="lastInspectionDate"
                        value={editedRow.lastInspectionDate || ""}
                        onChange={(e) => handleInputChange(e, "lastInspectionDate")}
                        className="border p-1"
                      />
                    ) : (
                      item.lastInspectionDate
                    )}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {editMode === index ? (
                      <input
                        type="text"
                        name="maintenanceSchedule"
                        value={editedRow.maintenanceSchedule || ""}
                        onChange={(e) => handleInputChange(e, "maintenanceSchedule")}
                        className="border p-1"
                      />
                    ) : (
                      item.maintenanceSchedule
                    )}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {editMode === index ? (
                      <input
                        type="text"
                        name="maintenanceCharge"
                        value={editedRow.maintenanceCharge || ""}
                        onChange={(e) => handleInputChange(e, "maintenanceCharge")}
                        className="border p-1"
                      />
                    ) : (
                      item.maintenanceCharge
                    )}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {editMode === index ? (
                      <input
                        type="text"
                        name="issuedTo"
                        value={editedRow. issuedTo || ""}
                        onChange={(e) => handleInputChange(e, "issuedTo")}
                        className="border p-1"
                      />
                    ) : (
                      item. issuedTo
                    )}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {editMode === index ? (
                      <input
                        type="text"
                        name="userId"
                        value={editedRow. userId || ""}
                        onChange={(e) => handleInputChange(e, "userId")}
                        className="border p-1"
                      />
                    ) : (
                      item. userId
                    )}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex gap-3">
                      {editMode === index ? (
                    
                      <>
                     {/* <button onClick={() => handleSaveClick(index)} className="bg-blue-500 text-white p-2 rounded">Save</button> */}
                     {/* <button onClick={() => setEditMode(null)} className="bg-gray-500 text-white p-2 rounded ml-2">Cancel</button> */}
                        <button                         
                          onClick={() => handleSaveClick(index)} 
                          className="text-green-600 hover:text-green-800 font-bold text-xl">
                          &#10004; {/* Checkmark icon */}
                        </button>&nbsp;&nbsp;

                        <button 
                          onClick={() => setEditMode(null)} 
                          className="text-gray-600 hover:text-gray-800 font-bold text-xl">
                          &#10006; {/* Cross (X) icon */}
                        </button>
                      </>
                    ) : (
                      <>
                      <button
                  onClick={() => handleEditClick(index)}
                  className="text-blue-600 hover:text-blue-800 font-bold text-xl inline-block transform rotate-[-270deg]">
                    &#9998;
                  </button>&nbsp;&nbsp;

                  <button 
                  onClick={() => handleDeleteClick(index)} 
                  className="text-red-600 hover:text-red-800 font-bold text-xl">
                    &#128465;
                  </button>
                        {/* <button onClick={() => handleEditClick(index)} className="bg-green-500 text-white p-2 rounded">Edit</button>
                        <button onClick={() => handleDeleteClick(index)} className="bg-red-500 text-white p-2 rounded ml-2">Delete</button> */}
                      </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl mb-4">Are you sure you want to delete this row?</h3>
            <button onClick={handleConfirmDelete} className="bg-red-500 text-white p-2 rounded">Yes, Delete</button>
            <button onClick={handleCancelDelete} className="bg-gray-500 text-white p-2 rounded ml-2">Cancel</button>
          </div>
        </div>
      )}
      
    </div>
    </DefaultLayout>
  );
};

export default viewInventory;
