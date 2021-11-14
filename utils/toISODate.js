export const singleDate = (date) => {
  let created_at = date;
  let newISODate = created_at.toISOString().slice(0, 10);
  // userPost.rows[0].created_at = newdate;
  return newISODate;
};