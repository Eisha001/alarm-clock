const clockEl = document.getElementById("clock")
const getHours = document.getElementById("Hours")
const getMinutes = document.getElementById("Minutes")
const getSeconds = document.getElementById("Seconds")
const ringtone = document.getElementById("ringtone")
const errorEl = document.getElementById("error")
const sound = document.getElementById("sound")
const container = document.getElementById("activeAlarmsContainer")

const DEFAULT_SOUND = "./sound/sound1.m4a"
let alarms = []

function updateClock() {
    clockEl.textContent = new Date().toLocaleTimeString()
}

function getTargetTime(hour, minutes, seconds) {
    const target = new Date()
    target.setHours(hour, minutes, seconds, 0)
    if (target.getTime() <= Date.now()) {
        target.setDate(target.getDate() + 1)
    }
    return target.getTime()
}

function readValue(input) {
    return input.value === "" ? 0 : Number(input.value)
}

function validate(h, m, s) {
    if (getHours.value === "" && getMinutes.value === "" && getSeconds.value === "") {
        return "Enter at least one value."
    }
    if (!Number.isInteger(h) || h < 0 || h > 23) return "Hours must be 0 to 23."
    if (!Number.isInteger(m) || m < 0 || m > 59) return "Minutes must be 0 to 59."
    if (!Number.isInteger(s) || s < 0 || s > 59) return "Seconds must be 0 to 59."
    return ""
}

function saveAlarm() {
    sound.play().then(() => {
        sound.pause()
        sound.currentTime = 0
    }).catch(() => {})

    const hour = readValue(getHours)
    const minutes = readValue(getMinutes)
    const seconds = readValue(getSeconds)

    const problem = validate(hour, minutes, seconds)
    errorEl.textContent = problem
    if (problem) return

    alarms.push({
        hour,
        minutes,
        seconds,
        sound: ringtone.value,
        soundName: ringtone.options[ringtone.selectedIndex].text,
        targetTime: getTargetTime(hour, minutes, seconds)
    })

    renderAlarms()
    persistAlarms()

    getHours.value = ""
    getMinutes.value = ""
    getSeconds.value = ""
}

function stopAlarm() {
    sound.pause()
    sound.currentTime = 0
}

function removeAlarm(index) {
    alarms.splice(index, 1)
    renderAlarms()
    persistAlarms()
}

function renderAlarms() {
    container.innerHTML = ""

    alarms.forEach((alarm, i) => {
        const card = document.createElement("div")
        card.className = "alarm-card"

        const info = document.createElement("div")
        info.className = "alarm-info"
        info.innerHTML = `<span>${new Date(alarm.targetTime).toLocaleTimeString()}</span>
                          <small>${alarm.soundName || "Ringtone 1"}</small>`

        const del = document.createElement("button")
        del.textContent = "Delete"
        del.addEventListener("click", () => removeAlarm(i))

        card.append(info, del)
        container.appendChild(card)
    })
}

function ringAlarm(alarm) {
    sound.src = alarm.sound || DEFAULT_SOUND
    sound.currentTime = 0
    sound.play().catch(() => {})
}

function checkAlarms() {
    const now = Date.now()
    let changed = false

    for (let i = alarms.length - 1; i >= 0; i--) {
        if (now >= alarms[i].targetTime) {
            ringAlarm(alarms[i])
            alarms.splice(i, 1)
            changed = true
        }
    }

    if (changed) {
        renderAlarms()
        persistAlarms()
    }
}

function persistAlarms() {
    localStorage.setItem("vclockAlarms", JSON.stringify(alarms))
}

function loadAlarms() {
    let saved = null
    try {
        saved = JSON.parse(localStorage.getItem("vclockAlarms"))
    } catch (e) {
        saved = null
    }

    if (Array.isArray(saved)) {
        alarms = saved.filter(a => a.targetTime !== undefined && a.targetTime > Date.now())
        renderAlarms()
        persistAlarms()
    }
}

document.getElementById("create").addEventListener("click", saveAlarm)
document.getElementById("stop").addEventListener("click", stopAlarm)

updateClock()
setInterval(() => {
    updateClock()
    checkAlarms()
}, 1000)

loadAlarms()