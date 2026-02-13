import React, { useState } from "react";
import "animate.css";

const packs = [
  { id: 1, name: "Pack 1", items: ["4 Puff Puff", "3 Mosa", "1 Springroll", "1 Samosa", "1 Chicken"], price: 2500 },
  { id: 2, name: "Pack 2", items: ["4 Puff Puff", "3 Mosa", "1 Springroll", "1 Samosa", "1 Chicken", "1 Gizzard"], price: 3300 },
  { id: 3, name: "Pack 3", items: ["4 Puff Puff", "3 Mosa", "1 Springroll", "1 Samosa", "1 Chicken", "1 Pepper Beef"], price: 3200 },
  { id: 4, name: "Pack 4", items: ["4 Puff Puff", "3 Mosa", "1 Springroll", "1 Samosa", "1 Chicken", "1 Gizzard", "1 CornDog"], price: 4000 },
  { id: 5, name: "Pack 5", items: ["4 Puff Puff", "3 Mosa", "1 Springroll", "1 Samosa", "1 Chicken", "1 Gizzard", "1 Pepper Beef", "1 CornDog"], price: 4700 },
  { id: 6, name: "Pack 6", items: ["4 Puff Puff", "3 Mosa", "1 Springroll", "1 Samosa", "1 Chicken", "1 Gizzard", "1 MoneyBag", "1 CornDog"], price: 5000 },
  { id: 7, name: "Pack 7", items: ["4 Puff Puff", "3 Mosa", "1 Springroll", "1 Samosa", "1 Chicken", "1 Gizzard", "1 Pepper Beef", "1 CornDog", "1 Pepper Snail"], price: 6700 },
];

const platters = [
  { id: 1, name: "You Sabi Platter", items: ["30 Puff Puff", "20 Mosa", "5 Springroll", "5 Samosa", "5 Chicken"], price: 16500 },
  { id: 2, name: "Queens Platter", items: ["50 Puff Puff", "30 Mosa", "10 Springroll", "10 Samosa", "10 Chicken", "5 Pepper Gizzard"], price: 35500 },
  { id: 4, name: "Kings Platter", items: ["60 Puff Puff", "30 Mosa", "10 Springroll", "10 Samosa", "15 Chicken", "5 Pepper Snails", "1 Pepper Beef"], price: 41500 },
  { id: 5, name: "Summer Platter", items: ["80 Puff Puff", "50 Mosa", "20 Springroll", "20 Samosa", "15 Chicken", "5 Pepper Gizzard", "5 Pepper Beef", "5 CornDog", "5 Turkey"], price: 82000 },
  { id: 6, name: "Big Big Things Platter", items: ["50 Puff Puff", "40 Mosa", "25 Springroll", "25 Samosa", "20 Chicken", "10 Snail", "5 Pepper Gizzard", "5 Pepper Beef", "5 Turkey"], price: 106500 },
];

const Cart = () => {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (item) => {
    setLoading(true);

    try {
      await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packId: item.id,
          items: item.items,
          price: item.price,
        }),
      });

      alert(`${item.name} added to cart successfully!`);
    } catch {
      const saved = localStorage.getItem("cart");
      const cartArr = saved ? JSON.parse(saved) : [];

      localStorage.setItem(
        "cart",
        JSON.stringify([
          ...cartArr,
          { id: Date.now(), packId: item.id, items: item.items, price: item.price },
        ])
      );

      alert(`${item.name} saved offline (server not running).`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-black via-purple-900 to-yellow-700 text-white">

      {/* PACKS */}
      <h1 className="animate__animated animate__jackInTheBox text-2xl font-bold mb-6 text-center bg-black/50 p-2 rounded-lg">
        OUR PACKS
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        {packs.map((pack, index) => (
          <div
            key={pack.id}
            className={`animate__animated animate__rollIn animate__delay-${index % 4 + 1}s
              border rounded-lg shadow-lg p-4 flex flex-col justify-between 
              bg-white/10 backdrop-blur-sm cursor-pointer border-yellow-400`}
          >
            <h2 className="text-xl font-semibold mb-2 text-yellow-300">{pack.name}</h2>

            <ul className="list-disc list-inside mb-4">
              {pack.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <p className="font-bold mb-4">Price: {pack.price}₦</p>

            <button
              onClick={() => handleAddToCart(pack)}
              disabled={loading}
              className={`animate__animated animate__jackInTheBox bg-gradient-to-r from-purple-900 to-yellow-500
                py-2 px-4 rounded shadow-md hover:opacity-90 transition
                ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Adding..." : "Add Order"}
            </button>
          </div>
        ))}
      </div>

      {/* PLATTERS */}
      <h1 className="animate__animated animate__jackInTheBox text-2xl font-bold mb-6 text-center bg-black/50 p-2 rounded-lg">
        OUR PLATTERS
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {platters.map((platter, index) => (
          <div
            key={platter.id}
            className={`animate__animated animate__rollIn animate__delay-${index % 4 + 1}s
              border rounded-lg shadow-lg p-4 flex flex-col justify-between 
              bg-white/10 backdrop-blur-sm cursor-pointer border-yellow-400`}
          >
            <h2 className="text-xl font-semibold mb-2 text-yellow-300">{platter.name}</h2>

            <ul className="list-disc list-inside mb-4">
              {platter.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <p className="font-bold mb-4">Price: {platter.price}₦</p>

            <button
              onClick={() => handleAddToCart(platter)}
              disabled={loading}
              className={`animate__animated animate__jackInTheBox bg-gradient-to-r from-purple-900 to-yellow-500
                py-2 px-4 rounded shadow-md hover:opacity-90 transition
                ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Adding..." : "Add Order"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
