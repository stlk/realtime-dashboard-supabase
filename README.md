# Realtime dashboard

This README provides essential information about setting up and running the Django project, which utilizes [Pipenv](https://pipenv.pypa.io/en/latest/) for managing dependencies and relies on a [Supabase](https://supabase.com) database for real-time functionality. Additionally, it includes instructions for setting up the front-end portion of the project, which is a Vite project with its own configuration.

Please follow the instructions below to get started with both the Django backend and the Vite frontend.

## Prerequisites

Before you begin, ensure you have the following prerequisites installed on your system:

- [Python](https://www.python.org/downloads/) (recommended version: Python 3.11)
- [Pipenv](https://pipenv.pypa.io/en/latest/)
- A Supabase account and a PostgreSQL database set up. Refer to the [Supabase Realtime documentation](https://supabase.com/docs/guides/realtime/postgres-changes) for guidance.
- [Node.js](https://nodejs.org/) (recommended LTS version)

## Getting Started with the Django Backend

1. Create a virtual environment using Pipenv and install project dependencies:

   ```bash
   pipenv install
   ```

2. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

   Make sure to edit the `.env` file and provide the necessary configuration details, including your Supabase database URL.

3. Apply database migrations:

   ```bash
   pipenv run python manage.py migrate
   ```

4. Initialize records table:

   ```bash
   pipenv run python manage.py populate_records
   ```

5. Start the Django development server:

   ```bash
   pipenv run python manage.py runserver
   ```

   Your Django project should now be running locally at `http://localhost:8000`.


6. Create django superuser:

   ```bash
   pipenv run python manage.py createsuperuser
   ```

   You can then go to `http://localhost:8000/admin` and edit some of the records.

## Getting Started with the Vite Frontend

1. Change into the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Create a virtual environment using Pipenv and install project dependencies:

   ```bash
   npm install
   ```

3. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file and provide any necessary configuration specific to the frontend.

4. Start the Vite development server:

   ```bash
   npm run dev
   ```


## Project Structure

- The Django project's main settings are located in the `settings.py` file.
- The project uses [dj-database-url](https://pypi.org/project/dj-database-url/) to read the `DATABASE_URL` from the environment, making it easier to manage database configurations.
- The frontend portion is located in the `frontend` directory, which contains a Vite project.

## Real-time Functionality

This Django project integrates with a Supabase database to provide real-time functionality. Ensure that you have set up your Supabase database and have configured the `DATABASE_URL` in your Django `.env` file correctly for this functionality to work.

## License

This project is licensed under the MIT License.
