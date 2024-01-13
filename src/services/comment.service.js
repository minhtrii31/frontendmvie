import api from "./api";
export async function getCommentByMovie(id) {
  try {
    const res = await api.get(`/api/comments/movie/${id}`);
    return res.data;
  } catch (e) {
    throw e;
  }
}
export async function postComment(id, text, user) {
  try {
    const response = await api.post(`/api/comments/add/${id}`, { text, user });
    return response.data;
  } catch (error) {
    console.error("Error posting comment: ", error);
    throw error;
  }
}
