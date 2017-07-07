# {{{ Document Info
# Filename: .zshrc
# Author: Jordan Schupbach
# Purpose: My zsh config
# Date: 06/02/2017
# }}} Document Info

# {{{ oh-my-zsh import
# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.

export ZSH=$HOME/.oh-my-zsh

# }}} oh-my-zsh import

# {{{ Theme
# Set name of the theme to load. Optionally, if you set this to "random"
# it'll load a random theme each time that oh-my-zsh is loaded.
# See https://github.com/robbyrussell/oh-my-zsh/wiki/Themes
# ZSH_THEME="rkj-repos"
# ZSH_THEME="powerlevel9k"

ZSH_THEME="powerlevel9k/powerlevel9k"
# }}} Theme

# {{{ .oh_my_zsh options?
# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion. Case
# sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=13

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# The optional three formats: "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder
#
#
# }}} .oh_my_zsh options?

# {{{ Load plugins
# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git tig vi-mode tmux tmuxinator colored-man-pages colorize dirhistory zsh-navigation-tools z extract wd reminder taskwarrior)
plugins+=(k)
plugins+=(zsh-dircolors-solarized)
plugins+=(up)
plugins+=(zsh-snippets)

source $ZSH/oh-my-zsh.sh

# }}} Load plugins

# {{{ User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# ssh
# export SSH_KEY_PATH="~/.ssh/rsa_id"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

# }}} User configuration

# {{{ zce
source ~/zce.zsh
bindkey "^Xz" zce
# }}} zce

# {{{ Task todo
# TODO_SAVE_COLOR_FILE=.work_todo_color.sav
# TODO_SAVE_TASKS_FILE=.work_todo.sav
#
# cp .work_default_todo_color.sav .work_todo_color.sav
# cp .work_default_todo.sav .work_todo.sav
#
# alias notodo='TODO_SAVE_TASKS_FILE=.no_todo.sav'
# alias worktodo='TODO_SAVE_TASKS_FILE=.work_todo.sav'
# }}} Task todo

# {{{ zsh-snippets 
alias zsp="zsh_snippets"
bindkey '^S^S' zsh-snippets-widget-expand  # CTRL-S CTRL-S (expand)
bindkey '^S^A' zsh-snippets-widget-list    # CTRL-S CTRL-A (list)
# }}} zsh-snippets 


export VISUAL=vim
export EDITOR="$VISUAL"
source ~/.bin/tmuxinator.zsh
source ~/.shell_prompt.sh
