import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listTables, updateTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();

  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(console.log);
    return () => abortController.abort();
  }

  const handleChange = ({ target }) => {
    setTableId(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setFormErrors([]);

    const errors = [];

    setFormErrors(errors);

    updateTable(reservation_id, tableId, abortController.signal)
      .then((_) => {
        history.push(`/dashboard`);
      })
      .catch((e) => console.log(e));

    return () => abortController.abort();
  };

  let displayErrors = formErrors.map((error) => (
    <ErrorAlert key={error} error={error} />
  ));

  const tableList = tables.map((table) => (
    <option key={table.table_id} value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ));
  return (
    <>
      <div className="text-center my-3">
        <h2>Select A Table</h2>
      </div>
      {formErrors.length ? displayErrors : null}
      <div className="d-flex justify-content-center">
        <form className="form border border-secondary bg-light border-3 rounded px-2 py-1" onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="table">
            Table Name:
          </label>
          <select
            required
            onChange={handleChange}
            value={tableId}
            className="form-control border-dark border-2"
            name="table_id"
          >
            <option value="">-- Choose Table --</option>
            {tableList}
          </select>
          <button className="btn btn-primary my-1 mx-5" type="submit">
            Submit
          </button>
          <button
            onClick={history.goBack}
            type="button"
            className="btn btn-secondary my-1 mx-5"
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default SeatReservation;