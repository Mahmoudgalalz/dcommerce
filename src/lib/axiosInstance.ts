import axios from "axios";
const baseURL = "http://localhost:9000";


export const instance = axios.create({
	baseURL,
	withCredentials: true,
	headers: {
		"Access-Control-Allow-Origin": "*",
	},
});

// instance.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	async (error) => {
// 		const paths = Array(window.location.pathname);
// 		if (error.response.status === 401) {
// 			// const req = await refreshToken();
// 			// console.log(req)
// 			// if (req.status === "success") {
// 			// 	localStorage.removeItem("h-tk");
// 			// 	localStorage.setItem("h-tk", req.data);
// 			// 	console.log(req);
// 			// 	return;
// 			// }
// 			// if (!paths.includes("/") && !paths.includes("/login")) {
// 			// 	localStorage.removeItem("h-tk");
// 			// 	window.location.replace("/login");
// 			// }
// 		}
// 		return Promise.reject(error);
// 	}
// );