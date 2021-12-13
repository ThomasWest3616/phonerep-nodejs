import mysql2 from 'mysql2';

export var connection = mysql2.createConnection({
    host: "localhost",
    database: 'phonerepdb',
    user: 'root',
    password: 'password'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Database connected!');
})

