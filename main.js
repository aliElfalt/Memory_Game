let boxsContainer = document.querySelector(".boxs");
let boxs = document.querySelectorAll(".box");
let Name = document.querySelector(".name");
let btn1 = document.querySelectorAll(".button")[0];
let btn2 = document.querySelectorAll(".button")[1];
let overlay = document.querySelector(".overlay");
let wrongs = document.querySelector(".wrongs");
let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
let newArr = [];
let random;
let current;
let prom;
let clickedBoxs = [];
let wrongTries = 0;

for (let i = 0; i < arr.length;) {
    random = Math.floor(Math.random() * arr.length);
    if (newArr.includes(random)) {
        continue;
    } else {
        current = arr[i];
        [random, current] = [current, random];
        newArr.push(current);
        i++
    }
}

btn1.onclick = function () {
    btn1.style.display = "none";
    overlay.style.display = "none";
    prom = prompt("What's Your Name: ");
    if (prom === null || prom === "") {
        Name.innerHTML = `Hello : Unkown`;
    } else {
        Name.innerHTML = `Hello : ${prom}`;
    }
    for (let i = 0; i < boxs.length; i++) {
        boxs[i].style.cssText = 
        `
            transform: rotateY(-180deg);
            order: ${newArr[i]};
        `;
        setTimeout(() => {
            boxs[i].style.setProperty("transform", "none");
        },2000);
    }
}

btn2.onclick = function () {
    location.reload();
}

for (let i = 0; i < boxs.length; i++) {
    boxs[i].onclick = function () {
        this.classList.add("clicked");
        this.style.setProperty("transform", "rotateY(-180deg)");
        boxs.forEach(box => {
            if (box.classList.contains("clicked")) {
                if (!(clickedBoxs.includes(box))) {
                    clickedBoxs.push(box);
                }
            }
        });
        if (clickedBoxs.length === 2) {
            boxsContainer.classList.add("no-clicking");
            if (clickedBoxs[0].children[1].src !== clickedBoxs[1].children[1].src) {
                clickedBoxs.forEach(clickedBox => {
                    setTimeout(() => {
                        clickedBox.style.setProperty("transform", "none");
                    }, 1000)
                });
                wrongTries += 1;
                wrongs.innerHTML = `Wrong Tries : ${wrongTries}`;
            } else {
                clickedBoxs.forEach(box => {
                    box.classList.add("matched");
                });
            }
            setTimeout(() => {
                boxsContainer.classList.remove("no-clicking");
            }, 1000);
            clickedBoxs.forEach(box => {
                box.classList.remove("clicked");
            });
            clickedBoxs = [];
            console.log("done");
        }
        if (document.querySelectorAll(".matched").length === 20) {
            btn2.style.display = "block";
            overlay.style.display = "block";
        }
    }
}
