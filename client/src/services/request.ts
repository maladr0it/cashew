export class NetworkError extends Error {}
export class ResponseError extends Error {}
export class ApiError extends Error {}

export const request = async <T extends any = undefined>(
  ...args: Parameters<typeof fetch>
) => {
  try {
    const resp = await fetch(...args);
    const respClone = resp.clone(); // used in case we have an unexpected response and need to parse the body as text
    if (!resp.ok) {
      try {
        const data = (await resp.json()) as { errorMessage: string };
        return new ApiError(data.errorMessage);
      } catch (e) {
        return new ApiError(e);
      }
    }
    try {
      const data = (await resp.json()) as T;
      return data;
    } catch (e) {
      const text = await respClone.text();
      if (!text.length) {
        return undefined as T;
      }

      return new ResponseError(e);
    }
  } catch (e) {
    return new NetworkError(e);
  }
};
