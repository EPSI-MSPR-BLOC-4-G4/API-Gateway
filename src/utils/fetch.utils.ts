import { Response } from "express";

const fetchWrapper = async (url: string, options: RequestInit) => {
  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, mergedOptions);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching data");
  }
};

const get = async (url: string) => {
  return fetchWrapper(url, { method: "GET" });
};

const post = async (url: string, body: any) => {
  return fetchWrapper(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

const put = async (url: string, body: any) => {
  return fetchWrapper(url, {
    method: "PUT",
    body: JSON.stringify(body),
  });
};

const del = async (url: string) => {
  return fetchWrapper(url, { method: "DELETE" });
};

const handleRequest = async (promise: Promise<any>, res: Response) => {
  try {
    const data = await promise;
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { fetchWrapper, get, post, put, del, handleRequest };
