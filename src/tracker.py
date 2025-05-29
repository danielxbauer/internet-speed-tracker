import csv
import speedtest
from datetime import datetime

def test_speed():
    st = speedtest.Speedtest()
    download_mbps = st.download() / 1_000_000  # Convert to Mbps
    return download_mbps

def log_speed(download_speed):
    timestamp = datetime.now().isoformat()
    with open("speed_log.csv", "a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([timestamp, download_speed])
    print(f"[{timestamp}] Download: {download_speed:.2f} Mbps")

if __name__ == "__main__":
    speed = test_speed()
    log_speed(speed)