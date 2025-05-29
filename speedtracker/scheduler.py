import schedule
import time
from auto_commit import auto_commit_and_push
from tracker import test_speed, log_speed

interval = 10 # minutes

def trackJob():
    speed = test_speed()
    log_speed(speed)
    
def commitJob():
    auto_commit_and_push()

schedule.every(interval).minutes.do(trackJob)
schedule.every(interval).minutes.do(commitJob)

print(f"Started speed tracking every {interval} minutes...")
while True:
    schedule.run_pending()
    time.sleep(1)