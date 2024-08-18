import SinglePackage from "@/Packages/singlePackage";

function PopularChoiceGrid({ detailData }) {
  return (
    <div className="section-front px-5">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 px-2 px-md-5 popular-grid-container">
        {detailData.map((item, i) => (
          <SinglePackage items={item} />
        ))}
      </div>
    </div>
  );
}

export default PopularChoiceGrid;
