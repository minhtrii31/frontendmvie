import api from "./api";
export async function getAllGenres() {
  try {
    const res = await api.get("/api/genres");
    return res.data;
  } catch (e) {
    throw e;
  }
}
export async function getGenreById(genreId) {
  try {
    const res = await api.get(`/api/genres/id/${genreId}`);
    return res.data;
  } catch (e) {
    throw e;
  }
}
