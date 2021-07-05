<template>
  <div class="gender flex">
    <component class="fill-current pr-1 min-w-min" :is="genderIcon" />
    <span class="capitalize"> {{ type }} </span>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import FemaleIcon from "@/components/icons/FemaleIcon.vue";
import MaleIcon from "@/components/icons/MaleIcon.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import RemoveIcon from "@/components/icons/RemoveIcon.vue";
import { Gender } from "@/types";

export default defineComponent({
  name: "GenderComponent",
  components: {
    FemaleIcon,
    MaleIcon,
    CloseIcon,
    RemoveIcon,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const genderIcon = ref<string>("");

    switch (props.type.toUpperCase()) {
      case Gender.MALE:
        genderIcon.value = "MaleIcon";
        break;
      case Gender.FEMALE:
        genderIcon.value = "FemaleIcon";
        break;
      case Gender.GENDERLESS:
        genderIcon.value = "CloseIcon";
        break;
      default:
        genderIcon.value = "RemoveIcon";
    }

    return {
      genderIcon,
    };
  },
});
</script>
