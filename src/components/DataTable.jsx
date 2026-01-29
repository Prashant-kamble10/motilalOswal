import SkeletonRow from "./SkeletonRow";
import "../App.css";

function DataTable({ data, loading }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th className="table-header">ID</th>
          <th className="table-header">Name</th>
          <th className="table-header">Email</th>
          <th className="table-header">Role</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td className="table-data">{user.id}</td>
            <td className="table-data">{user.name}</td>
            <td className="table-data">{user.email}</td>
            <td className="table-data">{user.role}</td>
          </tr>
        ))}

        {loading &&
          Array.from({ length: 18 }).map((_, i) => <SkeletonRow key={i} />)}
      </tbody>
    </table>
  );
}

export default  DataTable;
