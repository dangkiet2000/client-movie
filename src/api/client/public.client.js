import axios from "axios";
import queryString from "query-string";

// * nếu dùng fetch khi nhận res về ta phải dừng res.json() rồi ở then() tiếp theo mới lấy được data. Còn ở đây chỉ cần 
// * header là application/json là nó tự hiểu để convert sang thằng javascript object
// * paramsSerializer: Kiểu nó mã hóa dữ liệu cho phù hợp với kiểu dữ liệu đc gửi đi.

const baseURL = "https://moonflix-api.vercel.app/api/v1/";

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

// * Chặn request và response trước khi nó đc sent để configs nó.
// * Đối với request thì trc khi gửi thì chặn lại và thêm cái headers cho nó
// * Headers của 1 request: Nơi chứa các thông tin cần thiết của 1 request nhưng end-users không biết sự tồn tại của nó
// ! Header có thể gồm: Độ dài của request body, thời gian gửi request, loại thiết bị đang sử dụng, loại định dạng cái response mà client có thể đọc được

publicClient.interceptors.request.use(async (configs) => {
  return {
    ...configs,
    headers: {
      "Content-Type": "application/json",
    },
  };
});

// * Trước khi nhận đc cái response thì có thể kiểm tra coi nó có lỗi hay không.
publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.data;
  }
);

export default publicClient;
