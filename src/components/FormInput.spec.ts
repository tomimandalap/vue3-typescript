import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { computed, defineComponent, ref } from "vue";
import FormInput from "./FormInput.vue";

describe("FormInput", () => {
  it.only("test validation", async () => {
    const Parent = defineComponent({
      components: { FormInput },
      template: `
      <FormInput
        v-model="formValue"
        name="Username"
        type="text"
        placeholder="Username"
        :status="status"
      />
      `,
      setup() {
        const formValue = ref("use");
        const status = computed(() => {
          if (formValue.value.length > 5) {
            return { valid: true };
          } else {
            return {
              valid: false,
              message: "error",
            };
          }
        });

        return {
          formValue,
          status,
        };
      },
    });

    const wrapper = mount(Parent);
    expect(wrapper.find(".is-danger").text()).toBe("error");
    await wrapper.find("input").setValue("tomi");
    expect(wrapper.find(".is-danger").exists()).toBe(true);
  });

  it("renders some errors", () => {
    const wrapper = mount(FormInput, {
      props: {
        name: "Username",
        type: "text",
        placeholder: "Username",
        modelValue: "",
        status: {
          valid: false,
          message: "error",
        },
      },
    });

    console.log(wrapper.html());
    expect(wrapper.find(".is-danger").exists()).toBe(true);
  });

  it("renders no errors", () => {
    const wrapper = mount(FormInput, {
      props: {
        name: "Username",
        type: "text",
        placeholder: "Username",
        modelValue: "",
        status: {
          valid: true,
          message: "error",
        },
      },
    });

    console.log(wrapper.html());
    expect(wrapper.find(".is-danger").exists()).toBe(false);
  });
});
