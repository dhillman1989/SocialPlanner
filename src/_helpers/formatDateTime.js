import moment from "moment";

export default function formatDateTime(dateObject) {
  const formattedDateTime = moment(dateObject).format("D/M/YYYY");

  return formattedDateTime;
}
