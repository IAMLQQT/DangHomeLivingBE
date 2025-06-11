const SUCCESS_CODE = {
  SUCCESS: {
    status: 200,
    code: 1,
    sysMessage: "SUCCESS",
    message: "Thành công",
  },
};

const SESSION_CODE = {
  SESSION_TIMEOUT: {
    status: 400,
    code: -1,
    sysMessage: "SESSION_TIMEOUT",
    message: "Đăng nhập hết hạn",
  },
  PERMISSION_DENY: {
    status: 403,
    code: -2,
    sysMessage: "PERMISSION_DENY",
    message: "Từ chối truy cập",
  },
  RATE_LIMIT_ERROR: {
    status: 429,
    code: -3,
    sysMessage: "RATE_LIMIT_ERROR",
    message: "Giới hạn truy cập, vui lòng thử lại sau",
  },
};

const SYSTEM_CODE = {
  SYSTEM_ERROR: {
    status: 500,
    code: -900,
    sysMessage: "SYSTEM_ERROR",
    message: "Hệ thống có lỗi xảy ra, vui lòng thử lại sau!",
  },
  FIREBASE_ERROR: {
    status: 500,
    code: -903,
    sysMessage: "FIREBASE_ERROR",
    message: "Firebase: có lỗi xảy ra",
  },
  EXTERNAL_SYSTEM_CONNECT_ERROR: {
    status: 500,
    code: -904,
    sysMessage: "EXTERNAL_SYSTEM_CONNECT_ERROR",
    message: "Không thể kết nối tài nguyên, vui lòng thử lại sau!",
  },
  OTP_SYSTEM_ERROR: {
    status: 500,
    code: -905,
    sysMessage: "OTP_SYSTEM_ERROR",
    message: "Không thể gửi tin nhắn, vui lòng thử lại sau!",
  },
  DB_SYSTEM_ERROR: {
    status: 500,
    code: -906,
    sysMessage: "DB_SYSTEM_ERROR",
    message: "Database: có lỗi xảy ra",
  },
};

const HEADER_CODE = {
  MISSING_DEVICE_ERROR: {
    status: 400,
    code: -1001,
    sysMessage: "MISSING_DEVICE_ERROR",
    message: "Không tìm thấy thông tin thiết bị",
  },
  INVALID_PRODUCT_ERROR: {
    status: 400,
    code: -1002,
    sysMessage: "INVALID_PRODUCT_ERROR",
    message: "Mã sản phẩm không hợp lệ",
  },
  INVALID_TOKEN_ERROR: {
    status: 400,
    code: -1003,
    sysMessage: "INVALID_TOKEN_ERROR",
    message: "Dữ liệu xác thực không hợp lệ",
  },
  INVALID_SIGN_TOKEN_ERROR: {
    status: 400,
    code: -1004,
    sysMessage: "INVALID_SIGN_TOKEN_ERROR",
    message: "Sign token không hợp lệ",
  },
  INVALID_TIMESTAMP_ERROR: {
    status: 400,
    code: -1005,
    sysMessage: "INVALID_TIMESTAMP_ERROR",
    message: "Thời gian không hợp lệ",
  },
};

const NOT_FOUND_CODE = {
  NOT_FOUND_ERROR: {
    status: 404,
    code: -1400,
    sysMessage: "NOT_FOUND_ERROR",
    message: "Không tìm thấy dữ liệu",
  },
  DATA_EXIST_ERROR: {
    status: 400,
    code: -1401,
    sysMessage: "DATA_EXIST_ERROR",
    message: "Dữ liệu đã tồn tại",
  },
  PATH_NOT_FOUND_ERROR: {
    status: 404,
    code: -1403,
    sysMessage: "PATH_NOT_FOUND_ERROR",
    message: "Không tìm thấy đường dẫn",
  },
};

const CLIENT_CODE = {
  INVALID_PARAMS_ERROR: {
    status: 400,
    code: -1500,
    sysMessage: "INVALID_PARAMS_ERROR",
    message: "Dữ liệu không hợp lệ",
  },
  INVALID_PHONE: {
    status: 400,
    code: -1501,
    sysMessage: "INVALID_PHONE",
    message: "Số điện thoại không hợp lệ",
  },
  INVALID_OTP: {
    status: 400,
    code: -1502,
    sysMessage: "INVALID_OTP",
    message: "Mã xác nhận một lần không hợp lệ",
  },
  INCORRECT_OTP: {
    status: 400,
    code: -1503,
    sysMessage: "INCORRECT_OTP",
    message: "Mã xác nhận không chính xác hoặc đã hết hạn",
  },
  MAX_OTP_IN_DAY: {
    status: 400,
    code: -1504,
    sysMessage: "MAX_OTP_IN_DAY",
    message: "Bạn đã vượt quá số lần nhận tin nhắn trong ngày",
  },
  LOGIN_INCORRECT_USER_ERROR: {
    status: 400,
    code: -1505,
    sysMessage: "LOGIN_ERROR",
    message: "Đăng nhập thất bại, không tìm thấy thông tin người dùng!",
  },
  INACTIVE_ACCOUNT_ERROR: {
    status: 400,
    code: -1506,
    sysMessage: "INACTIVE_ACCOUNT_ERROR",
    message: "Tài khoản đã bị khóa!",
  },
  CREATE_ERROR: {
    status: 400,
    code: -1507,
    sysMessage: "CREATE_ERROR",
    message: "Tạo mới không thành công! Vui lòng thử lại",
  },
  UPDATE_ERROR: {
    status: 400,
    code: -1508,
    sysMessage: "UPDATE_ERROR",
    message: "Cập nhật không thành công! Vui lòng thử lại",
  },
  DELETE_ERROR: {
    status: 400,
    code: -1509,
    sysMessage: "DELETE_ERROR",
    message: "Xóa không thành công! Vui lòng thử lại",
  },
  REGISTER_ERROR: {
    status: 400,
    code: -1510,
    sysMessage: "REGISTER_ERROR",
    message: "Đăng kí không thành công",
  },
  INCORRECT_LOGIN_INFO: {
    status: 400,
    code: -1511,
    sysMessage: "INCORRECT_LOGIN_INFO",
    message: "Thông tin đăng nhập không đúng",
  },
  INACTIVE_ACCOUNT: {
    status: 400,
    code: -1512,
    sysMessage: "INACTIVE_ACCOUNT",
    message: "Tài khoản bị khoá vui lòng liên hệ admin",
  },
  INVALID_PASSWORD_LENGTH: {
    status: 400,
    code: -1513,
    sysMessage: "INVALID_PASSWORD_LENGTH",
    message: "Mật khẩu phải dài hơn 6 kí tự",
  },
  INCORRECT_CONFIRM_PASSWORD: {
    status: 400,
    code: -1514,
    sysMessage: "INCORRECT_CONFIRM_PASSWORD",
    message: "Nhập lại mật khẩu không đúng",
  },
  INCORRECT_PASSWORD: {
    status: 400,
    code: -1515,
    sysMessage: "INCORRECT_PASSWORD",
    message: "Mật khẩu không đúng",
  },
  INVALID_EMAIL: {
    status: 400,
    code: -1516,
    sysMessage: "INVALID_EMAIL",
    message: "Email không đúng định dạng",
  },
  INVALID_SORT: {
    status: 400,
    code: -1517,
    sysMessage: "INVALID_SORT",
    message: "Thông số sắp xếp không hợp lệ",
  },
  USER_NOT_FOUND: {
    status: 404,
    code: -1518,
    sysMessage: "USER_NOT_FOUND",
    message: "Không tìm thấy thông tin người dùng",
  },
  INACTIVE_USER_ERROR: {
    status: 400,
    code: -1519,
    sysMessage: "INACTIVE_USER",
    message: "Tài khoản đã bị vô hiệu hóa, vui lòng liên hệ nhân sự!",
  },
  EXITS_USER_ERROR: {
    status: 400,
    code: -1520,
    sysMessage: "EXITS_USER_ERROR",
    message: "Người dùng đã tồn tại",
  },
  CHANGE_PASSWORD_ERROR: {
    status: 400,
    code: -1521,
    sysMessage: "CHANGE_PASSWORD_ERROR",
    message: "Không thể thay đổi mật khẩu, vui lòng thử lại sau",
  },
  FILE_SIZE_TOO_LARGE: {
    status: 400,
    code: -1522,
    sysMessage: "FILE_SIZE_TOO_LARGE",
    message: "File vượt quá dung lượng cho phép",
  },
  FILE_TYPE_INVALID: {
    status: 400,
    code: -1523,
    sysMessage: "FILE_TYPE_INVALID",
    message: "Loại file không hợp lệ",
  },
  INVALID_SPORT_TYPE: {
    status: 400,
    code: -1524,
    sysMessage: "INVALID_SPORT_TYPE",
    message: "Môn thể thao không hợp lệ",
  },
  INVALID_LOCATION: {
    status: 400,
    code: -1525,
    sysMessage: "INVALID_LOCATION",
    message: "Vị trí không hợp lệ",
  },
  INVALID_AVATAR: {
    status: 400,
    code: -1526,
    sysMessage: "INVALID_AVATAR",
    message: "Hình đại diện không hợp lệ",
  },
  INVALID_IMAGE: {
    status: 400,
    code: -1527,
    sysMessage: "INVALID_IMAGE",
    message: "Hình ảnh không hợp lệ",
  },
};

export interface IErrorCode {
  code: number;
  message: string;
  sysMessage: string;
}

const ErrorCode = {
  ...SUCCESS_CODE,
  ...SESSION_CODE,
  ...SYSTEM_CODE,
  ...HEADER_CODE,
  ...NOT_FOUND_CODE,
  ...CLIENT_CODE,
};

export default ErrorCode;
