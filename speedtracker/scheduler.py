from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from auto_commit import auto_commit_and_push
from tracker import log_speed, test_speed

def trackJob():
    print(f"🚀 Run speedtest at {datetime.now()}")
    speed = test_speed()
    log_speed(speed)
    
def commitJob():
    print(f"🆙 Run auto commit at {datetime.now()}")
    auto_commit_and_push()

scheduler = BackgroundScheduler()
job = scheduler.add_job(trackJob, 'cron', minute='*/1')
scheduler.add_job(commitJob, 'cron', minute='0,10,20,30,40,50')

scheduler.start()

print("Scheduler started. Press ENTER to stop.")
print(f"Next track: {job.next_run_time}")
input()
scheduler.shutdown()
print("Scheduler stopped.")
