// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { useContext } from "react";
import DreamFinderContext from "../../components/Context/Context";

export default (req, res) => {
  const { searchResult } = useContext(DreamFinderContext);

  res.statusCode = 200;
  res.json({ name: "John Doe", game: searchResult });
};
