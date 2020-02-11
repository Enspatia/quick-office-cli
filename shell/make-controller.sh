#!/usr/bin/env bash
# shellcheck disable=SC2154
mkdir "${directory}${name}"
touch "${directory}${name}/${name}.controller.js"
# shellcheck disable=SC2154
echo "${boilerplate.controller} > ${directory}${name}/${name}.controller.js"
touch "${directory}${name}/${name}.spec.js"
echo "${boilerplate.controllerTests} > ${directory}${name}/${name}.spec.js"
touch "${directory}${name}/${name}.routes.spec.js"
echo "${boilerplate.routesTests} > ${directory}${name}/${name}.routes.spec.js"
touch "${directory}/${name}${name}.validator.js"
echo "${boilerplate.validator} > ${directory}${name}/${name}.validator.js"

#expr evals expressions
#read : reads user input from stdin

#export which has a fundamental effect on the scope of variables.
# In order to really know what's going on with your variables,
# you will need to understand something about how this is used.

#We can source a script via the "." (dot) command:

for (( i = 0; i < n; i++ )); do
    echo $i
done
