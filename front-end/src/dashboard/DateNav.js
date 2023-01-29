import { Link } from "react-router-dom";
import { previous, next, today } from "../utils/date-time";

function DateNav({ date }) {
  return (
    <div role="group">
      <Link
        type="button"
        to={(location) => {
          return `${location.pathname}?date=${previous(date)}`;
        }}
      >
        Previous
      </Link>
      <Link
        type="button"
        to={(location) => {
          return `${location.pathname}?date=${today()}`;
        }}
      >
        Today
      </Link>
      <Link
        type="button"
        to={(location) => {
          return `${location.pathname}?date=${next(date)}`;
        }}
      >
        Next
      </Link>
    </div>
  );
}

export default DateNav;