"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const categoryDrop = [
  { name: "COMMUNICATION_DEVICES" },
  { name: "COMPUTER_AND_IT_EQUIPMENT" },
  { name: "NETWORKING_EQUIPMENT" },
  { name: "SURVEILLANCE_AND_TRACKING" },
  { name: "VEHICLE_AND_ACCESSORIES" },
  { name: "PROTECTIVE_GEAR" },
  { name: "FIREARMS" },
  { name: "FORENSIC" },
  { name: "MEDICAL_FIRST_AID" },
  { name: "OFFICE_SUPPLIES" },
];
const avail = [{ name: "AVAILABLE" }, { name: "UNAVAILABLE" }];

interface Package {
  itemId: string;
  category: string;
  type: string;
  description?: string;
  quantity: number;
  location?: string;
  condition: string;
  temporaryLocation: string;
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

const defaultData: Package[] = [];

const ViewInventory = () => {
  const [toggle, setToggle] = useState(false);
  const [packageData, setPackageData] = useState<Package[]>(defaultData);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<number | null>(null); // Track the row being edited by index
  const [editedRow, setEditedRow] = useState<Partial<Package>>({}); // Store data being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [rowToDelete, setRowToDelete] = useState<number | null>(null); // Track the row to delete

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/inventory", {
          method: "GET",
        });
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
  const handleSaveClick = async (index: number): Promise<void> => {
    const updatedData = [...packageData];
    updatedData[index] = editedRow as Package;
    setPackageData(updatedData);
    setEditMode(null);

    try {
      const response = await fetch("/api/inventory", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: packageData[index].itemId, // Send the id of the item to be updated
          fieldsToUpdate: editedRow, // Send the edited details
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update inventory");
      }

      const updatedInventory = await response.json();
      toast.success("Inventory updated", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error saving edited data:", error);
      toast.error("Error saving edited data", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Delete a row from the table
  const handleDeleteClick = (index: number): void => {
    setRowToDelete(index);
    setIsModalOpen(true);
  };
  // Confirm the deletion and delete from the backend
  const handleConfirmDelete = async (): Promise<void> => {
    if (rowToDelete !== null) {
      const itemId = packageData[rowToDelete].itemId; // Get the item id to delete

      // Delete the item from the database via the API
      try {
        const response = await fetch("/api/inventory", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId: itemId }), // Send the id of the item to delete
        });

        if (!response.ok) {
          throw new Error("Failed to delete inventory");
        }

        const deletedInventory = await response.json();
        console.log("Deleted inventory item:", deletedInventory);
        toast.success("Deleted inventory item", {
          position: "top-right",
          autoClose: 3000,
        });
        // Update the frontend after deletion
        const updatedData = packageData.filter((_, i) => i !== rowToDelete);
        setPackageData(updatedData);
      } catch (error) {
        console.error("Error deleting inventory:", error);
        toast.error("Error deleting inventory", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }

    setIsModalOpen(false); // Close the modal after deletion
  };

  const handleCancelDelete = (): void => {
    setIsModalOpen(false);
  };

  // Handle input changes during editing
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Package,
  ): void => {
    const { value } = e.target;
    setEditedRow((prev) => ({
      ...prev,
      [field]: isNaN(Number(value)) ? value : Number(value),
    }));
  };
  const form = useForm({
    defaultValues: {
      category: "",
      status: "",
    },
  });
  const handleClear = () => {
    form.reset({
      category: "",
      status: "",
    });

    setToggle(!toggle);
  };

  const onSubmit = async (values: any) => {
    // console.log("Form submitted:", values);

    try {
      const response = await fetch("/api/inventoryFilter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setPackageData(updatedData);
        toast.success("Data successfully updated", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        console.error("Error updating data:", response.statusText);
        toast.error("Error updating data", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error updating data", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="VIEW INVENTORY ITEMS" />
      <div className="rounded-sm border border-stroke bg-white px-5  pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h1 className="text-2xl text-white">Filter</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-10 md:flex-row">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-2xl"></FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        // disabled={isPending}
                        value={field.value}
                      >
                        <SelectTrigger
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "200px",
                            padding: "0.5rem 1rem",
                            border: "1px solid #ccc",
                            borderRadius: "0.375rem",
                            background: "#fff",
                            color: "#333",
                            cursor: "pointer",
                          }}
                        >
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent
                          style={{
                            position: "absolute",
                            marginTop: "0.25rem",
                            width: "250px",
                            backgroundColor: "#fff",
                            borderRadius: "0.375rem",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            maxHeight: "15rem",
                            overflowY: "auto",
                            zIndex: 50,
                          }}
                        >
                          {categoryDrop.map((station) => (
                            <SelectItem
                              key={station.name}
                              value={station.name}
                              style={{
                                padding: "0.5rem 1rem",
                                cursor: "pointer",
                                color: "#333",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "#f0f0f0")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "#fff")
                              }
                            >
                              {station.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-2xl"></FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        // disabled={isPending}
                        value={field.value}
                      >
                        <SelectTrigger
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "200px",
                            padding: "0.5rem 1rem",
                            border: "1px solid #ccc",
                            borderRadius: "0.375rem",
                            background: "#fff",
                            color: "#333",
                            cursor: "pointer",
                          }}
                        >
                          <SelectValue placeholder="Select a Status" />
                        </SelectTrigger>
                        <SelectContent
                          style={{
                            position: "absolute",
                            marginTop: "0.25rem",
                            width: "200px",
                            backgroundColor: "#fff",
                            borderRadius: "0.375rem",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            maxHeight: "15rem",
                            overflowY: "auto",
                            zIndex: 50,
                          }}
                        >
                          {avail.map((station) => (
                            <SelectItem
                              key={station.name}
                              value={station.name}
                              style={{
                                padding: "0.5rem 1rem",
                                cursor: "pointer",
                                color: "#333",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "#f0f0f0")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "#fff")
                              }
                            >
                              {station.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" flex gap-10">
              <button
                type="submit"
                className="rounded-md p-2 text-xl text-green-800 dark:bg-meta-4"
              >
                Search
              </button>
              <button
                className="rounded-md p-2 text-xl text-red-800 dark:bg-meta-4"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </form>
        </Form>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    Item Id
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Category
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Type
                  </th>
                  {/* <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Issued To</th> */}
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Quantity
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Location
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    CurrentLocation
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Condition
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Acquisition Date
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Expiry Date
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Price
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Supplier
                  </th>
                  {/* <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Assigned to</th> */}
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Return Date
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Last Inspection Date
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Maintenance Schedule
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Maintenance Charge
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Issued To
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    User Id
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
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
                          name="temporaryLocation:"
                          value={editedRow.temporaryLocation || ""}
                          onChange={(e) =>
                            handleInputChange(e, "temporaryLocation")
                          }
                          className="border p-1"
                        />
                      ) : item.temporaryLocation ? (
                        item.temporaryLocation
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
                          name="condition"
                          value={editedRow.status || ""}
                          onChange={(e) => handleInputChange(e, "condition")}
                          className="border p-1"
                        />
                      ) : (
                        item.status
                      )}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editMode === index ? (
                        <input
                          type="text"
                          name="acquisitionDate"
                          value={editedRow.acquisitionDate || ""}
                          onChange={(e) =>
                            handleInputChange(e, "acquisitionDate")
                          }
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
                    {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
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
                  </td> */}
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
                          onChange={(e) =>
                            handleInputChange(e, "lastInspectionDate")
                          }
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
                          onChange={(e) =>
                            handleInputChange(e, "maintenanceSchedule")
                          }
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
                          onChange={(e) =>
                            handleInputChange(e, "maintenanceCharge")
                          }
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
                          value={editedRow.issuedTo || ""}
                          onChange={(e) => handleInputChange(e, "issuedTo")}
                          className="border p-1"
                        />
                      ) : (
                        item.issuedTo
                      )}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editMode === index ? (
                        <input
                          type="text"
                          name="userId"
                          value={editedRow.userId || ""}
                          onChange={(e) => handleInputChange(e, "userId")}
                          className="border p-1"
                        />
                      ) : (
                        item.userId
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
                              className="text-xl font-bold text-green-600 hover:text-green-800"
                            >
                              &#10004; {/* Checkmark icon */}
                            </button>
                            &nbsp;&nbsp;
                            <button
                              onClick={() => setEditMode(null)}
                              className="text-xl font-bold text-gray-600 hover:text-gray-800"
                            >
                              &#10006; {/* Cross (X) icon */}
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditClick(index)}
                              className="inline-block rotate-[-270deg] transform text-xl font-bold text-blue-600 hover:text-blue-800"
                            >
                              &#9998;
                            </button>
                            &nbsp;&nbsp;
                            <button
                              onClick={() => handleDeleteClick(index)}
                              className="text-xl font-bold text-red-600 hover:text-red-800"
                            >
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
          <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="rounded bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl">
                Are you sure you want to delete this row?
              </h3>
              <button
                onClick={handleConfirmDelete}
                className="rounded bg-red-500 p-2 text-white"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="ml-2 rounded bg-gray-500 p-2 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewInventory;
