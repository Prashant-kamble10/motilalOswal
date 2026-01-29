 import "../App.css";

function SkeletonRow() {
  return (
    <tr>
      {[1, 2, 3, 4].map((cell) => (
        <td key={cell} className="table-data">
          <div className="skeleton-cell"></div>
        </td>
      ))}
    </tr>
  );
}

export default SkeletonRow
