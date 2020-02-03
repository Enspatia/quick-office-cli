let help = require('../src/help');
let makeController = require('../src/make-controller');
module.exports = {
  help : {
    description : 'Prints out the help screen',
    alias : 'h',
    handler : help
  },
  'make-controller' : {
    alias : 'mc',
    params : {
      required : [{
        name : 'name',
        alias : 'n',
        description : 'Name of the controller (lower caps)'
      }],
      optional : []
    },
    handler : makeController,
    description : 'creates directory with the name given and corresponding controller,\n validator and test spec file -[name] The name of the controller '
  },
  'make-route' : {
    description : `Add a route object to the routing table [name] The name of the route -[sub]-[authenticate=true]`
  }
};
