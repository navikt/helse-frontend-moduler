#!/bin/bash

package_name=$1

mkdir packages/"$package_name"
cp -r scaffolding/* packages/"$package_name"/
rm packages/"$package_name"/create-package.sh
sed -i.bak "s/%NAME/$package_name/g" packages/"$package_name"/webpack.config.js && rm packages/"$package_name"/webpack.config.js.bak
sed -i.bak "s/%NAME/$package_name/g" packages/"$package_name"/package.json && rm packages/"$package_name"/package.json.bak
capitalized_name="$(tr '[:lower:]' '[:upper:]' <<< "${package_name:0:1}")${package_name:1}"
touch packages/"$1"/"$capitalized_name".stories.tsx