import axios from "axios";
import cookies from "react-cookies";

export const api = axios.create({
	baseURL: "http://localhost:3333",
});
