import { getIpAddress } from "./network";

export function getDataLog(req: any) {
  const ip = getIpAddress(req);
  const { originalUrl, method, params, query, body } = req;
  const { token, product, deviceInfo } = req.headers;
  const dataLog = {
    body,
    deviceInfo,
    ip,
    method,
    originalUrl,
    params,
    product,
    query,
    token,
    username: req.user?.username,
    startTime: Date.now(),
  };

  return dataLog;
}
