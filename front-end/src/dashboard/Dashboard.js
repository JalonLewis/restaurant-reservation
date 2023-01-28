import React, { useEffect, useState } from "react";
import { listReservations} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservation from "./Reservation";
import DateNav from "./DateNav";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const reservationList = reservations.map((reservation) => (
    <Reservation
      loadDashboard={loadDashboard}
      key={reservation.reservation_id}
      reservation={reservation}
    />
  ));

  return (
    <main>
      <div className="text-center mt-3 mb-5">
        <h1>Dashboard</h1>
        <DateNav date={date} />
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="container">
        <div className="row">
          <div className="col col-sm">
            <h4 className="mb-4 text-center">Reservations for: {date}</h4>
            
            {reservationList}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;