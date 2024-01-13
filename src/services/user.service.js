import api from "./api";
export async function getUserByPhone(phone) {
  try {
    const res = await api.get(`/api/users/${phone}`);
    return res.data;
  } catch (e) {
    throw e;
  }
}
export async function getUserByEmail(email) {
  try {
    const res = await api.get(`/api/users/email/${email}`);
    if (res.message === "Không tìm thấy người dùng") {
      return false;
    } else {
      return res.data;
    }
  } catch (e) {
    throw e;
  }
}
export async function login(phone, password) {
  try {
    const res = await api.post("/api/users/login", {
      phone,
      password,
    });

    if (res.data.message === "Đăng nhập thành công") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function logout() {
  try {
    localStorage.removeItem("user");
  } catch (e) {
    console.error(e);
    throw e;
  }
}
export async function register(name, email, phone, password) {
  try {
    const res = await api.post("/api/users/register", {
      name,
      phone,
      password,
      email,
    });
    if (res.data.message === "Đăng ký thành công") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function isEmailValid(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}
export async function updateUser(id, userData) {
  try {
    const res = await api.put(`/api/users/update/${id}`, userData);
    console.log(userData);
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getUserWatchHistory(id) {
  try {
    const res = await api.get(`/api/history/${id}`);
    return res.data;
  } catch (e) {
    throw e;
  }
}
export async function addHistory(movieId, userId) {
  try {
    const res = await api.post(`/api/history`, {
      movieId: movieId,
      userId: userId,
    });
    if (res.data.success === true) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}
