# Internet Speed Tracker

[![Build](https://github.com/danielxbauer/internet-speed-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/danielxbauer/internet-speed-tracker/actions/workflows/ci.yml)

Just a little fun project to auto track download speed and visualize it into a chart.

## Tracker

### Install

```
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
```

### Track

```
python speedtracker/tracker.py
```

### Scheduler

Tracks internet speed every 10 min, writes it into `speed_log.csv` and auto commits.

```
python speedtracker/Scheduler.py
```

## Website

```
cd ./speedweb
npm i
npm run dev
```
