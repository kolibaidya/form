import { getAllUsers, getUserById, createUser, updateUser, deleteUser, type CreateUserInput, type UpdateUserInput } from "./db";

const server = Bun.serve({
  port: 3000,
  routes: {
    "/api/health": {
      GET: () => Response.json({ status: "ok", timestamp: new Date().toISOString() }),
    },
    "/api/users": {
      GET: () => {
        const users = getAllUsers();
        return Response.json({ success: true, data: users });
      },
      POST: async (req) => {
        try {
          const body = await req.json() as { forename?: string; surname?: string; username?: string; password?: string };
          const { forename, surname, username, password } = body;

          if (!forename || !surname || !username || !password) {
            return Response.json(
              { success: false, error: "Missing required fields: forename, surname, username, password" },
              { status: 400 }
            );
          }

          const user = createUser({ forename, surname, username, password });
          return Response.json({ success: true, data: user }, { status: 201 });
        } catch (error: any) {
          if (error.message?.includes("UNIQUE constraint failed")) {
            return Response.json(
              { success: false, error: "Username already exists" },
              { status: 409 }
            );
          }
          return Response.json({ success: false, error: error.message }, { status: 500 });
        }
      },
    },
    "/api/users/:id": {
      GET: (req) => {
        const id = Number(req.params.id);
        const user = getUserById(id);
        if (!user) {
          return Response.json({ success: false, error: "User not found" }, { status: 404 });
        }
        return Response.json({ success: true, data: user });
      },
      PUT: async (req) => {
        const id = Number(req.params.id);
        try {
          const body = await req.json() as { forename?: string; surname?: string; username?: string; password?: string };
          const updateData: UpdateUserInput = {};

          if (body.forename !== undefined) updateData.forename = body.forename;
          if (body.surname !== undefined) updateData.surname = body.surname;
          if (body.username !== undefined) updateData.username = body.username;
          if (body.password !== undefined) updateData.password = body.password;

          const user = updateUser(id, updateData);
          if (!user) {
            return Response.json({ success: false, error: "User not found" }, { status: 404 });
          }
          return Response.json({ success: true, data: user });
        } catch (error: any) {
          if (error.message?.includes("UNIQUE constraint failed")) {
            return Response.json(
              { success: false, error: "Username already exists" },
              { status: 409 }
            );
          }
          return Response.json({ success: false, error: error.message }, { status: 500 });
        }
      },
      DELETE: (req) => {
        const id = Number(req.params.id);
        const deleted = deleteUser(id);
        if (!deleted) {
          return Response.json({ success: false, error: "User not found" }, { status: 404 });
        }
        return Response.json({ success: true, message: "User deleted" });
      },
    },
  },
  fetch(req) {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  },
});

console.log(`Server running on http://localhost:${server.port}`);
