import { Server } from "http";
import { checkPort } from "../src/app";

describe("App Environment Variables", () => {
  let originalEnv: NodeJS.ProcessEnv;
  let logSpy: jest.SpyInstance;
  let listenSpy: jest.SpyInstance;

  beforeEach(() => {
    // originalEnv = { ...process.env };
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    listenSpy = jest
      .spyOn(Server.prototype, "listen")
      .mockImplementation(function (this: Server, port, callback) {
        if (callback) callback();
        return this;
      });
  });

  afterEach(() => {
    // process.env = originalEnv;
    logSpy.mockRestore();
    listenSpy.mockRestore();
    jest.resetModules(); // Reset modules to clean up any module-level state
  });

  it("should throw an error if PORT is not specified", () => {
    const originalPort = process.env.PORT;
    delete process.env.PORT;

    expect(() => {
      checkPort();
    }).toThrow("No port value specified...");

    // Restore the original PORT value
    process.env.PORT = originalPort;
  });

  it("should start the server if NODE_ENV is not test", () => {
    process.env.NODE_ENV = "development";
    process.env.PORT = "3000";

    // Use jest.isolateModules to load the app module in isolation
    jest.isolateModules(() => {
      require("../src/app"); // Re-import the app to apply the new environment variables
    });

    expect(listenSpy).toHaveBeenCalledWith(3000, expect.any(Function));
    expect(logSpy).toHaveBeenCalledWith("Server is listening on port 3000");
  });

  it("should not start the server if NODE_ENV is test", () => {
    process.env.NODE_ENV = "test";
    process.env.PORT = "3000";

    // Use jest.isolateModules to load the app module in isolation
    jest.isolateModules(() => {
      require("../src/app"); // Re-import the app to apply the new environment variables
    });

    expect(listenSpy).not.toHaveBeenCalled();
  });
});
