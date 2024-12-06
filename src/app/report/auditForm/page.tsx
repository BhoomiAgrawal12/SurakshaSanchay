
"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

// Defining the structure for Policy Data
interface PolicyData {
  findings: string;
  impact: string;
  recommendation: string;
  complianceStatus: string;
  compliancePercentage: string;
}

// Defining the structure for all policies
interface Policies {
  storagePolicy: PolicyData;
  procurementPolicy: PolicyData;
  purchasePolicy: PolicyData;
  usageDeploymentPolicy: PolicyData;
  disposalPolicy: PolicyData;
}

const AuditForm = () => {
  // State for main form data
  const [mainFormData, setMainFormData] = useState({
    auditOfficerName: "",
    auditOfficerId: "",
    location: "",
    startDate: "",
    endDate: "",
  });

  // State for policies
  const [policies, setPolicies] = useState<Policies>({
    storagePolicy: { findings: "", impact: "", recommendation: "", complianceStatus: "", compliancePercentage: "" },
    procurementPolicy: { findings: "", impact: "", recommendation: "", complianceStatus: "", compliancePercentage: "" },
    purchasePolicy: { findings: "", impact: "", recommendation: "", complianceStatus: "", compliancePercentage: "" },
    usageDeploymentPolicy: { findings: "", impact: "", recommendation: "", complianceStatus: "", compliancePercentage: "" },
    disposalPolicy: { findings: "", impact: "", recommendation: "", complianceStatus: "", compliancePercentage: "" },
  });

  // State for stock data
  const [stockData, setStockData] = useState({
    stockAccuracy: "",
    valuationAccuracy: "",
    compliancePercentage: "",
  });

  // Handle changes in policy data
  const handlePolicyChange = (policyName: keyof Policies, field: keyof PolicyData, value: string) => {
    setPolicies((prev) => ({
      ...prev,
      [policyName]: {
        ...prev[policyName],
        [field]: value,
      },
    }));
  };

  // Handle changes in stock data
  const handleStockChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStockData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmitAll = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      auditDetails: mainFormData,
      policies,
      stockValuationAccuracy: stockData,
    };

    alert(`Submitting all forms: ${JSON.stringify(formData)}`);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Audit Form" />
      <form onSubmit={handleSubmitAll} className="p-6 bg-white dark:bg-boxdark shadow-md rounded-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Main Audit Details */}
          <div className="rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark p-6">
            <h3 className="text-lg font-medium mb-4 text-black dark:text-white">Audit Details</h3>
            <div className="mb-4">
              <label className="block mb-2  text-sm text-black dark:text-white">Audit Officer Name</label>
              <input
                type="text"
                name="auditOfficerName"
                value={mainFormData.auditOfficerName}
                placeholder="Enter the Audit Officer's Name"
                onChange={(e) => setMainFormData({ ...mainFormData, auditOfficerName: e.target.value })}
                className="w-full px-4 py-2 border rounded dark:border-strokedark dark:bg-boxdark dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm text-black dark:text-white">Audit Officer ID</label>
              <input
                type="text"
                name="auditOfficerId"
                value={mainFormData.auditOfficerId}
                placeholder="Enter the Audit Officer's ID"
                onChange={(e) => setMainFormData({ ...mainFormData, auditOfficerId: e.target.value })}
                className="w-full px-4 py-2 border rounded dark:border-strokedark dark:bg-boxdark dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm text-black dark:text-white">Location</label>
              <input
                type="text"
                name="location"
                value={mainFormData.location}
                placeholder="Enter the Audit Location"
                onChange={(e) => setMainFormData({ ...mainFormData, location: e.target.value })}
                className="w-full px-4 py-2 border rounded dark:border-strokedark dark:bg-boxdark dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm text-black dark:text-white">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={mainFormData.startDate}
                placeholder="Select the Start Date"
                onChange={(e) => setMainFormData({ ...mainFormData, startDate: e.target.value })}
                className="w-full px-4 py-2 border rounded dark:border-strokedark dark:bg-boxdark dark:text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm text-black dark:text-white">End Date</label>
              <input
                type="date"
                name="endDate"
                value={mainFormData.endDate}
                placeholder="Select the End Date"
                onChange={(e) => setMainFormData({ ...mainFormData, endDate: e.target.value })}
                className="w-full px-4 py-2 border rounded dark:border-strokedark dark:bg-boxdark dark:text-white"
                required
              />
            </div>
          </div>

          {/* Policy Sections */}
          {Object.entries(policies).map(([policyName, policyFields]) => (
            <div
              key={policyName}
              className="rounded-md border border-stroke bg-white text-black dark:text-white dark:border-strokedark dark:bg-boxdark p-6"
            >
              <h3 className="text-lg font-medium mb-4">
                {policyName.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}
              </h3>
              {Object.entries(policyFields).map(([field, value]) => (
                <div key={field} className="mb-4">
                  <label className="block mb-2 text-sm text-black dark:text-white">
                    {field.replace(/([A-Z])/g, " $1").replace(/^\w/, (c) => c.toUpperCase())}
                  </label>
                  <input
                    type={field === "compliancePercentage" ? "number" : "text"}
                    value={value as number|string}
                    placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                    onChange={(e) => handlePolicyChange(policyName as keyof Policies, field as keyof PolicyData, e.target.value)}
                    className="w-full px-4 py-2 border rounded dark:border-strokedark dark:bg-boxdark dark:text-white"
                  />
                </div>
              ))}
            </div>
          ))}

          {/* Stock Valuation Accuracy */}
          <div className="rounded-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark p-6">
            <h3 className="text-lg font-medium mb-4 text-black dark:text-white">Stock Valuation Accuracy</h3>
            {Object.entries(stockData).map(([field, value]) => (
              <div key={field} className="mb-4">
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  {field.replace(/([A-Z])/g, " $1").replace(/^\w/, (c) => c.toUpperCase())}
                </label>
                <input
                  type="number"
                  name={field}
                  value={value}
                  placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                  onChange={handleStockChange}
                  className="w-full px-4 py-2 border rounded dark:border-strokedark dark:bg-boxdark dark:text-white"
                  required
                />
              </div>
            ))}
          </div>
        </div>
        {/* Single Submit Button */}
        <div className="mt-6 text-right">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-primary rounded-md hover:bg-opacity-90"
          >
            Submit All
          </button>
        </div>
      </form>
    </DefaultLayout>
  );
};

export default AuditForm;
