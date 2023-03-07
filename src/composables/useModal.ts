import { ref, shallowRef } from "vue";
import SignUpForm from "../components/SignUp.vue";
import SignInForm from "../components/SignIn.vue";

const show = ref(false);
const component = shallowRef();

enum stateTYPE {
  SIGNUP = "signUp",
  SIGNIN = "signIn",
}

function selectModal(type: string) {
  switch (type) {
    case stateTYPE.SIGNIN:
      return (component.value = SignInForm);
    case stateTYPE.SIGNUP:
      return (component.value = SignUpForm);
    default:
      return undefined;
  }
}

export function useModal() {
  return {
    show,
    stateTYPE,
    component,
    showModal: (type: stateTYPE.SIGNUP | stateTYPE.SIGNIN) => {
      show.value = true;
      selectModal(type);
    },
    hideModal: (type: stateTYPE.SIGNUP | stateTYPE.SIGNIN) => {
      show.value = false;
      selectModal(type);
    },
  };
}
