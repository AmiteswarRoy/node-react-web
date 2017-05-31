import { users } from './data.json';

const simplifyUsers = collection => collection
  .map(({ user, seed }) => ({ ...user, seed }))
  .map(({ email, name, seed, picture }) => ({ email, name, seed, picture }));

function routes(router) {
  router.get('/users', (ctx) => {
    console.log('1111119999999998888');
    ctx.body = simplifyUsers(users.slice(0, 10));
  });

  router.get('/users/:seed', (ctx) => {
    const { seed } = ctx.params;
    const [ result ] = simplifyUsers(users.filter(user => user.seed === seed));

    if (!result) {
      ctx.body = { error: { message: 'User not found' } };
    } else {
      ctx.body = result;
    }
  });

  router.post('/users', (ctx) => {
    console.log('9999999999999');
    console.log(ctx.request.body.content.filename);
    // ctx.request.body will contain the post body
    //const body = ctx.request.body;
    //ctx.body = body.users;
  });
}

// can't export directly function, run into const issue
// see: https://phabricator.babeljs.io/T2892
export default routes;
