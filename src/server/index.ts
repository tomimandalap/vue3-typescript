import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
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

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));

app.get("/post", (req, res) => {
  res.send(allPosts);
});

app.post<{}, {}, Post>("/post", (req, res) => {
  const post = {
    ...req.body,
    id: `${(Math.random() * 100).toFixed()}${Date.now()}`,
  };

  allPosts.push(post);
  res.send(post);
});

app.post<{}, {}, NewUser>("/users", (req, res) => {
  const user: User = {
    ...req.body,
    id: `${(Math.random() * 100).toFixed()}${Date.now()}`,
  };

  allUsers.push(user);

  const { password, ...data } = user;
  res.send({ data });
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
