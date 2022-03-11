import path from "path";
import supertest from "supertest";
import app from "../index";
import processImg from "../processing";

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe("Test responses from endpoints", (): void => {
  describe("endpoint: /", (): void => {
    it("gets /", async (): Promise<void> => {
      const response: supertest.Response = await request.get("/");
      expect(response.status).toBe(200);
    });
    it("gets /hii endpoint and returns error", async (): Promise<void> => {
      const response: supertest.Response = await request.get("/hii");
      expect(response.status).toBe(404);
    });
  });
  describe("endpoint: /api/images", (): void => {
    it("gets /api/images", async (): Promise<void> => {
      const response: supertest.Response = await request.get("/api/images");
      expect(response.status).toBe(400);
    });
    it("gets /api/images?filename=fjord", async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        "/api/images?filename=fjord"
      );
      expect(response.status).toBe(400);
    });
    it("gets /api/images?filename=fjord&width=700&height=700", async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        "/api/images?filename=fjord&width=700&height=700"
      );
      expect(response.status).toBe(200);
    });
  });
});
describe("Test image processing", (): void => {
  it("should not throw error", async (): Promise<void> => {
    const fullPath = path.join(__dirname, "../../full/");
    const thumbPath = path.join(__dirname, "../../thumb/");
    const param = {
      src: fullPath + "fjord.jpg",
      target: thumbPath + "fjord-200-200.jpg",
      width: 200,
      height: 200,
    };
    expect(async function (): Promise<void> {
      await processImg(param);
    }).not.toThrow();
  });
});
