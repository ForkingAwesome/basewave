import { useAccount, useWriteContract } from "wagmi";
import { ABI_RECURRING_PAYMENTS } from "../../utils/abiRecurringPayments";
import { DAY, RECURRING_PAYMENTS_CONTRACT_ADDRESS } from "../../utils/constants";
import { useState, useEffect } from "react";

const Index = () => {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [imagePreview, setImagePreview] = useState(null);


  const [formData, setFormData] = useState({
    userAddress: "",
    name: "",
    price: "",
    description: "",
    subscriptionPeriod: "Weekly",
    image: null,
  });

  useEffect(() => {
    if (isConnected) {
      console.log(address);
    } else {
      console.log("Not connected");
    }
  }, [isConnected, address]);

  const handleInputChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async () => {
    const { userAddress, name, price, description, subscriptionPeriod } = formData;

    console.log("Submitting with data:", {
      userAddress,
      price: parseInt(price),
      name,
      description,
      subscriptionPeriod: subscriptionPeriod === "Weekly" ? DAY * 7 : DAY * 30,
    });

    try {
      const result = await writeContractAsync({
        abi: ABI_RECURRING_PAYMENTS,
        address: RECURRING_PAYMENTS_CONTRACT_ADDRESS,
        functionName: "createSubscription",
        args: [
          userAddress,
          parseInt(price),
          name,
          description,
          10,
          // subscriptionPeriod === "Weekly" ? DAY * 7 : DAY * 30,
        ],
      });
      console.log(result);
    } catch (error: any) {
      if (error.reason) {
        alert("Subscription already exists!");
      } else {
        console.error("Contract call failed with error:", error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Create Subscription</h1>
      <div className="">
      <div className="">
        <label htmlFor="userAddress" className="block text-sm font-medium text-gray-700">Address</label>
        <input
          name="userAddress"
          type="text"
          value={formData.userAddress}
          onChange={handleInputChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
        <p className="text-sm text-gray-500 mt-1">This is your public display name.</p>
        <br />
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
        <p className="text-sm text-gray-500 mt-1">This is your public display name.</p>
        <br />
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input
          name="price"
          type="text"
          value={formData.price}
          onChange={handleInputChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
        <br />
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <input
          name="description"
          type="text"
          value={formData.description}
          onChange={handleInputChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
        <br />
        <label htmlFor="subscriptionPeriod" className="block text-sm font-medium text-gray-700">Sub. Period</label>
        <select
          name="subscriptionPeriod"
          value={formData.subscriptionPeriod}
          onChange={handleInputChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        >
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
        <br />
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
        <input
          name="image"
          type="file"
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
        <br />
        <br />
        <button
          onClick={handleSubmit}
          className="bg-black text-white p-2 rounded-md flex justify-center w-full"
        >
          Submit
        </button>
      </div>
      </div>
    </div>
  );
};

export default Index;