import { useEffect, useState } from "react";
import API from "../api/api";

function Cars() {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    pricePerDay: "",
  });

  // FETCH CARS
  const fetchCars = async () => {
    const res = await API.get("/cars");
    setCars(res.data);
  };
  // const fetchCars = async () => {
  //   try {
  //     const res = await API.get("/cars");
  //     console.log("CARS FROM BACKEND ", res.data);
  //     setCars(res.data);
  //   } catch (err) {
  //     console.error("FETCH FAILED ", err);
  //   }
  // };

  useEffect(() => {
    fetchCars();
  }, []);

  // ADD CAR
  const addCar = async (e) => {
    e.preventDefault();//React prevents page reload

    await API.post("/cars", {
      ...formData,
      pricePerDay: Number(formData.pricePerDay),
    });

    //Frontend waits for backend response
    setFormData({ name: "", number: "", pricePerDay: "" });
    fetchCars();//Update UI after response
  };

  // DELETE CAR
  const deleteCar = async (id) => {
    await API.delete(`/cars/${id}`);
    setCars(cars.filter((car) => car._id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Cars</h1>

      {/* ADD CAR SECTION */}
      <div className="border rounded p-4 bg-white space-y-4">
        <h2 className="text-lg font-medium">Add your Car</h2>

        <form onSubmit={addCar} className="space-y-3">
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Car Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Car Number"
            value={formData.number}
            onChange={(e) =>
              setFormData({ ...formData, number: e.target.value })
            }
          />

          <input
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Price Per Day"
            value={formData.pricePerDay}
            onChange={(e) =>
              setFormData({ ...formData, pricePerDay: e.target.value })
            }
          />

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Car</button>
        </form>
      </div>


      {/* CARS LIST SECTION */}
      <div className="border rounded p-4 bg-white space-y-4">
        <h2 className="text-lg font-medium">Cars List</h2>

        {cars.length === 0 && (
          <p className="text-sm text-gray-600">No cars added yet.</p>
        )}

        {cars.map((car) => (
          <div key={car._id} className="flex justify-between items-center border-b py-2 last:border-b-0">
            <div>
              <p className="font-medium">{car.name}</p>
              <p className="text-sm text-gray-600">{car.number} — ₹{car.pricePerDay} / day</p>
            </div>

            <button
              onClick={() => deleteCar(car._id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete
            </button>

          </div>
        ))}
      </div>


    </div>

  );
}

export default Cars;
