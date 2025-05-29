# Internet Speed Tracker

[![Build](https://github.com/danielxbauer/internet-speed-tracker/actions/workflows/deploy.yml/badge.svg)](https://github.com/danielxbauer/internet-speed-tracker/actions/workflows/deploy.yml)

Just a little fun project to auto track download speed and visualize it into a chart.

https://danielxbauer.github.io/internet-speed-tracker/

## Tracker

### Install

```
cd tracker
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
```

### Track

Tracks internet speed and writes it into `speed_log.csv`

```
python tracker/tracker.py
```

### Scheduler

Tracks internet speed every x min, writes it into `speed_log.csv` and auto commits.

```
python tracker/scheduler.py
```

## App

```
cd ./app
npm i
npm run start
```
