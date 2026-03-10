#!/bin/bash
set -e
if [ $# -ne 1 ]; then
    cat <<EOF
Provide version as the first argument as in 'npm version', for example 'minor'.
See http://semver.org/

EOF
    exit 2
fi

VERSION=$1

npm version "$VERSION" --no-git-tag-version
npm run build

npx publish-to-git --tag v$VERSION
