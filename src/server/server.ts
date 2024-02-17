import {UserManager} from "./models/user.model";
import {client} from "./models/connect.model";
async function testUserFunctions() {
    await UserManager.createUser('example@email.com', 'Example User', 'password123');
    await UserManager.getAllUsers();
    client.end().then(r => console.log('Disconnected from database'));
}
testUserFunctions();