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
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col col-8">{reservationList}</div>
      </div>
    </div>
  ) : (
    <h6 className="text-center my-3">No reservations found</h6>
  );

  return (
    <>
      <h5 className="text-center my-3">
        Find Booking by Phone Number
      </h5>
      {formErrors.length ? displayErrors : null}
      {reservationsError.length ? displayResErrors : null}
      <div className="d-flex justify-content-center">
      <form
        className="w-25 d-flex"
        onSubmit={handleSubmit}
      >
        <input
          required
          type="tel"
          maxLength="12"
          placeholder="Enter a customer's phone number"
          onChange={handleChange}
          value={formData.mobile_number}
          className="form-control"
          name="mobile_number"
        ></input>
        <button className="btn btn-primary ml-2" type="submit">
          Find
        </button>
      </form>
      </div>
      {content}
      {message}
    </>
  );
}

export default Search;
