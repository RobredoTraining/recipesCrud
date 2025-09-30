const request = require("supertest");
const app = require("../app");

describe("Recipes API", () => {
  it("GET /api/recipes should return 200", async () => {
    const res = await request(app).get("/api/recipes");
    expect(res.statusCode).toBe(200);
  });
});
