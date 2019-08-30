
## Emails app
This is an emails editor built with Laravel and React JS

## How to run the project

- Clone it from the repository.
- In the terminal run `composer update` to install the laravel dependencies.
- Create a MySQL database.
- Set up `.env` file to connect with the database, it's pointing to localhost by default.
- Type on the terminal `php artisan migrate` to run the migrations.
- Define React by default running from the terminal: `php artisan preset react`.
- In the terminal run `npm install` to install the React dependencies.
- Run `npm run dev` to set up React modules (Email form).

## Git structure

- `master` is the main branch (prod).
- `dev` is a branch for develop env.
- Each feature has its own branch created from `dev`
- `dev` is merged into `master` 