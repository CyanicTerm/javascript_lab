const tiles = document.querySelectorAll('.tile')

const timeOut = 10000
let checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'))
let playBtns = Array.from(document.querySelectorAll('.playSoundBtn'))
let recordBtns = Array.from(document.querySelectorAll('.recordSoundBtn'))

const checkbox1 = document.querySelector('#input1')
const playBtn1 = document.querySelector('#playBtn1')
const recordBtn1 = document.querySelector('#recordBtn1')

const allPaths = document.querySelector('#paths')
const addPath = document.querySelector('#addPath')
let pathIndex = 1

const playAllBtn = document.querySelector('#playAllBtn')

let checkboxesChecked = []
const playSelectedBtn = document.querySelector('#playSelectedBtn')

// const loopBtn = document.querySelector('#loopBtn')
const deleteSelectedBtn = document.querySelector('#deleteSelectedBtn')

let recordingTemp = []
let allRecords = []

document.addEventListener('keypress', onKeyPress)

let sound = ''
function onKeyPress(event) {
    const key = event.key
    console.log(key)
    switch (key) {
        case 'q': sound = 'boom'; break;
        case 'w': sound = 'clap'; break;
        case 'e': sound = 'hihat'; break;
        case 'r': sound = 'kick'; break;
        case 't': sound = 'openhat'; break;
        case 'y': sound = 'ride'; break;
        case 'u': sound = 'snare'; break;
        case 'i': sound = 'tom'; break;
        default: sound = 'none'; break;
    }
    playSound(sound)
}

function playSound(sound) {

    if (sound === 'none')
        return
    const audioTag = document.querySelector(`#${sound}`)
    audioTag.currentTime = 0
    audioTag.play()
    if (switchRec === true){
        if(sound === 'tink') return
        recordingTemp.push([Date.now(), sound])
    }
}

function playRecording(recording) {

    const startTimer = recording[1][0]
    let time = 0


    for (i = 1; i < recording.length; i++) {
        time = recording[i][0] - startTimer
        let sound = recording[i][1]
        setTimeout(() => playSound(sound), time)
    }

}

function playAllRecordings() {

    allRecords.forEach((record) => {
        if (record.length > 1) {
            const startTimer = record[1][0]
            let time = 0
            for (i = 1; i < record.length; i++) {
                time = record[i][0] - startTimer
                let sound = record[i][1]
                setTimeout(() => playSound(sound), time)
            }
        }
    })
}

const playSelected = (e) => {

    const tmp = []

    checkboxesChecked.forEach((index) => {
        allRecords.forEach((record) => {
            if (record[0] === index) {
                tmp.push(record)
            }
        })
    })

    tmp.forEach((record) => {

        if (record.length > 1) {

            const startTimer = record[1][0]
            let time = 0

            for (i = 1; i < record.length; i++) {
                time = record[i][0] - startTimer
                let sound = record[i][1]
                setTimeout(() => playSound(sound), time)
            }
        }
    })
}

deleteSelectedBtn.addEventListener('click', () => {
    checkboxesChecked.forEach((index) => {
        allRecords.forEach((record) => {
            if (record[0] === index) {
                allRecords.splice(allRecords.indexOf(record), 1, [index])
                let path = document.querySelector(`#path${index + 1}`)
                if (path === null)
                    return
                path.remove()
            }
        })
    })
})

let switchRec = false
const recordSound = () => {
    if (switchRec === false) {
        switchRec = true
        recordingTemp = []
    }
    else if (switchRec === true)
        switchRec = false
    setTimeout(() => {
        switchRec = false
    }, timeOut)
}

const checkboxClick = (checkbox) => {

    checkbox.addEventListener('click', () => {

        checkboxesChecked = []

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked === true) {
                const index = parseInt(checkbox.id.slice(5)) - 1
                checkboxesChecked.push(index)
            }
        })

    })
}

const playBtnClick = (playBtn) => {

    const index = parseInt(playBtn.id.slice(7)) - 1

    playBtn.addEventListener('click', () => {

        if (allRecords[index].length > 1) {

            playRecording(allRecords[index])
        }
    })
}

const recordBtnClick = (recBtn) => {

    recBtn.addEventListener('click', () => {

        const index = parseInt(recBtn.id.slice(9)) - 1

        recordSound()
        recBtn.style.background = "red";

        setTimeout(() => {
            recBtn.style.background = "grey";



            if (recordingTemp.length > 1) {
                allRecords.splice(index, 1, recordingTemp)
                allRecords[index].splice(0, 0, index)
            }

        }, timeOut)
    })
}

checkboxClick(checkbox1)
playBtnClick(playBtn1)
recordBtnClick(recordBtn1)
allRecords.push([0])


addPath.addEventListener('click', () => {
    pathIndex++

    let newPath = document.createElement('div')
    newPath.setAttribute('id', `path${pathIndex}`)
    newPath.setAttribute('class', 'path')
    paths.insertBefore(newPath, addPath)

    let newInput = document.createElement('input')
    newInput.type = 'checkbox'
    newInput.setAttribute('id', `input${pathIndex}`)
    newPath.appendChild(newInput)
    checkboxes.push(newInput)

    let newPlayBtn = document.createElement('button')
    newPlayBtn.setAttribute('class', 'playSoundBtn btn')
    newPlayBtn.setAttribute('id', `playBtn${pathIndex}`)
    newPath.appendChild(newPlayBtn)
    playBtns.push(newPlayBtn)

    let newRecordBtn = document.createElement('button')
    newRecordBtn.setAttribute('class', 'recordSoundBtn btn')
    newRecordBtn.setAttribute('id', `recordBtn${pathIndex}`)
    newRecordBtn.textContent = 'Rec';
    newPath.appendChild(newRecordBtn)
    recordBtns.push(newRecordBtn)

    checkboxClick(newInput)
    playBtnClick(newPlayBtn)
    recordBtnClick(newRecordBtn)

    allRecords.push([pathIndex - 1])
})

playAllBtn.addEventListener('click', playAllRecordings)
playSelectedBtn.addEventListener('click', playSelected)