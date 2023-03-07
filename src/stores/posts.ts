import { reactive, readonly } from "vue";

interface PostsState {
  foo: string;
}

export class PostsStore {
  #state: PostsState;

  constructor() {
    this.#state = reactive<PostsState>({
      foo: "foo",
    });
  }

  getState() {
    return readonly(this.#state);
  }

  updateFoo(payload: string) {
    this.#state.foo = payload;
  }
}

const store = new PostsStore();

export function usePosts() {
  return store;
}
