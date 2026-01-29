import "../App.css";

function FilterSortBar({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="filter-sort-container">
      <div className="filter-sort-item">
        <label className="filter-sort-label">Search: </label>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-sort-item">
        <label className="filter-sort-label">Sort By: </label>
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)} className="filter-select">
          <option value="none">None</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="id-asc">ID (Low to High)</option>
          <option value="id-desc">ID (High to Low)</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSortBar
