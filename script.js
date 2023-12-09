// globals
const choices = ['javascript','fusion360', 'gamedev', 'figma', 'python', 'guitar'];
const historyPicks = ['no-task', 'no-task', 'no-task', 'no-task'];
refreshIconHistory();
const repeatThreshold = 2;
// listeners
const btnEl = document.querySelector('.pickbtn');
btnEl.addEventListener('click', pickContent);

//startup sequence
updateDate();

function setMessageBox(msg) {
    const tgtEl = document.querySelector('#status-msg');
    console.log(`Updating status message to ${msg}`);
    if (typeof msg !== 'string') {
        console.log('New message is not a string, not updating');
    } else {
        tgtEl.innerHTML = msg;
    }
}

function updateDate() {
    let actTime = new Date();
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    actTime = `${actTime.getDate()} of ${monthNames[actTime.getMonth()]} of ${actTime.getFullYear()}`;
    const dateEl = document.getElementById('date-elem');
    dateEl.innerHTML = actTime;
}

function pickContent() {
    while (historyPicks.length >= 4) {
        historyPicks.pop();
    }
    const btnEl = document.querySelector('.pickbtn');
    //modify element with id result to display new choice
    const resultImgEl = document.getElementById('result');
    const randomPick = choice(choices);
    let flagAppend = false;

    //is the pick repeated 2 times before on historyPicks?
    if (historyPicks.length >= repeatThreshold) {
        if (randomPick === historyPicks[0] && randomPick === historyPicks[1]) {
            setMessageBox(
                `The result was ${randomPick}, but you did it ${repeatThreshold} times already`
            );
        } else {
            //add to beggining of historyPicks
            flagAppend = true;
        }
    } else {
        flagAppend = true;
    }
    if (flagAppend) {
        historyPicks.unshift(randomPick);
        refreshIconHistory(randomPick);
        let stringOut = `${randomPick[0].toUpperCase()}${randomPick
            .slice(1)
            .toLowerCase()}`;
        setMessageBox(`You have to study... <strong>${stringOut}</strong> !`);
    }
    //if length is greater than 4 items, delete last items until 4
    console.log(historyPicks);
    resultImgEl.setAttribute('src', `imgs/${randomPick}.png`);
    //update history
}

function refreshIconHistory(pickedItem) {
    console.log(`appending icon to history: ${pickedItem}`);
    //append to div with class gallery-icons
    const galleryIconsEl = document.querySelector('.gallery-icons');
    while (galleryIconsEl.firstChild) {
        galleryIconsEl.removeChild(galleryIconsEl.firstChild);
    }
    historyPicks.forEach((item) => {
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', `imgs/${item}.png`);
        imgEl.setAttribute('class', 'icon');
        galleryIconsEl.appendChild(imgEl);
    });
}

//testing
console.log(choice(choices));

//custom funcs
function choice(arr) {
    if (arr.length === 0) {
        throw new Error('Array cant be empty.');
    } else if (typeof arr === 'object') {
        const rnd = Math.trunc(Math.random() * arr.length);
        return arr[rnd];
    } else {
        throw new Error('Parameter needs to be an array.');
    }
}
