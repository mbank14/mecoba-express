module.exports = {
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite' // Path untuk database SQLite
    },
    useNullAsDefault: true // Menghindari warning pada SQLite
  };
  