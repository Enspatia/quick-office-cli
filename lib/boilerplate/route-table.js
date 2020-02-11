import validate from 'express-validation';
import * as ${name}Controller from '../controllers/${name}/${name}.controller';
import * as ${name}Validator from '../controllers/${name}/${name}.validator';

const routes = [
  { // GET All ${name}s
    method : 'GET',
    name   : '${name}s',
    handler: ${name}Controller.allUsers,
  },
  { // GET Single ${name}s
    method : 'GET',
    name   : '${name}s/:id',
    handler: ${name}Controller.one,
  },
  { // POST (Create) a ${name}
    method : 'POST',
    name   : '${name}s',
    handler: [
      ${name}Controller.create
    ]
  },
  {
    // UPDATE the fields in a particular ${name}
    method : 'PUT',
    name   : '${name}s/:id',
    handler : ${name}Controller.update
  },
  {
    // DELETE ${name} from db
    method : 'DELETE',
    name   : '${name}s/:id',
    handler: ${name}Controller.remove
  }
];

// Export an array with the route Group Name and the routes
module.exports = routes;
