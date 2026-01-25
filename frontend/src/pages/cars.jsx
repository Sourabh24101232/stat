import { useEffect, useState } from "react";
import API from "../api/api";

function Cars() {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({ name: "", number: "", pricePerDay: "" });

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
      pricePerDay: Number(formData.pricePerDay)
    });

    //Frontend waits for backend response
    setFormData({ name: "", number: "", pricePerDay: "" });
    fetchCars();//Update UI after response
  };

  // DELETE CAR
  const deleteCar = async (id) => {
    await API.delete(`/cars/${id}`);
    setCars(cars.filter(car => car._id !== id));
  };

  return (
    <div>

      <h2>Add your Car</h2>

      <form onSubmit={addCar}>
        <input placeholder="Car Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input placeholder="Car Number" value={formData.number} onChange={(e) => setFormData({ ...formData, number: e.target.value })} />
        <input placeholder="Price Per Day" type="number" value={formData.pricePerDay} onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })} />
        <button type="submit">Add Car</button>
      </form>

      <hr />

      <h2>Cars List</h2>

      {cars.map((car) => (
        <div key={car._id}>
          <p> {car.name} — {car.number} — ₹{car.pricePerDay}</p>
          <button onClick={() => deleteCar(car._id)}>Delete</button>
        </div>
      ))}

    </div>
  );
}

export default Cars;
