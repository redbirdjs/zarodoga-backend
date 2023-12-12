# Használati utasítás

## Telepítés

```
npm install && npx prisma migrate dev --name init
```

## Elindítás

```
Developer mode: npm run dev
Production mode: npm start
```

# Nagyon remélem, hogy minden működik

# .env

.env tartalmazza a fontos titkosított adatokat.
A `.env.example` fájl tartalmazza az összes szükséges környezeti változót.

Nevezze át a `.env.example` fájlt `.env`-re és írja be a megfelelő adatokat.

DATABASE_URL - Adatbázis kapcsolathoz szükséges URL
PORT - Backend port