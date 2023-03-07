import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { today, thisWeek, thisMonth, Post } from "../data/posts";

const app = express();
const allPosts = [today, thisWeek, thisMonth];

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

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
