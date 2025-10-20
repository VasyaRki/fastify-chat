import { sessions } from '../../utils/sessions/util.js';
import { exception } from '../../utils/exception/util.js';
import { passwords } from '../../utils/passwords/util.js';

/** @type {import('./types.d.ts').init} */
export const init = ({ userRepo }) => ({
  signIn: async (email, password) => {
    const user = await userRepo.findOne({ email });
    if (!user) throw exception.badRequest('Wrong credentials.');
    const validPassword = passwords.compare(password, user.password);
    if (!validPassword) throw exception.badRequest('Wrong credentials.');

    return sessions.generate(user);
  },

  signUp: async (email, username, password) => {
    const emailExist = await userRepo.findOne({ email });
    if (emailExist) throw exception.badRequest('Email already in use.');
    const usernameExist = await userRepo.findOne({ username });
    if (usernameExist) throw exception.badRequest('Username already in use.');

    const user = await userRepo.create({
      email,
      username,
      password: passwords.hash(password),
    });

    return sessions.generate(user);
  },

  verify: async (token, access = 'common') => {
    try {
      if (!token) throw exception.unauthorized('No token provided.');
      const payload = await sessions.validate(token);
      if (!payload.id) throw exception.unauthorized('Invalid token payload.');
      const user = await userRepo.findOne({ id: payload.id });
      if (!user) throw exception.unauthorized('User not found.');

      return { user, token };
    } catch (err) {
      if (exception.isCustomException(err)) throw err;
      console.log('Resolve Session error', err);
      throw exception.unauthorized();
    }
  },
});
