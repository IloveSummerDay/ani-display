import { defineStore } from "pinia";

export const useChoiceStore = defineStore('choiceStore', {
    state(){
        return {
            choice: 0, // 0 交互动画swiper
            // 将第n个轮播图设置为当前显示，索引为 n-1
            interactiveIndex: 0, 
            freezeIndex: 0,
        }
    },
    actions: {
        changeChoice(val) {
            this.choice = val
        },
        changeInteractiveIndex(val) {
            this.interactiveIndex = val
        },changeFreezeIndex(val) {
            this.freezeIndex = val
        },
    }
})