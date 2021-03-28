import React, { useContext } from "react";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import Link from "next/link";
import DreamFinderContext from "../Context/Context";

const SingleArea = ({ area }) => {
  const { name } = area;
  const { searchData, SetSearchData } = useContext(DreamFinderContext);

  return (
    <div className="singleArea">
      <div className="d-flex flex-column">
        {area.places &&
          area.places.map((singlePlace) => (
            <Link
              href="/findProperties"
              key={singlePlace.id}
              className="mb-1 placeName"
            >
              <a
                className="text-dark"
                onClick={() =>
                  SetSearchData({
                    ...searchData,
                    address: searchData.address
                      ? [...searchData.address, singlePlace.place_name]
                      : [singlePlace.place_name],
                  })
                }
              >
                {singlePlace.place_name}
              </a>
            </Link>
          ))}
      </div>
      {area.places && (
        <button className="moreBtn">
          More
          <DoubleArrowIcon style={{ fontSize: "1rem" }} />
        </button>
      )}
    </div>
  );
};

export default SingleArea;
