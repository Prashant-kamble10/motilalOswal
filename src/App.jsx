import { useEffect, useState, useCallback, useMemo } from "react";
import { fetchUsers } from "./api/fakeApi";
import DataTable from "./components/DataTable";
import FilterSortBar from "./components/FilterSortBar";
import useInfiniteScroll from "./hooks/useInfiniteScroll";

export default function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("none");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    // setLoading(true);
    fetchUsers(1).then((res) => {
      setUsers(res.data);
      setHasMore(res.hasMore);
      setPage(2);
      setLoading(false);
    });
  }, []);

  const loadUsers = useCallback(() => {
    setLoading(true);

    fetchUsers(page).then((res) => {
      setUsers((prev) => [...prev, ...res.data]); 
      setHasMore(res.hasMore);
      setPage((prev) => prev + 1);
      setLoading(false);
    });
  }, [page]);

  const observerTarget = useInfiniteScroll(loadUsers, hasMore, loading);

  // Memoize filtered users to prevent recalculation on every render
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchLower = debouncedSearchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    });
  }, [users, debouncedSearchTerm]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      } else if (sortBy === "id-asc") {
        return a.id - b.id;
      } else if (sortBy === "id-desc") {
        return b.id - a.id;
      }
      return 0;
    });
  }, [filteredUsers, sortBy]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Users Table</h2>
      <FilterSortBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <DataTable data={sortedUsers} loading={loading} />
      <div ref={observerTarget} style={{ height: "1px", marginTop: "20px" }} />
    </div>
  );
}


