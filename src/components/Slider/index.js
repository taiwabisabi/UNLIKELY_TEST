import { createElement, useStates, mounted } from "../../modules/reactlike";
import styles from "./styles.module.scss";

/** @jsx createElement */
export default function Slider() {
  const [states, setStates] = useStates({ count: 1 });
  let slides;
  let images;
  let oldCount = 1;
  let timer;
  let size = null;

  mounted(() => {
    init();
  });

  const init = () => {
    const prevBtn = document.querySelector(".js-prev");
    const nextBtn = document.querySelector(".js-next");
    slides = document.querySelectorAll(".js-slide");
    images = document.querySelectorAll(".js-slide img");
    size = slides[0].offsetWidth + 50;

    prevBtn.addEventListener("click", () => {
      setStates(({ count }) => {
        const newCount = count > 1 ? count - 1 : slides.length;
        setSlide(newCount);
        return {
          count: newCount,
        };
      });
    });

    nextBtn.addEventListener("click", () => {
      setStates(({ count }) => {
        const newCount = count < slides.length ? count + 1 : 1;
        setSlide(newCount);

        return {
          count: newCount,
        };
      });
    });
  };

  const setSlide = (value) => {
    slides = document.querySelectorAll(".js-slide");
    size = slides[0].offsetWidth + 20;

    slides.forEach((slide) => {
      slide.style.transform = `translate3D(${-(value - 1) * size}px, 0, 0)`;
    });

    images.forEach((img) => {
      img.style.transform = `rotateY(${oldCount < value ? "-" : "+"}5deg)`;
    });

    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      images.forEach((img) => {
        img.style.transform = `rotateY(0)`;
      });
    }, 800);

    oldCount = value;
  };

  return (
    <div class={styles.main}>
      <div class={styles.container}>
        <div class={`${styles.slide} js-slide`}>
          <img
            src="https://media-exp1.licdn.com/dms/image/C4D03AQFpvvczNJUQZQ/profile-displayphoto-shrink_800_800/0/1594294478434?e=1618444800&v=beta&t=ZPbuhkhoUQVv7T9wNnR9w07YnkVKMscUZNNbFA8RbVI"
            alt="Laura"
          />
        </div>
        <div class={`${styles.slide} js-slide`}>
          <img
            src="https://media-exp1.licdn.com/dms/image/C4E03AQFs2qkewn3ytw/profile-displayphoto-shrink_800_800/0/1517020565092?e=1618444800&v=beta&t=sRTO5rGzPXlrstehnmuPjJXeNzwpvjUB0n4-pt1tVwU"
            alt="Simon"
          />
        </div>
        <div class={`${styles.slide} js-slide`}>
          <img
            src="https://media-exp1.licdn.com/dms/image/C4D03AQFOabCpVM46lw/profile-displayphoto-shrink_800_800/0/1610400554638?e=1618444800&v=beta&t=94uGN5gSnFNAkoahyJxHw9aH8DhtFsRN6Rbn9VMTSjM"
            alt="Maxime"
          />
        </div>
        <div class={`${styles.slide} js-slide`}>
          <img
            src="https://media-exp1.licdn.com/dms/image/C4D03AQEGm0GULoYdkQ/profile-displayphoto-shrink_800_800/0/1565787627828?e=1618444800&v=beta&t=yP1useGCwFvLsrmsG_Ftzi_WscBz8vg-J4vmK4yH1oE"
            alt="Marion"
          />
        </div>
        <div class={`${styles.slide} js-slide`}>
          <img
            src="https://media-exp1.licdn.com/dms/image/C4D03AQEdVtu-HHjr2A/profile-displayphoto-shrink_800_800/0/1599226725834?e=1618444800&v=beta&t=zSB3EHvoHFZ3uZf2uOWcOvcZTj4i7VmXmdPBvbSt6Oo"
            alt="Veasna"
          />
        </div>
        <div class={`${styles.slide} js-slide`}>
          <img
            src="https://media-exp1.licdn.com/dms/image/C5603AQF7TV_XgGlFgA/profile-displayphoto-shrink_800_800/0/1517409042591?e=1618444800&v=beta&t=b83hvPvVSfLSmeC2sb3YoB3K_GaAdpmJG2qxIAKajQs"
            alt="Bastien"
          />
        </div>
        <div class={`${styles.slide} js-slide`}>
          <img
            src="https://media-exp1.licdn.com/dms/image/C5603AQHYESGSUdJXLg/profile-displayphoto-shrink_800_800/0/1562696285758?e=1618444800&v=beta&t=jSObC1lZbrEDKh9A-Pubt3dAgnl400dHoquWal8IOvM"
            alt="Arnaud"
          />
        </div>
        <div class={`${styles.slide} js-slide`}>
          <img
            src="https://media-exp1.licdn.com/dms/image/C5603AQGF7RlnQy85FA/profile-displayphoto-shrink_800_800/0/1579015798311?e=1618444800&v=beta&t=PH4AvhV8hXCHSqfxSoxcVzQTxnYF-ev8m-pPmNTw50s"
            alt="Bastien"
          />
        </div>
        <div class={`${styles.slide} js-slide`}>
          <img
            src="https://media-exp1.licdn.com/dms/image/C4E03AQGM5Mkzodf7WQ/profile-displayphoto-shrink_800_800/0/1516774162768?e=1618444800&v=beta&t=JKmzb8Sf0qg8HumKR7NU_GGdZF4wtyKzskdOEPxcnyI"
            alt="Raoul"
          />
        </div>
        <div class={`${styles.slide} js-slide`}>
          <img
            src="https://media-exp1.licdn.com/dms/image/C4D03AQHvPpHDVZ_Xnw/profile-displayphoto-shrink_800_800/0/1580573942690?e=1618444800&v=beta&t=wP2wtalM9Lk6knldO6XGivFAGakZIxCWjXdFUe88vyw"
            alt="Tai"
          />
        </div>
      </div>
      <nav class={styles.nav}>
        <span class={styles.counter}>
          {states.count < 10 ? `0${states.count}` : states.count}
        </span>
        <button class={`${styles.button} js-prev`}>Prev</button>
        <button class={`${styles.button} js-next`}>Next</button>
      </nav>
    </div>
  );
}
