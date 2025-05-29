import csv
import speedtest
from datetime import datetime
import time

def measure_download_speed(max_retries=3, delay_between_retries=2):
    for attempt in range(1, max_retries + 1):
        try:            
            st = speedtest.Speedtest()
            st.get_best_server()            

            print("Measuring download speed...")
            download_speed_bps = st.download()
            download_speed_mbps = round(download_speed_bps / 1_000_000, 2)  # Convert to Mbps and round
            print(f"Download speed: {download_speed_mbps} Mbps")
            return download_speed_mbps

        except speedtest.SpeedtestBestServerFailure as e:
            print(f"Attempt {attempt} failed: {e}")
            if attempt == max_retries:
                print("All attempts failed. Raising exception.")
                raise
            else:
                print(f"Retrying in {delay_between_retries} seconds...")
                time.sleep(delay_between_retries)

def log_speed(csvFile, speed):
    timestamp = datetime.now().isoformat()
    with open(csvFile, "a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([timestamp, speed])    

if __name__ == "__main__":
    print("Measuring download speed...")
    speed = measure_download_speed()
    print(f"Download speed: {speed:.2f} Mbps")
    log_speed("speed_log.csv", speed)