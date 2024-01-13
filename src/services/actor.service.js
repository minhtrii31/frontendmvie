import api from "./api";
export async function getAllActors() {
  try {
    const res = await api.get("/api/actors");
    return res.data;
  } catch (e) {
    throw e;
  }
}
export async function getActorById(actorId) {
  try {
    const response = await api.get(`/api/actors/${actorId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
