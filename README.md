# Alarm Clock

A purple themed alarm clock built from scratch with HTML, CSS and JavaScript during my training at SQI College of ICT.

**Live demo:** 

## Features

- Live clock that updates every second
- Set alarms down to the second (24-hour format)
- Multiple alarms at once, each shown as a card you can delete
- Pick a ringtone for each alarm
- Sound loops until you press Stop
- Input validation with clear error messages (hours 0 to 23, minutes and seconds 0 to 59)
- Alarms are saved in the browser, so they survive a page refresh
- Times that have already passed roll over to the next day

## Built with

- HTML
- CSS (custom properties, flexbox, gradients)
- JavaScript (DOM, Date, setInterval, localStorage)

## How to run

1. Download or clone the repo:
bash
   git clone https://github.com/Eisha001/alarm-clock.git

2. Open `index.html` in your browser.
3. Enter a time, choose a ringtone, and press Create.

## How it works

- One setInterval runs every second. It updates the clock and checks whether any alarm is due.
- Each alarm stores its target time in milliseconds, so checking is a single comparison.
- Alarms are saved with `JSON.stringify` and read back with `JSON.parse` through `localStorage`.

## The hardest part

Making the audio ring. Browsers block sound from playing until the user interacts with the page, so the alarm stayed silent when its time came. The fix was to play and instantly pause the sound when the Create button is clicked. That click counts as interaction, so the browser allows the audio to play later when the alarm fires.

## Known limits

- The page must stay open for alarms to ring.
- Hours use 24-hour format.
- Alarms are stored per browser and per device.
- If a page is refreshed and an old saved alarm fires with no click, some browsers may still block the sound.

## Planned improvements

- Snooze button
- On-screen message when an alarm rings
- AM/PM display
- Edit existing alarms
- Custom label for each alarm

## Author

Badmos Maryam, student at SQI College of ICT
GitHub: [Eisha001](https://github.com/Eisha001)