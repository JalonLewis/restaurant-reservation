import { cancelReservation } from "../utils/api";

function Reservation({ reservation, loadDashboard }) {
  const {
    reservation_id,
    first_name,
    last_name,
    reservation_time,
    people,
    mobile_number,
    status,
  } = reservation;

  function handleClick() {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();

      cancelReservation(reservation_id, abortController.signal)
        .then(loadDashboard)
        .catch((error) => console.log("error", error));
      return () => abortController.abort();
    }
  }

  const statusElement =
    status === "booked" ? (
      <div
        style={{ cursor: "default" }}
      >
        Booked
      </div>
    ) : status === "seated" ? (
      <div
        style={{ cursor: "default" }}
      >
        Seated
      </div>
    ) : status === "cancelled" ? (
      <div
        style={{ cursor: "default" }}
      >
        Cancelled
      </div>
    ) : (
      <div
        style={{ cursor: "default" }}
      >
        Finished
      </div>
    );

  return (
    <div>
      <h5>
        <div>
          {first_name} {last_name}
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            style={{ marginTop: "1px" }}
            viewBox="0 0 16 16"
          >
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
          </svg>{" "}
          {reservation_time}
        </div>
      </h5>
      <div>
        <div>
          <div>
            <p>
              {mobile_number}
            </p>
            <p>People: {people}</p>
          </div>
          <div>
            <div
              data-reservation-id-status={reservation.reservation_id}
            >
              {statusElement}
            </div>

            <div>
              <a href={`/reservations/${reservation_id}/edit`}>
                <button>Edit</button>
              </a>
              <button
                data-reservation-id-cancel={reservation.reservation_id}
                onClick={handleClick}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {status === "booked" && (
        <a
          href={`/reservations/${reservation_id}/seat`}
          role="button"
        >
          <h5>
            Seat
          </h5>
        </a>
      )}
    </div>
  );
}

export default Reservation;
