#!/usr/bin/env python3

import subprocess

# The command you want to run
command = "task active"

# Run the command and capture its output
try:
    output = subprocess.check_output(command, shell=True, text=True)
    lines = output.splitlines()
    active_pos = lines[1].find("Active")
    age_pos = lines[1].find("Age")
    proj_pos = lines[1].find("Project")
    desc_pos = lines[1].find("Description")
    time_string = lines[3][active_pos:age_pos].replace(' ', '')
    proj_string = lines[3][proj_pos:desc_pos].replace(' ', '')
    task_string = lines[3][desc_pos:len(lines[3])]
    print(task_string, "(", proj_string, ") -", time_string)
except subprocess.CalledProcessError as e:
    print("No active task!")
