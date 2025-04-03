#!/bin/bash
set -e

mvn --batch-mode -f packages/icons/pom.xml versions:set versions:commit -DnewVersion=${1}

npm install
sed -i -E "s/(\"@axonivy[^\"]*\"): \"[^\"]*\"/\1: \"~${1/SNAPSHOT/next}\"/" packages/*/package.json
yarn lerna version ${1/SNAPSHOT/next} --no-git-tag-version --no-push --ignore-scripts --exact --yes
npm install
