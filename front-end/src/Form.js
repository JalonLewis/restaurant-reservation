import { useHistory } from "react-router-dom";

function Form({ formData, handleChange, handleSubmit }) {
  const history = useHistory();
  return (
    <div>
      <form noValidate={true} onSubmit={handleSubmit}>
        <div>
          <input
            required
            type="text"
            onChange={handleChange}
            value={formData.first_name}
            placeholder="First Name"
            name="first_name"
          ></input>
          <input
            required
            type="text"
            onChange={handleChange}
            value={formData.last_name}
            placeholder="Last Name"
            name="last_name"
          ></input>
        </div>
        <div>
          <input
            required
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            maxLength="12"
            onChange={handleChange}
            value={formData.mobile_number}
            placeholder="Mobile Number"
            name="mobile_number"
          ></input>
        </div>
        <div>
          <input
            required
            type="date"
            onChange={handleChange}
            value={formData.reservation_date}
            placeholder="Reservation Date"
            name="reservation_date"
          ></input>
        </div>{" "}
        <div>
          <input
            required
            type="time"
            onChange={handleChange}
            value={formData.reservation_time}
            placeholder="Reservation Time"
            name="reservation_time"
          ></input>
        </div>{" "}
        <div>
          <input
            required
            type="number"
            min="1"
            onChange={handleChange}
            value={formData.people}
            placeholder="People"
            name="people"
          ></input>
        </div>
        <button type="submit">
          Submit
        </button>
        <button
          type="button"
          onClick={history.goBack}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Form;