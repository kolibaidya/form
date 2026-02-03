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
  getAllPhones,
  getPhoneById,
  createPhone,
  updatePhone,
  deletePhone,
  type CreatePhoneInput,
  type UpdatePhoneInput,
} from "./db";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function addCorsHeaders(response: Response): Response {
  const newHeaders = new Headers(response.headers);
  newHeaders.set("Access-Control-Allow-Origin", "*");
  newHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  newHeaders.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}

const server = Bun.serve({
  port: 3000,
  routes: {
    "/api/health": {
      GET: () => addCorsHeaders(Response.json({ status: "ok", timestamp: new Date().toISOString() })),
    },
    "/api/users": {
      GET: (_req: Request) => addCorsHeaders(Response.json({ success: true, data: getAllUsers() })),
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
            return addCorsHeaders(Response.json(
              {
                success: false,
                error:
                  "Missing required fields: forename, surname, username, password",
              },
              { status: 400 },
            ));
          }

          const user = createUser({ forename, surname, username, password });
          return addCorsHeaders(Response.json({ success: true, data: user }, { status: 201 }));
        } catch (error: any) {
          if (error.message?.includes("UNIQUE constraint failed")) {
            return addCorsHeaders(Response.json(
              { success: false, error: "Username already exists" },
              { status: 409 },
            ));
          }
          return addCorsHeaders(Response.json(
            { success: false, error: error.message },
            { status: 500 },
          ));
        }
      },
    },
    "/api/users/:id": {
      GET: (req: Request & { params: { id: string } }) => {
        const id = Number(req.params.id);
        const user = getUserById(id);
        if (!user) {
          return addCorsHeaders(Response.json(
            { success: false, error: "User not found" },
            { status: 404 },
          ));
        }
        return addCorsHeaders(Response.json({ success: true, data: user }));
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
            return addCorsHeaders(Response.json(
              { success: false, error: "User not found" },
              { status: 404 },
            ));
          }
          return addCorsHeaders(Response.json({ success: true, data: user }));
        } catch (error: any) {
          if (error.message?.includes("UNIQUE constraint failed")) {
            return addCorsHeaders(Response.json(
              { success: false, error: "Username already exists" },
              { status: 409 },
            ));
          }
          return addCorsHeaders(Response.json(
            { success: false, error: error.message },
            { status: 500 },
          ));
        }
      },
      DELETE: (req: Request & { params: { id: string } }) => {
        const id = Number(req.params.id);
        const deleted = deleteUser(id);
        if (!deleted) {
          return addCorsHeaders(Response.json(
            { success: false, error: "User not found" },
            { status: 404 },
          ));
        }
        return addCorsHeaders(Response.json({ success: true, message: "User deleted" }));
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
          return addCorsHeaders(Response.json(
            { success: false, error: "Username and password required" },
            { status: 400 },
          ));
        }
        const user = getUserByUsername(username);
        if (!user) {
          return addCorsHeaders(Response.json(
            { success: false, error: "Invalid username or password" },
            { status: 401 },
          ));
        }
        const isValid = verifyPassword(password, user.password);
        if (!isValid) {
          return addCorsHeaders(Response.json(
            { success: false, error: "Invalid username or password" },
            { status: 401 },
          ));
        }
        return addCorsHeaders(Response.json({
          id: user.id,
          username: user.username,
          forename: user.forename,
          surname: user.surname,
        }));
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
          return addCorsHeaders(Response.json(
            { success: false, error: "Username and password required" },
            { status: 400 },
          ));
        }

        const existingUser = getUserByUsername(username);
        if (existingUser) {
          return addCorsHeaders(Response.json(
            { success: false, error: "Username already exists" },
            { status: 409 },
          ));
        }

        const newUser = createUser({
          forename: username,
          surname: username,
          username,
          password,
        });

        return addCorsHeaders(Response.json({
          id: newUser.id,
          username: newUser.username,
          forename: newUser.forename,
          surname: newUser.surname,
        }));
      },
    },
    "/api/phones": {
      GET: () => addCorsHeaders(Response.json(getAllPhones())),
      POST: async (req: Request) => {
        try {
          const body = (await req.json()) as {
            Brand?: string;
            Name?: string;
            ReleaseDate?: string;
          };
          const { Brand, Name, ReleaseDate } = body;

          if (!Brand || !Name || !ReleaseDate) {
            return addCorsHeaders(Response.json(
              { success: false, error: "Missing required fields: Brand, Name, ReleaseDate" },
              { status: 400 },
            ));
          }

          const phone = createPhone({ Brand, Name, ReleaseDate });
          return addCorsHeaders(Response.json(phone, { status: 201 }));
        } catch (error: any) {
          return addCorsHeaders(Response.json(
            { success: false, error: error.message },
            { status: 500 },
          ));
        }
      },
    },
    "/api/phones/:id": {
      GET: (req: Request & { params: { id: string } }) => {
        const _id = req.params.id;
        const phone = getPhoneById(_id);
        if (!phone) {
          return addCorsHeaders(Response.json(
            { success: false, error: "Phone not found" },
            { status: 404 },
          ));
        }
        return addCorsHeaders(Response.json(phone));
      },
      PUT: async (req: Request & { params: { id: string } }) => {
        const _id = req.params.id;
        try {
          const body = (await req.json()) as {
            Brand?: string;
            Name?: string;
            ReleaseDate?: string;
          };
          const updateData: UpdatePhoneInput = {};

          if (body.Brand !== undefined) updateData.Brand = body.Brand;
          if (body.Name !== undefined) updateData.Name = body.Name;
          if (body.ReleaseDate !== undefined) updateData.ReleaseDate = body.ReleaseDate;

          const phone = updatePhone(_id, updateData);
          if (!phone) {
            return addCorsHeaders(Response.json(
              { success: false, error: "Phone not found" },
              { status: 404 },
            ));
          }
          return addCorsHeaders(Response.json(phone));
        } catch (error: any) {
          return addCorsHeaders(Response.json(
            { success: false, error: error.message },
            { status: 500 },
          ));
        }
      },
      DELETE: (req: Request & { params: { id: string } }) => {
        const _id = req.params.id;
        const deleted = deletePhone(_id);
        if (!deleted) {
          return addCorsHeaders(Response.json(
            { success: false, error: "Phone not found" },
            { status: 404 },
          ));
        }
        return addCorsHeaders(Response.json({ success: true, message: "Phone deleted" }));
      },
    },
  },
  fetch(req: Request) {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }
    return new Response(null, {
      headers: corsHeaders,
    });
  },
});

console.log(`Server running on http://localhost:${server.port}`);
