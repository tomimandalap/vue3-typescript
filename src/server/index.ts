import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jsonwebtoken from "jsonwebtoken";
import { loadEnv } from "vite";
import { today, thisWeek, thisMonth, Post } from "../data/posts";
import { NewUser, User } from "../utils/constants";

const app = express();
const allPosts = [today, thisWeek, thisMonth];
const allUsers: User[] = [];

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:8000",
  })
);
app.use(cookieParser());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));

const PORT = getEnv("VITE_API_PORT_API") || 8000;
const SECRET = getEnv("VITE_API_SECRET");
const COOKIE = "token-user";

function getEnv(key: string): string {
  let result = loadEnv("", "", key)[key];
  return `${result}`;
}

function authenticate(data: object, req: Request, res: Response) {
  const token = jsonwebtoken.sign({ ...data }, SECRET, {
    issuer: "vuejs-course",
    expiresIn: "1 days",
  });
  res.cookie(COOKIE, token, { httpOnly: true });
}

// service router
app.get("/post", (req, res) => {
  res.status(200).send(allPosts);
});

app.post<{}, {}, Post>("/post", (req, res) => {
  const post = {
    ...req.body,
    id: `${(Math.random() * 100).toFixed()}${Date.now()}`,
  };

  allPosts.push(post);
  res.status(201).send(post);
});

app.post<{}, {}, NewUser>("/sign-up", (req, res) => {
  const user: User = {
    ...req.body,
    id: `${(Math.random() * 100).toFixed()}${Date.now()}`,
  };

  allUsers.push(user);
  const { password, ...data } = user;
  authenticate(data, req, res);
  res.status(201).send({ data });
});

app.get("/user", (req, res) => {
  try {
    const token = req.cookies[COOKIE];
    const result = jsonwebtoken.verify(token, SECRET) as {
      id: string;
      username: string;
    };

    const { id, username } = result;
    res.status(200).send({ id, username });
  } catch (e) {
    res.status(404).end();
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie(COOKIE);
  res.status(200).end();
});

app.post<{}, {}, NewUser>("/sign-in", (req, res) => {
  const { username, password } = req.body;
  const targetuser = allUsers.find((user) => user.username === username);

  if (!targetuser || targetuser.password !== password) res.status(401).end();
  else {
    const { id, username } = targetuser;
    authenticate({ id, username }, req, res);
    res.status(200).end();
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
