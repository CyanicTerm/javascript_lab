let recordButton = document.querySelector("")
let isRecording = false;
let tracks = [];

const onKeyPress = event => {
    const key = event.key
    try {
        document.querySelector(`#${key}`).play();
    } catch (error) {
        return;
    }
}
document.addEventListener("keypress", onKeyPress)

function record()
{
    var startDate = Date.now();
    let trackFuck = [];
    
}