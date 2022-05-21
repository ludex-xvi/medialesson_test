import axios from "axios";

const BASE_URL = "https://api.chucknorris.io/jokes/";
const header = {
  Accept: "application/json",
};

export async function fetchAllCategories() {
  const url = "categories";
  try {
    const data = await axios.get(BASE_URL + url, {
      headers: header,
    });
    console.log("ALL CATEGORIES", data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("error message::", error.message);
      return error.message;
    } else {
      console.error("unexpected error::", error);
      return "An unexpected error occured";
    }
  }
}

type Joke = {
  icon_url: string;
  id: string;
  url: string;
  value: string;
};

type GetJokeResponse = {
  data: Joke[];
};

export async function fetchRandomJoke() {
  const url = "random";
  try {
    const { data, status } = await axios.get<GetJokeResponse>(BASE_URL + url, {
      headers: header,
    });
    console.log("RANDOM JOKE::", data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("error message::", error.message);
      return error.message;
    } else {
      console.error("unexpected error::", error);
      return "An unexpected error occured";
    }
  }
}
