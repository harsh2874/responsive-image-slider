// Grab all elements with class "slide" (the images in the carousel).
// querySelectorAll returns a static NodeList (array-like) of DOM nodes.
const slides = document.querySelectorAll(".slide");

// counter keeps track of the currently visible slide index (0-based).
let counter = 0;

// References to the Prev/Next buttons in the DOM. These are used
// so we can enable/disable them and/or attach behavior if needed.
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Position slides side-by-side by setting the `left` CSS property on each
// slide. Each slide is placed at 0%, 100%, 200%, ... so the slides form a
// horizontal strip. We use percentages so the layout scales with the container.
//index in javascript is zero based,means started from 0. So, first image will be at 0%, second at 100%, third at 200% and so on.
slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

/*
 updateNav(): enable/disable navigation buttons based on current index.

 prevBtn.disabled and nextBtn.disabled are the standard HTMLButtonElement
 `disabled` properties. Setting `button.disabled = true` does two things:
  - the button becomes non-interactive (clicks are ignored)
  - the browser applies the disabled appearance and the element gets the
    `disabled` attribute in the DOM.

 Here we set:
  - prevBtn.disabled = true when counter <= 0 (we're at the first slide)
  - nextBtn.disabled = true when counter >= slides.length - 1 (last slide)

 This prevents the user from clicking Prev when there is no previous slide
 (which otherwise caused the carousel to shift into a blank area).
*/
const updateNav = () => {
  if (prevBtn) prevBtn.disabled = counter <= 0;
  if (nextBtn) nextBtn.disabled = counter >= slides.length - 1; //index.html mein 4 images hain. => slides.length === 4.
};

// Move to the previous slide if possible. We guard against going below 0
// so `counter` never becomes negative.
const goPrev = () => {
  if (counter <= 0) return; // already at first slide — do nothing
  counter--; // move index left
  slideImage(); // apply the visual transform
  updateNav(); // update button states (may disable Prev)
};

// Move to the next slide if possible. We guard against going past the
// last index (slides.length - 1) so we don't show blank space.
const goNext = () => {
  if (counter >= slides.length - 1) return; // already at last slide
  counter++; // move index right
  slideImage(); // apply the visual transform
  updateNav(); // update button states (may disable Next)
};

/*
 slideImage(): apply a translateX transform to each slide to shift the
 entire strip left so the desired slide becomes visible.

 Example: if counter === 1, translateX(-100%) moves the strip left by one
 slide width, making the slide at index 1 appear in the viewport.
 We apply the same transform to every slide because they are positioned
 absolutely side-by-side (left: 0%, 100%, 200%, ...). Translating all of
 them creates the sliding effect.
*/
const slideImage = () => {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
};

// initialize the slider's position and nav button states on page load
slideImage();
updateNav();
