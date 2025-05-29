# Internet Speed Tracker

[![Build](https://github.com/danielxbauer/internet-speed-tracker/actions/workflows/deploy.yml/badge.svg)](https://github.com/danielxbauer/internet-speed-tracker/actions/workflows/deploy.yml)

Just a little fun project to auto track download speed and visualize it into a chart.

## Tracker

### Install

```
cd speedtracker
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
```

### Track

```
python tracker.py
```

### Scheduler

Tracks internet speed every x min, writes it into `speed_log.csv` and auto commits.

```
python speedtracker/Scheduler.py
```

## App

```
cd ./app
npm i
npm run start
```
