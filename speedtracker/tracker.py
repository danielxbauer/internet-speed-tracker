import csv
import speedtest
from datetime import datetime

def measure_download_speed():
    st = speedtest.Speedtest(secure=True)
    download_mbps = st.download() / 1_000_000  # Convert to Mbps
    return download_mbps

def log_speed(csvFile, speed):
    timestamp = datetime.now().isoformat()
    with open(csvFile, "a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([timestamp, speed])    

if __name__ == "__main__":
    speed = measure_download_speed()
    log_speed("../speed_log.csv", speed)