import React, { useEffect, useState } from "react";
import { listReservations, listTables} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservation from "./Reservation";
import Table from "./Table";
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

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
      listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const reservationList = reservations.map((reservation) => (
    <Reservation
      loadDashboard={loadDashboard}
      key={reservation.reservation_id}
      reservation={reservation}
    />
  ));

  const tableList = tables.map((table) => (
    <Table loadDashboard={loadDashboard} key={table.table_id} table={table} />
  ));

  return (
    <main>
      <div>
        <h1>Dashboard</h1>
        <DateNav date={date} />
      </div>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      <div>
        <div>
          <div>
            <h4>Reservations for: {date}</h4>
            
            {reservationList}
          </div>
          <div>
            <h4>Tables:</h4>
            {tableList}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;