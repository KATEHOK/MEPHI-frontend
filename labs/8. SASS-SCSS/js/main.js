let numsEl = document.querySelector("#nums");

for (let i = 1; i <= 100; ++i) numsEl.innerHTML += ` <span class="num-${i}">${i}</span>`;