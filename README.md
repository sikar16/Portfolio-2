#portifolio

cloudlinux-selector install-modules --json --interpreter nodejs --user huludeig --app-root portfolio.huludelala.com/codebase/backend

source /home/huludeig/nodevenv/portfolio.huludelala.com/codebase/backend/20/bin/activate && cd /home/huludeig/portfolio.huludelala.com

/usr/bin/flock -n /tmp/mylockenv.lock ${HOME}/nodevenv/portfolio.huludelala.com/codebase/backend/20/bin/node ${HOME} portfolio.huludelala.com/codebase/backend/app.js>/dev/null 2>&1

ps aux
kill pid[09876678]

git clean -n
git clean -f -d
