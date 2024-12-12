import React from "react";
import CardElement from "@/app/forms/displaytransfer/toloc";

const sampleData = [
  { itemId: "001", type: "Laptop", category: "COMPUTER_AND_IT_EQUIPMENT", location: "TT Nagar Police Station" },
  { itemId: "002", type: "Pistol", category: "FIREARMS", location: "Kamla Nagar Police Station" },
  { itemId: "003", type: "Router", category: "NETWORKING_EQUIPMENT", location: "Shyamla Hills Police Station" },
];

const App: React.FC = () => {
  <h2 className="text-black dark:text-white ">Items to Transfer:</h2>  
  return <CardElement data={sampleData} />;
};

export default App;
