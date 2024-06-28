import { useAccount, useWriteContract } from "wagmi";
import { ABI_RECURRING_PAYMENTS } from "../../utils/abiRecurringPayments";
import {
  DAY,
  RECURRING_PAYMENTS_CONTRACT_ADDRESS,
} from "../../utils/constants";
import { useState, useEffect } from "react";

const Index = () => {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();

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
    const { userAddress, name, price, description, subscriptionPeriod } =
      formData;

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
          subscriptionPeriod === "Weekly" ? DAY * 7 : DAY * 30,
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
    <div>
      <h1>Subscribe</h1>
      <br />
      <div>
        <label htmlFor="userAddress">Address</label>
        <input
          name="userAddress"
          type="text"
          value={formData.userAddress}
          onChange={handleInputChange}
          required
        />
        <br />
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <br />
        <label htmlFor="price">Price</label>
        <input
          name="price"
          type="text"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <br />
        <label htmlFor="description">Description</label>
        <input
          name="description"
          type="text"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <br />
        <label htmlFor="subscriptionPeriod">Sub. Period</label>
        <select
          name="subscriptionPeriod"
          value={formData.subscriptionPeriod}
          onChange={handleInputChange}
          required
        >
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
        <br />
        <label htmlFor="image">Upload Image</label>
        <input name="image" type="file" onChange={handleInputChange} />
        <br />
        <br />
        <button onClick={handleSubmit}>Create Subscription</button>
      </div>
    </div>
  );
};

export default Index;
