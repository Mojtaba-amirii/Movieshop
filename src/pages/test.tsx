import { useState } from "react";
import { api } from "~/utils/api";

export default function () {
  const movies = api.movies.first100.useQuery();

  console.log(movies.data);

  /* const checkLinkValidity = async (link: URL) => {
    try {
      const response = await fetch(link);
      if (response.ok) {
        return link;
      } else {
        return ("/image-not-found.jpg");
      }
    } catch (error) {
      return ("/image-not-found.jpg");;
    }
  }; */

  return <>test</>;
}
