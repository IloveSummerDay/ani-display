<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import videojs from "video.js";
import 'video.js/dist/video-js.css'; // 在 <video></video> 加类名:video-js
import Swiper from 'swiper';
import { storeToRefs } from "pinia";
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import { text_interactive, text_freeze, posters_freeze, posters_interactive } from "../util/intro-text";
import { gsapFadeIn, gsapFadeExit } from "/src/util/gsap.js";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useChoiceStore } from '../stores/choiceStore';
// ref
const modules = ref([Keyboard, Pagination, Navigation])
const ref_swiper = ref(null)
const ref_video = ref([])
const ref_slide = ref([])
const ref_board = ref([])
const ref_poster = ref([])
let players = []
const classify = ref(['interactive', 'freeze'])
const introText_interactive = ref(text_interactive)
const introText_freeze = ref(text_freeze)
const choiceStore = useChoiceStore()
const { choice, interactiveIndex, freezeIndex } = storeToRefs(choiceStore)
let swiper = undefined
let videoPlay = undefined
let posterIndex = undefined
const videoIP = "10.1.83.108" // '10.1.83.108'
const port = 10001


onMounted(() => {
    swiper = initSwiper(0)
    initVideoJS(0)

})
watch(choice, (newVal, oldVal) => {
    if (swiper) {
        if (oldVal) choiceStore.changeFreezeIndex(swiper.activeIndex)
        else choiceStore.changeInteractiveIndex(swiper.activeIndex)
        swiper.destroy();
        swiper = undefined;
    }
    nextTick(() => {
        swiper = initSwiper(newVal);
    })

})
const getVideoURL = (val) => {
    return `http://${videoIP}:${port}/video/${classify.value[choice.value]}/${val}`;
}
const initSwiper = (choice) => {
    console.log("【初始化Swiper】");
    let index = choice ? freezeIndex.value : interactiveIndex.value
    return new Swiper('.swiper', {
        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
        loop: true,
        speed: 300,
        spaceBetween: 0,
        slidesPerView: 1,
        // 将第n个轮播图设置为当前显示，索引为 n-1
        initialSlide: index,
        keyboard: {
            enabled: true
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        modules: modules.value,
        // lazyPreloadPrevNext: 1,

    })
}
const initVideoJS = (classify) => {
    console.log('【initVideoJS】', ref_video.value, ref_video.value.length, classify);
    ref_video.value.forEach((videoId, index) => {
        let player = videojs(videoId, {
            controls: true,
            autoplay: false,
            preload: 'auto',
            html5: true,
            techOrder: ['html5'],
            width: 500,
            height: 300,
            controlBar: {
                skipButtons: {
                    forward: 10,
                    backward: 10,
                }
            },
            // 海报 choice.value ?  '定格' : '交互'
            poster: '',
            loop: true,
        }, () => { console.log('【videoJS初始后】'); })
        player.on('error', function () {
            console.log('【视频加载错误】');
        });
        players.push(player)
    })
}
const handleClickPoster = (e, index) => {
    videoPlay = ref_video.value[index]
    videoPlay.play()
    posterIndex = index
    // ref_video.value[index].play()
    gsapFadeExit(e.target)
}
const handleSwitch = () => {
    if (!videoPlay) return
    videoPlay.pause()
    gsapFadeIn(ref_poster.value[posterIndex])
    posterIndex = undefined
    videoPlay = undefined
}

</script>

<template>
    <div class="box">
        <div class="swiper-button-prev left-btn" @click="handleSwitch"></div>
        <div class="swiper-button-next right-btn" @click="handleSwitch"></div>
        <div class="swiper" ref="ref_swiper">
            <div class="swiper-pagination pagination"></div>
            <div class="swiper-wrapper">
                <div class="swiper-slide" ref="ref_slide"
                    v-for="(el, index) in (choice ? introText_freeze : introText_interactive)" :key="el._id">
                    <div class="video-box">
                        <video controls :src="getVideoURL(el.videoName)" ref="ref_video" preload="auto"
                            class="video-js video-html">
                        </video>
                        <div class="poster" :style="{ backgroundImage: `url(${el.poster})` }"
                            @click.stop="handleClickPoster($event, index)" ref="ref_poster"></div>
                    </div>

                    <div class="intro-board" ref="ref_board">
                        <p class="title">{{ el.title }}<a v-if="el.exeURL ? true : false" class="download-a"
                                :href="el.exeURL" :download="el.exeURL"><img src="../../public/img/download.svg" alt=""
                                    srcset=""></a></p>
                        <p class="author"><span>作者：</span>{{ el.author.join(' ') }}</p>
                        <p class="introduction" :title="el.introduction"><span>作品简介：</span>{{ el.introduction }}</p>
                        <p v-if="el.videoName == 'IP'" class="wuXiaoZhou"><a href="https://b23.tv/AOkLyuA"
                                target="_blank">=>武晓洲个人作品 《BOSS FIGHT》</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url(../assets/css/swiper.css);

.box {
    height: 350px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: relative;
}

/* <video/> */
.video-box {
    width: 40% !important;
    height: 80% !important;
    overflow: hidden;
    position: relative;
}

.video-html,
.video-js {
    /* 上面videojs()初始化了宽高，但是被这里css覆盖了，
        在 <video></video> 的.video-html样式，会被初始化到视频框顶部的盒子
        而不是在 <video></video> 上
    */
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: contain;
    background: transparent;
    z-index: 1;
}

.poster {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    background-size: cover;
    z-index: 10;
}

.intro-board {
    width: 50%;
    height: 80%;
    color: white;
    text-align: left;
    user-select: none;
}

.title {
    font-family: "FZMH";
    font-size: 2rem;
    display: flex;
    align-items: center;
    position: relative;
}

.author {
    font-size: 1rem;

}

.introduction {
    font-size: 1em;
    white-space: break-spaces;
    line-height: 1.4em;

    /* 多行文本溢出盒子显示省略号 */
    /* height: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 7;
    display: -webkit-box;
    -webkit-box-orient: vertical; */

    height: 170px;
    overflow: auto;
    padding-top: 5px;
    border-top: 3px solid #ccc;
}

.wuXiaoZhou a {
    /* text-decoration: none; */
    color: whitesmoke;
    font-family: 'FZMH';
    font-size: 1em;
    position: absolute;
    right: 5%;
    bottom: 10%;
}

.download-a {
    display: inline-block;
    position: absolute;
    right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.download-a:hover {
    opacity: 0.5;
}

.wuXiaoZhou a:hover {
    opacity: 0.8;
}

.intro-board p {
    margin-bottom: 10px;
}


::-webkit-scrollbar-track {
    background-color: #607EB2;
    opacity: 0;
}

::-webkit-scrollbar {
    background-color: #f5f5f5;
    width: 2px;
}

::-webkit-scrollbar-thumb {
    background-color: white;

}
</style>