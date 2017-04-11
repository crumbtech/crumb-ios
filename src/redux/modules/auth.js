export const LOGIN = 'crumb/auth/login';

export const login = () => ({
  type: LOGIN,
});

export default function reducer(state = [], action) {
  switch (action.type) {
    case LOGIN:
      return { logged_in: true };
    default:
      return state;
  }
}
