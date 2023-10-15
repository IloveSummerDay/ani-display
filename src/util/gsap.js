import { gsap } from "gsap";

const gsapFadeExit = (el) => {
    gsap.to(el, {
        opacity: 0,
        zIndex: -10,
        duration: 2,
    })
}
const gsapFadeIn = (el) => {
    gsap.to(el, {
        opacity: 1,
        zIndex: 10,
        duration: 1,
    })
}
export {
    gsapFadeIn,
    gsapFadeExit,
    
}