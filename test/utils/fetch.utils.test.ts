import {
  fetchWrapper,
  get,
  post,
  put,
  del,
  handleRequest,
} from "../../src/utils/fetch.utils";
import { Response } from "express";

global.fetch = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
});

describe("fetchWrapper", () => {
  const url = "https://example.com/data";
  const mockData = { key: "value" };

  it("should return data on a successful fetch", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });
    const result = await fetchWrapper(url, { method: "GET" });
    expect(result).toEqual(mockData);
  });

  it("should throw an error on a non-ok response", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });
    await expect(fetchWrapper(url, { method: "GET" })).rejects.toThrow(
      "Error fetching data"
    );
  });

  it("should throw an error on fetch failure", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));
    await expect(fetchWrapper(url, { method: "GET" })).rejects.toThrow(
      "Error fetching data"
    );
  });
});

describe("HTTP methods", () => {
  const url = "https://example.com/data";
  const mockData = { key: "value" };

  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });
  });

  it("get should call fetchWrapper with GET method", async () => {
    await get(url);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  });

  it("post should call fetchWrapper with POST method and body", async () => {
    await post(url, mockData);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: "POST",
      body: JSON.stringify(mockData),
      headers: { "Content-Type": "application/json" },
    });
  });

  it("put should call fetchWrapper with PUT method and body", async () => {
    await put(url, mockData);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: "PUT",
      body: JSON.stringify(mockData),
      headers: { "Content-Type": "application/json" },
    });
  });

  it("del should call fetchWrapper with DELETE method", async () => {
    await del(url);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  });
});

describe("handleRequest", () => {
  let mockRes: Response;

  beforeEach(() => {
    mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
  });

  const mockData = { key: "value" };

  it("should send data on successful request", async () => {
    await handleRequest(Promise.resolve(mockData), mockRes);
    expect(mockRes.json).toHaveBeenCalledWith(mockData);
  });

  it("should send 500 on request failure", async () => {
    await handleRequest(Promise.reject(new Error("Error")), mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Internal Server Error",
    });
  });
});
