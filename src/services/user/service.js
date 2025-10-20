/** @type {import('./types.d.ts').init} */
export const init = ({ userRepo }) => ({
  findById: async (id) => {
    const user = await userRepo.findById(id);
    if (!user) throw Error('User not found.');

    return user;
  },
});
