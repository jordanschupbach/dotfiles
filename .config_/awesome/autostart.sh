#!/usr/bin/env bash

function run {
  if ! pgrep $1 :
  then 
    $@&
  fi
}

run "xcompmgr"
run "cd ~/.screenlayout && ./default.sh" # Setup dual screens in proper order
