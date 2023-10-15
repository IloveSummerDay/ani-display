<script setup>
import NavBar from "./components/NavBar.vue";
import Video from "./components/video.vue";
import WorksSwiper from "./components/WorksSwiper.vue";
import MemberForm from "./components/MemberForm.vue";

</script>

<template>
  <div style="width: 100%;height: 100vh;">
    <Video></Video>
    <div id="bg">
      <NavBar class="navBarComponent"></NavBar>
      <WorksSwiper class="swiperComponent"></WorksSwiper>
    </div>
  </div>
  <MemberForm />
</template>

<style scoped>
.navBarComponent {
  padding-top: 30px;

}

.swiperComponent {
  padding-bottom: 50px;
  padding-top: 40px;
}
</style>
