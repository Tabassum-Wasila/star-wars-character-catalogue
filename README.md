# SWAPI Character Catalog

This is a [Next.js](https://nextjs.org) project that displays a catalog of Star Wars characters using data from the [SWAPI](https://swapi.dev) API. The project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Installation

First, install the dependencies:

```bash
npm install
# or
yarn install

```
### Running the Development Server

Then, run the development server:

```bash
npm run dev
# or
yarn dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Contains the main application code.
  - `character/[id]/page.js`: Displays the details of a specific character.
  - `components/`: Contains reusable components like `Navbar` and `CharacterCards`.
  - `globals.css`: Global CSS styles.
  - `page.js`: Home page that lists all characters.
- `public/`: Contains public assets like images.
- `tailwind.config.mjs`: Tailwind CSS configuration.
- `package.json`: Project dependencies and scripts.

## API Fetching

The project fetches data from the SWAPI API using the `axios` library. The data fetching is done in the following components:

- [`app/page.js`](app/page.js): Fetches the list of characters from the SWAPI API and stores them in a state variable. The data is fetched in a loop to handle pagination from the API.
- [`app/character/[id]/page.js`](app/character/[id]/page.js): Fetches the details of a specific character, including their homeworld and films, using the character ID from the URL parameters.

## Pagination

Pagination is implemented in the [`CharacterCards`](app/components/CharacterCards.js) component. The component displays a subset of characters based on the current page and the total number of characters. The pagination controls allow the user to navigate between pages.

## Search

The search functionality is implemented in the [`app/page.js`](app/page.js) component. The search input filters the list of characters based on the search term entered by the user. The filtering is done using a `useEffect` hook that updates the filtered list of characters whenever the search term changes.

To improve performance, the search input is debounced. This means that the search function is delayed by 500ms to prevent it from being called too frequently. This is implemented using the `setTimeout` function inside `useEffect`.


## Additional Features and Improvements

- **Responsive Design**: The project uses Tailwind CSS for responsive design and styling.
- **Dynamic Page Titles**: The page titles are dynamically updated based on the character details.
- **Loading State**: A loading state is displayed while the character data is being fetched.
- **Error Handling**: Basic error handling is implemented to log errors during data fetching.