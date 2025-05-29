import subprocess

def run(cmd):
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"❌ Error running: {cmd}\n{result.stderr}")
    else:
        print(f"💻 Ran: {cmd}")
    return result

def auto_commit_and_push(csvFile, commitMessage):
    run(f"git add {csvFile}")  # Or "." to add everything
    run(f'git commit -m "{commitMessage}"')
    run("git push origin main")  # Or replace `main` with your branch name

if __name__ == "__main__":
    auto_commit_and_push("speed_log.csv", "feat: Update speed log")