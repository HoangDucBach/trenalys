export class UserDatabaseStatus {
    public static ERROR_EMAIL_EXISTS = new Error('Error: Email already exists in database');
    public static ERROR_USER_LOGIN = new Error('Error: Invalid credentials');

    public static SUCCESS_USER_CREATED = 'User created successfully';
    public static SUCCESS_USER_LOGIN = 'User login successful';
    public static SUCCESS_USER_VERIFIED = 'User verified successfully';
}