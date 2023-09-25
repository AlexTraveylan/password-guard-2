# Password Guard

Password Guard is a Next.js application that allows you to create a secure password vault with a unique master password. With this application, you can create, edit, and delete your passwords. It also includes features for generating strong passwords and checking the strength of your existing passwords to ensure they are not part of data breaches. Additionally, Password Guard provides a sandbox environment for testing the application without the need for an account and features simple JWT-based authentication.

## Installation

To get started with Password Guard, follow these steps:

1.  Clone the repository:

    ```bash
    git clone git@github.com:AlexTraveylan/password-guard-2.git
    cd password-guard-2
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Create a `.env` file and add the required environment variables.

    ```bash
    NEXT_PUBLIC_SUPERMASTERSALT=
    DATABASE_URL=
    JWT_SECRET=
    JWT_REFRESH_SECRET=
    ```

4.  Set up your relational database.

5.  Start the application:

    ```bash
    npm run dev
    ```

## Features

- **Password Vault**: Create a secure vault with a unique master password.
- **Password Management**: Add, edit, and delete passwords in the vault.
- **Password Generator**: Generate strong and secure passwords.
- **Password Strength Checker**: Verify password strength and check for data breaches.
- **Sandbox Mode**: Test the application without the need for an account.
- **JWT Authentication**: Simple JWT-based authentication for user access.

## Contributing

We welcome contributions! Feel free to open issues, fork the repository, and submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
