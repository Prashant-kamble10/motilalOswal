const TOTAL_RECORDS = 10000;
const PAGE_SIZE = 50;

const allData = Array.from({ length: TOTAL_RECORDS }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  role: index % 2 === 0 ? "Developer" : "Designer",
}));

export function fetchUsers(page = 1, delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const data = allData.slice(start, end);
      resolve({
        data,
        hasMore: end < TOTAL_RECORDS,
      });
    }, delay);
  });
}