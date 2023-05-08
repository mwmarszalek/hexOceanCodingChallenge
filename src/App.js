import { Fragment, useState } from "react";

function App() {

  const [formData, setFormData] = useState({
    name: "",
    preparation_time: "",
    type: "",
    no_of_slices: "",
    diameter: "",
    spiciness_scale: "",
    slices_of_bread: "",
  });

  const dishTypeSelector = () => {
    switch (formData.type) {
      case "pizza":
        return (
          <>
            <label>
              No. of slices:
              <input
                type="number"
                name="no_of_slices"
                value={formData.no_of_slices}
                onChange={handleChange}
              />
            </label>
            <label>
              Diameter:
              <input
                type="number"
                step="0.1"
                name="diameter"
                value={formData.diameter}
                onChange={handleChange}
              />
            </label>
          </>
        );
      case "soup":
        return (
          <label>
            Spiciness Scale ({formData.spiciness_scale})
            <input
              type="range"
              min="1"
              max="10"
              name="spiciness_scale"
              value={formData.spiciness_scale}
              onChange={handleChange}
            />
          </label>
        );
      case "sandwich":
        return (
          <label>
            Slices of bread:
            <input
              type="number"
              name="slices_of_bread"
              value={formData.slices_of_bread}
              onChange={handleChange}
            />
          </label>
        );
      default:
        return null;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "type") {
      switch (value) {
        case "pizza":
          setFormData({
            ...formData,
            spiciness_scale: null,
            slices_of_bread: null,
            [name]: value,
          });
          break;
        case "soup":
          setFormData({
            ...formData,
            no_of_slices: null,
            diameter: null,
            slices_of_bread: null,
            [name]: value,
          });
          break;
        case "sandwich":
          setFormData({
            ...formData,
            no_of_slices: null,
            diameter: null,
            spiciness_scale: null,
            [name]: value,
          });
          break;
        default:
          setFormData({
            ...formData,
            [name]: value,
          });
          break;
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestParameters = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    fetch(
      "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
      requestParameters
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <label>
          Dish name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Preparation time:
          <input
            type="time"
            step="1"
            name="preparation_time"
            value={formData.preparation_time}
            onChange={handleChange}
            required
          />
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select type</option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </select>
        {dishTypeSelector()}
        <button type="submit">Submit</button>
      </form>
    </Fragment>
  );
}

export default App;
