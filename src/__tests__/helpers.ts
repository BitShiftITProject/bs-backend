import {Users} from "../models/index";

/**
 * Generate a complete Users object for use with tests.
 * @param user A partial (or complete) Users object.
 */
export function givenUser(user?: Partial<Users>) {
  const data = Object.assign(
    {
      first_name: 'Stephen',
      last_name: 'Curry',
      cognito_id: 'arandomcognitoid',
      email: 'stephcurry@nba.com',
      portfolios: ['random1', 'random2'],
    },
    user,
  );
  return new Users(data);
}
