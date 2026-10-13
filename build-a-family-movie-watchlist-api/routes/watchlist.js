import express from "express";
import users from "../data/users.json" with { type: "json" };
import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";
import {
  getWatchlist,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../utils/db.js";

const router = express.Router();

function resolveUserId(param) {
  const user = users.find((u) => String(u.id) === String(param));
  return user ? user.id : param;
}

router.use(authenticate);

router.get("/:userId", (req, res) => {
  const list = getWatchlist(resolveUserId(req.params.userId));

  if (list === null) {
    return res.status(404).json({ error: "User not found." });
  }

  res.status(200).json(list);
});

router.post("/:userId/movies", authorizeModification, (req, res) => {
  const movie = addMovie(resolveUserId(req.params.userId), req.body);

  if (!movie) {
    return res.status(404).json({ error: "User not found." });
  }

  res.status(201).json(movie);
});

router.put("/:userId/movies/:movieId", authorizeModification, (req, res) => {
  const movie = updateMovie(
    resolveUserId(req.params.userId),
    Number(req.params.movieId),
    req.body,
  );

  if (!movie) {
    return res.status(404).json({ error: "Movie not found." });
  }

  res.status(200).json(movie);
});

router.delete("/:userId/movies/:movieId", authorizeModification, (req, res) => {
  const result = deleteMovie(
    resolveUserId(req.params.userId),
    Number(req.params.movieId),
  );

  if (!result) {
    return res.status(404).json({ error: "Movie not found." });
  }

  res.status(200).json({ message: "Movie removed." });
});

export default router;