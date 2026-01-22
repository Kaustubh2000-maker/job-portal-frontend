export default function SearchSection() {
  return (
    <>
      <div className="js-search-container">
        <h2 className="js-search-heading">Find Your Dream Job Today</h2>
        <p className="js-search-sub-text">
          Explore thousands of opportunities from top companies and build your
          carear
        </p>
        <div className="js-search-div">
          <input
            className="js-search-imput"
            type="text"
            placeholder="Search Job Title, Company or Keyword"
          />
          <button className="js-search-button">Search</button>
        </div>
      </div>
    </>
  );
}
