import { defineStore } from "pinia";
import { NewUser } from "../utils/constants";

interface IuserState {
  userId?: string;
  userName?: string;
}

export const storeUser = defineStore("users", {
  state: (): IuserState => ({
    userId: undefined,
    userName: undefined,
  }),
  actions: {
    async createUser(newUser: NewUser) {
      const body = JSON.stringify(newUser);

      await window.fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      return this.authenticate();
    },
    async authenticate() {
      const res = await window.fetch("/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      this.userId = result.id;
      this.userName = result.username;
    },
  },
});
