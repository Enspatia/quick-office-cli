mkdir ${directory}${name}
touch ${directory}${name}/${name}.controller.js
# shellcheck disable=SC2154
echo "${boilerplate.controller}" > ${directory}${name}/${name}.controller.js
touch ${directory}${name}/${name}.spec.js
echo "${boilerplate.controllerTests}" > ${directory}${name}/${name}.spec.js
touch ${directory}${name}/${name}.routes.spec.js
echo "${boilerplate.routesTests}" > ${directory}${name}/${name}.routes.spec.js
touch ${directory}/${name}${name}.validator.js
echo "${boilerplate.validator}" > ${directory}${name}/${name}.validator.js
