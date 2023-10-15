<script setup>
import { ref } from 'vue'
// ref

</script>

<template>
    <div class="bg">
        <p>创作：21数字媒体技术专业</p>
        <p>海报设计：张思琪 吴可颖 赵娜娜 网页设计：张洛 陈晖 吴可颖</p>
        <p>指导老师：马同庆</p>
        <p class="badge">
            <img src="/public/img/memberIntro/校徽.png" style="margin-right: 20px;">
            <img src="/public/img/memberIntro/院徽.png" style="margin-left: 20px;">
        </p>
    </div>
</template>

<style scoped>
.bg {
    height: 9rem;
    background-color: #F4EAD2;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

p {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "FZMH";
    font-size: 1rem;
    padding-top: 10px;
}
.badge img{
    width: 200px;
    height: auto;
    display: inline-block;
    margin-right: 10px;
}
.badge {
    display: flex;
    justify-content: center;
    align-items: center;
    
}

</style>