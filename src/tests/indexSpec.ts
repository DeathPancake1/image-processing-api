import supertest from "supertest";
import app from "../index";

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe("Test responses from endpoints", (): void => {
  describe("endpoint: /", (): void => {
    it("gets /", async (): Promise<void> => {
      const response: supertest.Response = await request.get("/");
      expect(response.status).toBe(200);
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
