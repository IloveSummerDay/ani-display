<script setup>
import { ref, onMounted } from 'vue'
// ref
const ref_video = ref(null)
const isPlaying = ref(false)
const canPause = ref(true)

onMounted(() => {
})
const handleEnter = () => {
    if (!isPlaying.value && canPause.value) {
        ref_video.value.play()
          .then(() => {
            isPlaying.value = true;
            canPause.value = true;
          })
      }
}
const handleLeave = () => {
    if (isPlaying.value && canPause.value) {
        ref_video.value.pause();
        isPlaying.value = false;
        canPause.value = true;
      }
}
</script>

<template>
    <div style="position: relative;width: 100%;height: 199px;overflow: hidden;" @mouseenter="handleEnter" @mouseleave="handleLeave">
        <video src="/mp4/sea.mp4" type="video/mp4" muted="true" playsinline="true" loop height="202"
            ref="ref_video">
        </video>
        <img src="/public/img/title/title.png" class="title">
        <p class="tip">
            
            <!-- <p>交互动画设计小学期</p>
            <p>优秀作品展</p> -->
        </p>
        <div class="intro">
            作品：《海韵》 作者：陈晖 何闻涛
        </div>
    </div>
</template>

<style scoped>
.tip {
    font-family: "FZMH";
    font-size: 30px;
    color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%);
    text-align: center;
    opacity: 0.5;
    
}
.title{
    width: 13rem;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.7;
}
.intro{
    position: absolute;
    bottom: 0;
    right: 0;
    font-family: "FZMH";
    font-size: 1rem;
    color: white;
    opacity: 0.8;
}
</style>