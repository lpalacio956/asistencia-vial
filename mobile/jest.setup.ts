// env.ts exige EXPO_PUBLIC_API_URL al importarse; en tests no corre la app real, así que lo fijamos aquí.
process.env.EXPO_PUBLIC_API_URL = 'http://localhost:3000';
