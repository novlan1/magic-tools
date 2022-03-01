#!/bin/sh
set -eux

isBack=
project=
hostName=
hostPwd=
targetDir=
tarFileName=
mPackName=

function getTarName() {
  tarFileName=${mPackName}.tar.gz
}

function getEnvInfo() {
  eval $2=$(awk -F '=' '$1 == "'$1'"  {print $NF}' \.env\.local)
}


function getMPackName() {
  mPackName=$project
  if [[ "$isBack" == 1 && "$project" != *backend && "$project" != *svr ]];then
    mPackName=${project}-backend
  elif [[ "$isBack" == 0 && "$project" != *frontend ]];then
    mPackName=${project}-frontend
  fi;

  echo $mPackName
}


function getHostInfo() {
  getEnvInfo HOST_NAME hostName
  getEnvInfo HOST_PWD hostPwd
  getEnvInfo DEPLOY_PROJECT project
  
  echo $hostName
  echo $hostPwd
  echo $project
}



function zipFile() {
  if [[ "$isBack" == 0 ]]; then
    cd dist/project/${project}
  fi

  rm -rf ./$tarFileName
  tar --exclude=node_modules --exclude=test --exclude=build.sh -zcvf $tarFileName ./*
}

function getTargtDir() {
  if [[ -n "$targetDir" ]];then return; fi
  if [[ $hostName =~ "155.199" ]];then
      targetDir=/root/watch-to-deploy-dir
  else
      targetDir=/root/guowangyang/watch-to-deploy-dir
  fi
}

function uploadFile() {
  expect -c "
    set timeout 1200;
    spawn scp -P 36000 -r $tarFileName root@$hostName:$targetDir
    expect {
            \"*yes/no*\" {send \"yes\r\"; exp_continue}
            \"*password*\" {send \"$hostPwd\r\";}
            }
  expect eof;"
}

# 参数依次为 isBackEndProject、targetDir
function main() {
  set +u
  isBack=$1
  targetDir=$2
  set -u
  
  getHostInfo
  getMPackName
  getTarName
  getTargtDir
  zipFile
  uploadFile
}

main $@
