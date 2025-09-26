const bcrypt = require("bcrypt");

(async () => {
    const password = "helloooo"; // Change to your admin password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);
})();
