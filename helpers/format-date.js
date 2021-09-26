import format from "date-fns/format";

export const formatDate = (date) => {
  return typeof date === "string" ? format(new Date(date), "d MMM, yyyy") : "";
};
