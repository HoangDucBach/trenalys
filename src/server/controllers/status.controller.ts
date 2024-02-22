export class UserDatabaseStatus {
    public static ERROR_EMAIL_EXISTS = new Error('Error: Email already exists in database');
    public static ERROR_USER_LOGIN = new Error('Error: Invalid credentials');

    public static SUCCESS_USER_CREATED = 'User created successfully';
    public static SUCCESS_USER_LOGIN = 'User login successful';
    public static SUCCESS_USER_VERIFIED = 'User verified successfully';
}
export class TrendDatabaseStatus {
    public static ERROR_TREND_EXISTS = new Error('Error: Trend already exists in database');
    public static ERROR_TREND_CREATE = new Error('Error: Trend creation failed');

    public static SUCCESS_TREND_CREATED = 'Trend created successfully';
}