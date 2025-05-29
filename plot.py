import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("speed_log.csv", names=["timestamp", "download"])
df["timestamp"] = pd.to_datetime(df["timestamp"])

plt.plot(df["timestamp"], df["download"], marker='o')
plt.title("Download Speed Over Time")
plt.xlabel("Time")
plt.ylabel("Speed (Mbps)")
plt.grid(True)
plt.tight_layout()
plt.show()