import { unseatTable } from "../utils/api";


function Table({ table, loadDashboard }) {
  
  function clickHandler() {
    if (window.confirm("Is this table ready to seat new guests?")) {
      const abortController = new AbortController();
      unseatTable(table.table_id, abortController.signal)
        .then(loadDashboard)
        .catch((error) => console.log("error", error));
      return () => abortController.abort();
    }
  }


  return (
    <div>
      <h5>Table Name: {table.table_name}</h5>
      <div>
        <div>
          <div>
            <h5>
              Capacity: {table.capacity}
            </h5>
            {table.reservation_id ? (
              <>
                <div
                  data-table-id-status={table.table_id}
                  style={{ cursor: "default" }}
                >
                  Occupied
                </div>
              </>
            ) : (
              <div
                data-table-id-status={table.table_id}
                style={{ cursor: "default" }}
              >
                Free
              </div>
            )}
          </div>
        </div>
      </div>
      {table.reservation_id ? (
        <div
          data-table-id-finish={table.table_id}
          onClick={clickHandler}
          role="button"
        >
          <h5>
            Finish
          </h5>
        </div>
      ) : null}
    </div>
  );
}

export default Table;