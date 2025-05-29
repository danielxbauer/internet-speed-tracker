import schedule
import time
from tracker import test_speed, log_speed

interval = 1 # minutes

def job():
    speed = test_speed()
    log_speed(speed)

schedule.every(interval).minutes.do(job)

print(f"Started speed tracking every {interval} minutes...")
while True:
    schedule.run_pending()
    time.sleep(1)