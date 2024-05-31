export const convertDate = (orderDate) => {
  const createdAt = new Date(orderDate);
  const createdDate = createdAt.toLocaleDateString("id-ID");
  return createdDate;
};