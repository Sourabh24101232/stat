import { useEffect, useState } from "react";
import API from "../api/api";

//Functional component
function Cars() {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({ name: "", number: "", pricePerDay: "", });
  const [loading, setLoading] = useState(true);//Controls UI disabling + loading messages
  const [error, setError] = useState("");//Stores user-facing error messages

  // FETCH CARS
  const fetchCars = async () => {
    try {
      setLoading(true);//You reset UI state before request
      setError("");//clear old error

      const res = await API.get("/cars");//API call to backend to return valid JSON
      setCars(res.data);//Directly stores backend response
    } catch (err) {
      setCars([]);//You clear cars on failure → avoids showing stale data
      setError("Backend server is not reachable");
    } finally {//runs every time
      setLoading(false);//Guarantees your UI never stays stuck in loading mode, ab band karo loading
    }
  };

  useEffect(() => { fetchCars(); }, []);//“When the page opens, it automatically loads the car data once so the user can see it.”
  //That empty [] at the end means: “Do this only the first time the page appears.”

  // ADD CAR
  const addCar = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.number || !formData.pricePerDay) {//Frontend validation
      setError("All fields are required");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await API.post("/cars", {
        ...formData,//spread formData
        pricePerDay: Number(formData.pricePerDay),//Converts string → number explicitly.
      });

      setFormData({ name: "", number: "", pricePerDay: "" });//Resets form after success
      fetchCars();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add car");//“If adding the car fails, the app shows the real reason if available, otherwise a simple error message.”
      //“If error exists, and it has a response, and that response has data, and that data has a message — then use that message.”
      //?. means:“Check safely. If it exists, continue. If not, stop quietly.”
      //Without ? If any part is missing → app crashes
    } finally {
      setLoading(false);
    }
  };


  // DELETE CAR
  const deleteCar = async (id) => {//Accepts car ID
    try {
      await API.delete(`/cars/${id}`);//RESTful delete
      setCars(prev => prev.filter(car => car._id !== id));//it updates the list by creating a new one that removes the car whose ID matches the deleted one
    } catch {
      setError("Failed to delete car");
    }
  };

  return (

    <div className="space-y-6">

      <h1 className="text-xl font-semibold">Cars</h1>

      {/* ADD CAR SECTION */}
      <div className="border rounded p-4 bg-white space-y-4">

        <h2 className="text-lg font-medium">Add your Car</h2>

        <form onSubmit={addCar} className="space-y-3">
          <input className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Car Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Car Number" value={formData.number} onChange={(e) => setFormData({ ...formData, number: e.target.value })} />
          <input type="number" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Price Per Day" value={formData.pricePerDay} onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })} />
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">{loading ? "Adding..." : "Add Car"}</button>
        </form>

      </div>


      {/* CARS LIST SECTION */}
      <div className="border rounded p-4 bg-white space-y-4">
        <h2 className="text-lg font-medium">Cars List</h2>

        {error && (<p className="text-sm text-red-600">{error}</p>)}
        {loading && !error && (<p className="text-sm text-gray-600">Loading cars...</p>)}
        {!loading && !error && cars.length === 0 && (<p className="text-sm text-gray-600">No cars added yet.</p>)}

        {!loading && !error && cars.map((car) => (
          <div key={car._id} className="flex justify-between items-center border-b py-2 last:border-b-0">
            <div>
              <p className="font-medium">{car.name}</p>
              <p className="text-sm text-gray-600">{car.number} — ₹{car.pricePerDay} / day</p>
            </div>

            <button onClick={() => deleteCar(car._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"> Delete</button>
          </div>
        ))}

      </div>


    </div>

  );
}

export default Cars;
