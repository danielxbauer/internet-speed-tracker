from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from auto_commit import auto_commit_and_push
from tracker import log_speed, measure_download_speed

csvFile = "../speed_log.csv"

def timeNow():
    return datetime.now().strftime("%H:%M:%S")

def trackJob():
    print(f"[{timeNow()}] 🚀 Start Speedtest")
    speed = measure_download_speed()
    print(f'[{timeNow()}] 🚀 Download Speed: {speed:.2f} Mbps')
    log_speed(csvFile, speed)
    print(f"[{timeNow()}] 🆙 Run auto commit")
    auto_commit_and_push(csvFile, "feat: Update speed log")
    
scheduler = BackgroundScheduler()
job = scheduler.add_job(trackJob, 'cron', minute='*/1')

scheduler.start()

print("🟢 Scheduler started. Press ENTER to stop.")
print(f"⏭️ Next Speedtest: {job.next_run_time}")
input()
scheduler.shutdown()
print("🔴 Scheduler stopped.")
