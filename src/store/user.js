import { reactive } from "vue";

class User {
  debug = false;
  // baseUrl = "http://localhost:8000/auth/";
  baseUrl = "https://socketiowhatsapp.herokuapp.com/auth/";

  state = reactive({
    email: "",
    name: "",
    token: "",
    id: "",
  });
  constructor() {
    const u = JSON.parse(localStorage.getItem("user"));
    if (u) {
      this.state.email = u.email;
      this.state.name = u.name;
      this.state.token = u.token;
      this.state.id = u.id;
      this.log("user fetched from localhost" + u);
    }
  }
  setUser(u) {
    if (u.email) this.state.email = u.email;
    if (u.name) this.state.name = u.name;
    if (u.token) this.state.token = u.token;
    if (u.id) this.state.id = u.id;
    localStorage.setItem("user", JSON.stringify({ ...this.state }));
    this.log("set user done with value", u);
  }
  signOut() {
    this.state.email = "";
    this.state.name = "";
    this.state.token = "";
    this.state.id = "";
    localStorage.removeItem("user");

    this.log("user cleared");
  }
  async signIn(form) {
    const response = await fetch(this.baseUrl + "signin/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form }),
    });

    if (!response.ok) {
      const error = await response.json();
      this.log("signIn error " + error.message);
      return Promise.reject(new Error(error.message));
    }
    const u = await response.json();
    this.setUser(u);
  }
  async signUp(form) {
    const response = await fetch(this.baseUrl + "signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form }),
    });
    if (!response.ok) {
      const error = await response.json();
      this.log("signup error ", error.message);
      return Promise.reject(new Error(error.message));
    }
    const u = await response.json();
    this.setUser(u);
  }
  async update(form) {
    const response = await fetch(this.baseUrl + "update", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form }),
    });
    if (!response.ok) {
      const error = await response.json();
      this.log("update error ", error.message);
      return Promise.reject(new Error(error.message));
    }
    const u = await response.json();
    this.setUser(u);
  }

  log(data) {
    if (this.debug) {
      console.log("debug log from user store");
      console.log(data);
    }
  }
}
const user = new User();
export { user };
