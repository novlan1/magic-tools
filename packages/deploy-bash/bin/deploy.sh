#!/bin/sh
set -eux

isBack=0
DEPLOY_PROJECT=

DEPLOY_HOST_NAME=
DEPLOY_HOST_PWD=
DEPLOY_TARGET_DIR=

tarFileName=
mPackName=

function getTarName() {
  tarFileName=${mPackName}.tar.gz
}

function getEnvInfo() {
  eval $2=$(awk -F '=' '$1 == "'$1'"  {print $NF}' \.env\.local)
}


function getMPackName() {
  mPackName=$DEPLOY_PROJECT
  if [[ "$isBack" == 1 && "$DEPLOY_PROJECT" != *backend && "$DEPLOY_PROJECT" != *svr ]];then
    mPackName=${DEPLOY_PROJECT}-backend
  elif [[ "$isBack" == 0 && "$DEPLOY_PROJECT" != *frontend && "$DEPLOY_PROJECT" != *web ]];then
    mPackName=${DEPLOY_PROJECT}-frontend
  fi;

  echo $mPackName
}


function getDeployVars() {
  getEnvInfo DEPLOY_HOST_NAME DEPLOY_HOST_NAME
  getEnvInfo DEPLOY_HOST_PWD DEPLOY_HOST_PWD
  getEnvInfo DEPLOY_PROJECT DEPLOY_PROJECT
  getEnvInfo DEPLOY_TARGET_DIR DEPLOY_TARGET_DIR
  
  
  echo $DEPLOY_HOST_NAME
  echo $DEPLOY_HOST_PWD
  echo $DEPLOY_TARGET_DIR
  echo $DEPLOY_PROJECT
}



function zipFile() {
  if [[ "$isBack" == 0 ]]; then
    cd dist/project/${DEPLOY_PROJECT}
  fi

  rm -rf ./$tarFileName
  
  if [[ "$isBack" == 0 ]]; then
    tar --exclude=node_modules --exclude=test --exclude=build.sh -zcvf $tarFileName ./*
  else
    tar --exclude=node_modules --exclude=test --exclude=build.sh -zcvf $tarFileName ./* .env.local
  fi
}

# function getTargtDir() {
#   if [[ -n "$DEPLOY_TARGET_DIR" ]];then return; fi
#   if [[ $DEPLOY_HOST_NAME =~ "155.199" ]];then
#       DEPLOY_TARGET_DIR=/root/watch-to-deploy-dir
#   else
#       DEPLOY_TARGET_DIR=/root/guowangyang/watch-to-deploy-dir
#   fi
# }

function uploadFile() {
  expect -c "
    set timeout 1200;
    spawn scp -P 36000 -r $tarFileName root@$DEPLOY_HOST_NAME:$DEPLOY_TARGET_DIR
    expect {
            \"*yes/no*\" {send \"yes\r\"; exp_continue}
            \"*password*\" {send \"$DEPLOY_HOST_PWD\r\";}
            }
  expect eof;"
}

# 参数依次为 isBackEndProject、targetDir
function main() {
  set +u
  isBack=${1-$isBack}
  set -u
  
  getDeployVars
  getMPackName
  getTarName
  # getTargtDir
  zipFile
  uploadFile
}

main $@
