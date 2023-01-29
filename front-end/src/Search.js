import { useState } from "react";
import { listReservations } from "./utils/api";
import FormatPhoneNum from "./utils/format-phone-number";
import ErrorAlert from "./layout/ErrorAlert";
import Reservation from "./dashboard/Reservation";

function Search() {
  const initialFormState = {
    mobile_number: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [formErrors, setFormErrors] = useState([]);

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState([]);

  const [message, setMessage] = useState(null);

  const handleChange = ({ target }) => {
    FormatPhoneNum(target);
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setFormErrors([]);
    setMessage(null);

    const errors = [];

    setFormErrors(errors);

    const mobileNumberQuery = { mobile_number: formData.mobile_number };

    // Call API to list reservations
    listReservations(mobileNumberQuery, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    return () => abortController.abort();
  };

  let displayErrors = formErrors.map((error) => (
    <ErrorAlert key={error} error={error} />
  ));

  let displayResErrors = reservationsError.map((error) => (
    <ErrorAlert key={error} error={error} />
  ));

  const reservationList = reservations.map((reservation) => (
    <Reservation key={reservation.reservation_id} reservation={reservation} />
  ));

  const content = reservations.length ? (
    <div>
      <div>
        <div>{reservationList}</div>
      </div>
    </div>
  ) : (
    <h3>No reservations found</h3>
  );

  return (
    <>
      <div>
        <h1>Find Booking by Phone Number</h1>
      </div>
      {formErrors.length ? displayErrors : null}
      {reservationsError.length ? displayResErrors : null}
      <form
        onSubmit={handleSubmit}
      >
        <input
          required
          type="tel"
          maxLength="12"
          placeholder="Enter a customer's phone number"
          onChange={handleChange}
          value={formData.mobile_number}
          name="mobile_number"
        ></input>
        <button type="submit">
          Find
        </button>
      </form>
      {content}
      {message}
    </>
  );
}

export default Search;
