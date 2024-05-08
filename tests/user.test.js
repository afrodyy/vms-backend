const request = require("supertest");
const app = require("../app");

describe("GET /api/v1/user", () => {
  it("Ekspetasi: Menampilkan seluruh data pengguna", async () => {
    const response = await request(app).get("/api/v1/user");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Menampilkan seluruh data pengguna"
    );
    expect(response.body).toHaveProperty("data");
  });
});

describe("POST /api/v1/user", () => {
  it("Ekspetasi: Membuat pengguna baru", async () => {
    const response = await request(app).post("/api/v1/user").send({
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      password: "password123",
      role_id: 2,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Berhasil input data pengguna"
    );
    expect(response.body).toHaveProperty("data");
  });
});

describe("GET /api/v1/user/:id", () => {
  it("Ekspetasi: Menampilkan data pengguna berdasarkan ID", async () => {
    const id = 1;
    const response = await request(app).get(`/api/v1/user/${id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Menampilkan data pengguna"
    );
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id", id);
  });

  it("Ekspetasi: Menampilkan error 404 jika pengguna tidak ditemukan", async () => {
    const id = 999;
    const response = await request(app).get(`/api/v1/user/${id}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      "Data pengguna tidak ditemukan"
    );
  });
});
