const apiUrl = process.env.EXPO_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error(
    'Falta EXPO_PUBLIC_API_URL. Define esa variable en mobile/.env (ver .env.example).',
  );
}

export const env = {
  apiUrl,
};
