source ~/.zplug/init.zsh

# {{{ zplug examples
# # Make sure to use double quotes
# zplug "zsh-users/zsh-history-substring-search"
#
# # Use the package as a command
# # And accept glob patterns (e.g., brace, wildcard, ...)
# zplug "Jxck/dotfiles", as:command, use:"bin/{histuniq,color}"
#
# # Can manage everything e.g., other person's zshrc
# zplug "tcnksm/docker-alias", use:zshrc
#
# # Disable updates using the "frozen" tag
# zplug "k4rthik/git-cal", as:command, frozen:1
#
# # Grab binaries from GitHub Releases
# # and rename with the "rename-to:" tag
# zplug "junegunn/fzf-bin", \
#     from:gh-r, \
#     as:command, \
#     rename-to:fzf, \
#     use:"*darwin*amd64*"
#
# # Supports oh-my-zsh plugins and the like
# zplug "plugins/git",   from:oh-my-zsh
#
# # Also prezto
# zplug "modules/prompt", from:prezto
#
# # Load if "if" tag returns true
# zplug "lib/clipboard", from:oh-my-zsh, if:"[[ $OSTYPE == *darwin* ]]"
#
# # Run a command after a plugin is installed/updated
# # Provided, it requires to set the variable like the following:
# # ZPLUG_SUDO_PASSWORD="********"
# zplug "jhawthorn/fzy", \
#     as:command, \
#     rename-to:fzy, \
#     hook-build:"make && sudo make install"
#
# # Supports checking out a specific branch/tag/commit
# zplug "b4b4r07/enhancd", at:v1
# zplug "mollifier/anyframe", at:4c23cb60
#
# # Can manage gist file just like other packages
# zplug "b4b4r07/79ee61f7c140c63d2786", \
#     from:gist, \
#     as:command, \
#     use:get_last_pane_path.sh
#
# # Support bitbucket
# zplug "b4b4r07/hello_bitbucket", \
#     from:bitbucket, \
#     as:command, \
#     use:"*.sh"
#
# # Rename a command with the string captured with `use` tag
# zplug "b4b4r07/httpstat", \
#     as:command, \
#     use:'(*).sh', \
#     rename-to:'$1'
#
# # Group dependencies
# # Load "emoji-cli" if "jq" is installed in this example
# zplug "stedolan/jq", \
#     from:gh-r, \
#     as:command, \
#     rename-to:jq
# zplug "b4b4r07/emoji-cli", \
#     on:"stedolan/jq"
# # Note: To specify the order in which packages should be loaded, use the defer
# #       tag described in the next section
#
# # Set the priority when loading
# # e.g., zsh-syntax-highlighting must be loaded
# # after executing compinit command and sourcing other plugins
# # (If the defer tag is given 2 or above, run after compinit command)
# zplug "zsh-users/zsh-syntax-highlighting", defer:2
#
# # Can manage local plugins
# zplug "~/.zsh", from:local
#
# # Load theme file
# zplug 'dracula/zsh', as:theme
#
#
# }}} zplug examples

# {{{ zplug plugins

# {{{ oh-my-zsh plugins

# zplug "plugins/archlinux",   from:oh-my-zsh #Only need on archlinux machines
zplug "plugins/colored-man-pages",   from:oh-my-zsh
zplug "plugins/colorize",   from:oh-my-zsh
zplug "plugins/dirhistory",   from:oh-my-zsh
zplug "plugins/extract",   from:oh-my-zsh
zplug "plugins/git",   from:oh-my-zsh
zplug "plugins/pip",   from:oh-my-zsh
zplug "plugins/reminder",   from:oh-my-zsh
zplug "plugins/taskwarrior",   from:oh-my-zsh
zplug "plugins/tig",   from:oh-my-zsh
zplug "plugins/tmux",   from:oh-my-zsh
zplug "plugins/tmuxinator",   from:oh-my-zsh
zplug "plugins/vi-mode",   from:oh-my-zsh
zplug "plugins/wd",   from:oh-my-zsh
zplug "plugins/z",   from:oh-my-zsh
zplug "plugins/zsh-navigation-tools",   from:oh-my-zsh

# }}} oh-my-zsh plugins

# {{{ github

zplug "zsh-users/fizsh"
zplug "zsh-users/zsh-autosuggestions"
zplug "zsh-users/zsh-syntax-highlighting"
zplug "zsh-users/zsh-completions"
zplug "zsh-users/zsh-history-substring-search"
zplug "zsh-users/zaw"

# }}} zplug plugins

# {{{ theme
# Load theme file
zplug 'eendroroy/alien', as:theme
# }}} theme

# {{{ theme settings
# # Load theme file
# zplug 'dracula/zsh', as:theme
export ALIEN_THEME="red"

#color0=018      # time background color
#color1=226      # normal background color
#color1r=196     # normal error background color
#color2=254      # time foreeground color
#color3=026      # user background color
#color4=254      # user foreground color
#color5=045      # dir background color
#color6=019      # dir foreground color
#color7=238      # vcs background color
#color8=129      # prompt foreground color
#color9=051      # vcs foreground color
#color10=244     # git left-right background color
#color11=255     # git left-right foreground color
#color12=253     # dirty copy background color
#color13=016     # dirty copy foreground color
#color14=245     # venv color

export USE_NERD_FONT=1
# }}} theme settings

# }}} zplug plugins

# {{{ Install plugins if there are plugins that have not been installed
if ! zplug check --verbose; then
    printf "Install? [y/N]: "
    if read -q; then
        echo; zplug install
    fi
fi
# }}} Install plugins if there are plugins that have not been installed

# {{{ Load zplug
zplug load #--verbose
# }}} Load zplug

# {{{ zce
source ~/dotfiles/zce.zsh
bindkey "^Xz" zce
# }}} zce

# {{{ zsh-snippets
alias zsp="zsh_snippets"
bindkey '^S^S' zsh-snippets-widget-expand  # CTRL-S CTRL-S (expand)
bindkey '^S^A' zsh-snippets-widget-list    # CTRL-S CTRL-A (list)
# }}} zsh-snippets

# {{{ Basic Settings
export VISUAL=vim
export EDITOR="$VISUAL"
# export TERM="xterm"

# Set vimpager as pager
export PAGER=vimpager
alias less=$PAGER
alias zless=$PAGER
alias man='man -P vimpager'

# }}} Basic Settings

# {{{ Imports
source ~/dotfiles/tmuxinator.zsh
# source ~/.shell_prompt.sh
# }}} Imports

# {{{ fzf
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

fzf_history() { zle -I; eval $(history | fzf +s | sed 's/ *[0-9]* *//') ; }; zle -N fzf_history; bindkey '^F' fzf_history

fzf_cd() { zle -I; DIR=$(find ${1:-*} -path '*/\.*' -prune -o -type d -print 2> /dev/null | fzf) && cd "$DIR" ; }; zle -N fzf_cd; bindkey '^E' fzf_cd

# }}} fzf

# {{{ config file aliases
alias cfg-awesome="vim ~/.config/awesome/rc.lua"
alias cfg-muttrc="vim ~/.muttrc"
alias cfg-nvim="vim ~/.config/nvim/init.vim"
alias cfg-taskrc="vim ~/.taskrc"
alias cfg-tmuxconf="vim ~/dot_files/.tmux.conf"
alias cfg-vimrc="vim ~/dot_files/.vimrc"
alias cfg-vitrc="vim ~/.vitrc"
alias cfg-zshrc="vim ~/.zshrc"
# }}} config file aliases

# {{{ program aliases
alias c="cmus"
alias e="emacs25 --no-window-system"
alias ipy="ipython"
alias m="mutt"
alias n="nvim"
alias o="okular"
alias r="ranger"
alias t="tmux"
alias v="vim"
#  }}} program aliases

# {{{ User Defined Functions and bindings
cdl() { cd "$@" && ls; }

up-a-directory() {
  emulate -L zsh
  echo
  cd ..
  ls
}

function chpwd() {
    emulate -L zsh
    ls
}

zle -N up-a-directory

bindkey '^k' up-a-directory

# }}} User Defined Functions and bindings

# {{{ Path variables

export PATH=/usr/local/cuda-9.1/bin${PATH:+:${PATH}}

# export LD_LIBRARY_PATH=/usr/local/cuda-9.1/lib64\
#                          ${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}
# export LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:/usr/local/cuda/extras/CUPTI/lib64
LD_LIBRARY_PATH=/usr/local/pgsql/lib:$LD_LIBRARY_PATH

export LD_LIBRARY_PATH

PATH=/usr/local/pgsql/bin:$PATH
export PATH

PATH=/home/jordan/git_repos/dipha/build:$PATH
export PATH

# }}} Path variables

# {{{ Startup commands
archey3
figlet -d ~/git_repos/figlet-fonts/tlf-contrib -f 'rebel' watson | lolcat
# fortune | ponysay
# }}} Startup commands

# {{{ vim modelines
# vim: set foldmethod=marker:
# }}} vim modelines
