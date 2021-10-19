const bcrypt = require('bcrypt');

async function hash() {
    const username = await bcrypt.hash('sebbe', 10)
    const password = await bcrypt.hash('abc123', 10)

    console.log("username = " + username)

    console.log("password = " + password)
}

hash()