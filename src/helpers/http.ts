import axios from "axios";
import type { IJoke } from "@/interfaces/IJoke";

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
    return data.data;
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



export async function fetchRandomJoke() {
  const url = "random";
  try {
    const { data, status } = await axios.get<IJoke>(BASE_URL + url, {
      headers: header,
    });
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

export async function fetchJokeByCategory(category: string) {
  const url = "random?category=";
  try {
    const { data, status } = await axios.get<IJoke>(BASE_URL + url +  category );
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

export async function fetchJokeByFreeText(userInput: string){
  const url = "search?query=";
  try {
    const { data, status } = await axios.get(BASE_URL + url +  userInput );
    console.log('test', data.result);
    return data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("error message::", error.message);
      return error.response?.status;
    } else {
      console.error("unexpected error::", error);
      return "An unexpected error occured";
    }
  }
}