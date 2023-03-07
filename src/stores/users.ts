import { defineStore } from "pinia";
import { NewUser } from "../utils/constants";

export const storeUser = defineStore("users", {
  state: () => ({}),
  actions: {
    createUser(newUser: NewUser) {
      const body = JSON.stringify(newUser);

      return window.fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
    },
  },
});
