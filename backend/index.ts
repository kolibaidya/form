declare const Bun: any;
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  type CreateUserInput,
  type UpdateUserInput,
  verifyPassword,
  getUserByUsername,
} from "./db";

const server = Bun.serve({
  port: 3000,
  routes: {
    "/api/health": {
      GET: () =>
        Response.json({ status: "ok", timestamp: new Date().toISOString() }),
    },
    "/api/users": {
      GET: (_req: Request) => {
        const users = getAllUsers();
        return Response.json({ success: true, data: users });
      },
      POST: async (req: Request) => {
        try {
          const body = (await req.json()) as {
            forename?: string;
            surname?: string;
            username?: string;
            password?: string;
          };
          const { forename, surname, username, password } = body;

          if (!forename || !surname || !username || !password) {
            return Response.json(
              {
                success: false,
                error:
                  "Missing required fields: forename, surname, username, password",
              },
              { status: 400 },
            );
          }

          const user = createUser({ forename, surname, username, password });
          return Response.json({ success: true, data: user }, { status: 201 });
        } catch (error: any) {
          if (error.message?.includes("UNIQUE constraint failed")) {
            return Response.json(
              { success: false, error: "Username already exists" },
              { status: 409 },
            );
          }
          return Response.json(
            { success: false, error: error.message },
            { status: 500 },
          );
        }
      },
    },
    "/api/users/:id": {
      GET: (req: Request & { params: { id: string } }) => {
        const id = Number(req.params.id);
        const user = getUserById(id);
        if (!user) {
          return Response.json(
            { success: false, error: "User not found" },
            { status: 404 },
          );
        }
        return Response.json({ success: true, data: user });
      },
      PUT: async (req: Request & { params: { id: string } }) => {
        const id = Number(req.params.id);
        try {
          const body = (await req.json()) as {
            forename?: string;
            surname?: string;
            username?: string;
            password?: string;
          };
          const updateData: UpdateUserInput = {};

          if (body.forename !== undefined) updateData.forename = body.forename;
          if (body.surname !== undefined) updateData.surname = body.surname;
          if (body.username !== undefined) updateData.username = body.username;
          if (body.password !== undefined) updateData.password = body.password;

          const user = updateUser(id, updateData);
          if (!user) {
            return Response.json(
              { success: false, error: "User not found" },
              { status: 404 },
            );
          }
          return Response.json({ success: true, data: user });
        } catch (error: any) {
          if (error.message?.includes("UNIQUE constraint failed")) {
            return Response.json(
              { success: false, error: "Username already exists" },
              { status: 409 },
            );
          }
          return Response.json(
            { success: false, error: error.message },
            { status: 500 },
          );
        }
      },
      DELETE: (req: Request & { params: { id: string } }) => {
        const id = Number(req.params.id);
        const deleted = deleteUser(id);
        if (!deleted) {
          return Response.json(
            { success: false, error: "User not found" },
            { status: 404 },
          );
        }
        return Response.json({ success: true, message: "User deleted" });
      },
    },
    "/api/auth/login": {
      POST: async (req: Request) => {
        const body = (await req.json()) as {
          username?: string;
          password?: string;
        };
        const { username, password } = body;

        if (!username || !password) {
          return Response.json(
            { success: false, error: "Username and password required" },
            { status: 400 },
          );
        }
        const user = getUserByUsername(username);
        if (!user) {
          return Response.json(
            { success: false, error: "Invalid username or password" },
            { status: 401 },
          );
        }
        const isValid = verifyPassword(password, user.password);
        if (!isValid) {
          return Response.json(
            { success: false, error: "Invalid username or password" },
            { status: 401 },
          );
        }
        return Response.json({
          id: user.id,
          username: user.username,
          forename: user.forename,
          surname: user.surname,
        });
      },
    },
    "/api/auth/register": {
      POST: async (req: Request) => {
        const body = (await req.json()) as {
          username?: string;
          password?: string;
          email?: string;
        };
        const { username, password, email } = body;

        if (!username || !password) {
          return Response.json(
            { success: false, error: "Username and password required" },
            { status: 400 },
          );
        }

        const existingUser = getUserByUsername(username);
        if (existingUser) {
          return Response.json(
            { success: false, error: "Username already exists" },
            { status: 409 },
          );
        }

        const newUser = createUser({
          forename: username,
          surname: username,
          username,
          password,
        });

        return Response.json({
          id: newUser.id,
          username: newUser.username,
          forename: newUser.forename,
          surname: newUser.surname,
        });
      },
    },
  },
  fetch(req: Request) {
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
