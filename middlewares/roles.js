const { AccessControl } = require('accesscontrol');

const ac = new AccessControl();
//  creacion de los permisos que tiene cada rol
ac.grant('usuario')
    .updateOwn('usuario')
    .readOwn('usuario')
  	.readAny('producto')
  	.createAny('favorito')
  .grant('admin')
    .extend('usuario')
    .createAny('usuario')
    .readAny('usuario')
    .updateAny('usuario')
    .deleteAny('usuario')
    .createAny('producto')
    .updateAny('producto')  
    .deleteAny('producto')


module.exports = ac;