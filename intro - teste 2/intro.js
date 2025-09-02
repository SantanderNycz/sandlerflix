// ---------- SANDLERFLIX ANIMATION ---------- //

/*
   _____
  / ____|
 | (___  
  \___ \ 
  ____) |
 |_____/ */
const s_tl = gsap.timeline();
s_tl
  .from("#S1", { scaleX: 0, duration: 0.15 }, 0)
  .from("#S2-base", { scaleY: 0, transformOrigin: "0% 0%", duration: 0.15 }, 0.1)
  .from("#S3", { scaleX: 0, duration: 0.15 }, 0.2)
  .from("#S4-base", { scaleY: 0, transformOrigin: "100% 0%", duration: 0.15 }, 0.3)
  .from("#S5", { scaleX: 0, duration: 0.15 }, 0.4)
  .to("#S2-shadow, #S4-shadow", { opacity: 0, duration: 0.8 }, 0);

/*
      /\
     /  \
    / /\ \
   / ____ \
  /_/    \_\ */
const a_tl = gsap.timeline();
a_tl
  .to("#A1-shadow", { opacity: 0, duration: 0.5 }, 0.3)
  .to("#A3-shadow", { opacity: 0, duration: 1.5 }, 0.3)
  .from("#A4", { scaleX: 0, duration: 0.2 }, 0.5);

/*
  _   _ 
 | \ | |
 |  \| |
 | . ` |
 | |\  |
 |_| \_| */
const n_tl = gsap.timeline();
n_tl
  .to("#N1-shadow", { opacity: 0, duration: 0.5 }, 0.3)
  .to("#N3-shadow", { opacity: 0, duration: 1.5 }, 0.3);

/*
  _____  
 |  __ \ 
 | |  | |
 | |  | |
 | |__| |
 |_____/ */
const d_tl = gsap.timeline();
d_tl
  .to("#D1-shadow", { opacity: 0, duration: 1.2 }, 0.3)
  .to("#D2-shadow", { opacity: 0, duration: 0.8 }, 0.3);

/*
   _      
  | |     
  | |     
  | |     
  | |____ 
  |______|*/
const l_ogShape = "M560 167.5L566 167.781V204.371L560 204.1V167.5Z";
const l_tl = gsap.timeline();
l_tl
  .from("#L1-base", { scaleY: 0, duration: 0.22 }, 0)
  .from(
    "#L2",
    {
      morphSVG: { shape: l_ogShape, type: "linear" },
      opacity: 0,
      duration: 0.1,
    },
    0.2
  )
  .to("#L1-shadow", { opacity: 0, duration: 0.83 });

/*
   ______ 
  |  ____|
  | |__   
  |  __|  
  | |____ 
  |______|*/
const e_ogShape = "M689 171.6V208.2L684.5 208.5L684 172L689 171.6Z";
const e_tl = gsap.timeline();
e_tl
  .from(
    "#E1-base",
    {
      morphSVG: { shape: e_ogShape, type: "linear" },
      opacity: 0,
      duration: 0.15,
    },
    0
  )
  .from(
    "#E2-base",
    { scaleY: 0, transformOrigin: "50% 100%", duration: 0.1 },
    0.11
  )
  .from("#E3", { scaleX: 0, duration: 0.06 }, 0.21)
  .from("#E4", { scaleX: 0, duration: 0.18 }, 0.27)
  .to("#E1-shadow, #E2-shadow", { opacity: 0, duration: 0.8 }, 0);

/*
  _____  
 |  __ \ 
 | |__) |
 |  _  / 
 | | \ \ 
 |_|  \_\*/
const r_tl = gsap.timeline();
r_tl
  .from("#R1-base", { scaleY: 0, duration: 0.2 }, 0)
  .from("#R2", { scaleX: 0, transformOrigin: "0% 50%", duration: 0.2 }, 0.15)
  .from("#R3", { opacity: 0, duration: 0.15 }, 0.3)
  .to("#R1-shadow", { opacity: 0, duration: 0.83 });

/*
   ______ 
  |  ____|
  | |__   
  |  __|  
  | |     
  |_|*/
const f_tl = gsap.timeline();
f_tl
  .from("#F1", { scaleX: 0, duration: 0.15 }, 0)
  .from("#F2-base", { scaleY: 0, duration: 0.33 }, 0.1)
  .from("#F3", { scaleX: 0, duration: 0.15 }, 0.28)
  .to("#F2-shadow", { opacity: 0, duration: 0.86 });

/*
   _      
  | |     
  | |     
  | |     
  | |____ 
  |______|*/
const l2_ogShape = "M989.5 167.5L995 167.781V204.371L989.5 204.1V167.5Z";
const l2_tl = gsap.timeline();
l2_tl
  .from("#L2-1-base", { scaleY: 0, duration: 0.22 }, 0)
  .from(
    "#L2-2",
    {
      morphSVG: { shape: l2_ogShape, type: "linear" },
      opacity: 0,
      duration: 0.1,
    },
    0.2
  )
  .to("#L2-1-shadow", { opacity: 0, duration: 0.83 });

/*
   _____ 
  |_   _|
    | |  
    | |  
   _| |_ 
  |_____|*/
const i_tl = gsap.timeline();
i_tl.from("#I1", { scaleY: 0, transformOrigin: "50% 100%", duration: 0.18 }, 0);

/*
  __   __
  \ \ / /
   \ V / 
    > <  
   / . \ 
  /_/ \_\*/
const x1_ogShape =
  "M1167.1 216.8L1205.5 220.8L1206.5 218.5L1168.5 213.5L1167.1 216.8Z";
const x2_ogShape = "M1171 0L1172 2.5H1211.5L1210.5 0H1171Z";
const x_tl = gsap.timeline();
x_tl
  .from(
    "#X1",
    {
      morphSVG: { shape: x1_ogShape, type: "linear", shapeIndex: 2 },
      duration: 0.63,
    },
    0
  )
  .from("#X1", { opacity: 0, duration: 0.1 }, 0)
  .from(
    "#X2-base",
    {
      morphSVG: { shape: x2_ogShape, type: "linear", shapeIndex: 2 },
      duration: 0.53,
    },
    0.11
  )
  .from("#X2-base", { opacity: 0, duration: 0.01 }, 0.11)
  .to("#X2-shadow", { opacity: 0, duration: 1.3 }, 0);

//Movement Timeline
const movement_tl = gsap.timeline();
movement_tl.from("svg", { opacity: 0, duration: 0.7 }, 0).from(
  "svg",
  {
    xPercent: 50,
    left: "50%",
    duration: 1.9,
    ease: CustomEase.create("custom", "M0,0,C0.358,0.144,0.098,1,1,1"),
  },
  0.7
);

//Exit Timeline
const exit_tl = gsap.timeline();
exit_tl.to("svg", { opacity: 0, duration: 0.5 });

//Master Timeline - adjusted for SANDLERFLIX
const master_tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
master_tl
  .add(movement_tl, 0)
  .add(s_tl, 0.7)
  .add(a_tl, 0.8)
  .add(n_tl, 0.9)
  .add(d_tl, 1.0)
  .add(l_tl, 1.1)
  .add(e_tl, 1.2)
  .add(r_tl, 1.3)
  .add(f_tl, 1.4)
  .add(l2_tl, 1.5)
  .add(i_tl, 1.6)
  .add(x_tl, 1.7)
  .add(exit_tl, 6);

// ---------- UI CONTROLS ---------- //
const theme1 = document.querySelector("#theme1");
const theme2 = document.querySelector("#theme2");
const theme3 = document.querySelector("#theme3");
const themes = document.querySelectorAll(".theme");
const body = document.querySelector("body");

// Colours
const colours = [
  { theme: "#E50914", bg: "black" },         // Classic Netflix
  { theme: "#FFC107", bg: "#333333" },       // Sandler Gold
  { theme: "#4DD0E1", bg: "#01579B" },       // Beach theme (for Adam Sandler comedies)
];

// Setting the OG document colours
for (i = 0; i < themes.length; i++) {
  themes[i].style.backgroundColor = colours[i].theme;
  themes[i].querySelector(".bg-colour").style.background = colours[i].bg;
}

document.documentElement.style.setProperty(
  "--primary-colour",
  colours[0].theme
);
document.documentElement.style.setProperty("--shadow-colour", colours[0].bg);
body.style.backgroundColor = colours[0].bg;

// Adding click events
for (t = 0; t < themes.length; t++) {
  themes[t].addEventListener("click", function () {
    document.documentElement.style.setProperty(
      "--primary-colour",
      this.style.backgroundColor
    );
    document.documentElement.style.setProperty(
      "--shadow-colour",
      this.querySelector(".bg-colour").style.backgroundColor
    );
    body.style.backgroundColor =
      this.querySelector(".bg-colour").style.backgroundColor;
  });
}