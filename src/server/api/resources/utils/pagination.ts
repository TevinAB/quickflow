export function getPaginationData(
  totalItems: number,
  itemsPerPage: number,
  currentPage: number
) {
  const lastPage = getTotalPages(totalItems, itemsPerPage);

  if (currentPage > lastPage) {
    currentPage = lastPage;
  }

  //minus one so we begin where the previous page left off.
  return { startIndex: (currentPage - 1) * itemsPerPage, lastPage };
}

function getTotalPages(totalItems: number, itemsPerPage: number) {
  if (!itemsPerPage) throw new Error('itemsPerPage cannot be zero');

  const quotient = totalItems / itemsPerPage;
  if (quotient % 1 === 0) {
    return quotient;
  }
  return Math.trunc(quotient) + 1;
}
