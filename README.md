# Dypa's World
Hi everyone, welcome to **dypas-world/your-magic-world** project! This project was made to let people(me) track the movies, TV series, books, albums, etc. they have watched/read/listened to. To do this I've used some external APIs to gain the data to search, **Spring Boot** for the backend and **React** for the frontend(with Tailwind for styling).

### Little Note
Before continuing I care to say that this project was(of course) made to practice and learn, so the commented code won't be removed because it may be helpful for reference in the future. 
The most important thing is that if you have any feedback, both technical and non, *PLSSSSS* send your feedback in this little tiny [form](https://forms.gle/L8SgW2MwXBFPkBEf9). I really care about quality and improving so it would help me a lot, thanks.

## Application Flow
The application flow would be the following:
1. First the `user registers/logins`, which can be done easily with OAuth2(Google) or with a form;
2. Then the `user chooses the category` they're interested in, which are: movies, TV shows, animes, mangas, books and music albums. Games and comics are disabled because I couldn't find any good APIs;
3. After choosing the category the corresponding page will open, where `the user will see the entries they previously saved.` They can edit the entries rating and delete them;
4. To add an entry there are two buttons:
     `Add New` to search an entry, to then give it a rating, and save.
     `Add Custom` to add a custom entry in case they didn't find the one they were looking for. This is done by filling a short form.

## Backend APIs
There are three main controllers: **UserController**, **MediaEntryController** and **S3Controller**.

### User Controller
- `/register`, handles the user registration, using a Bcrypt password encoder(funniest part to learn imo);
- `/login`, handles the user authentication via form;
- `/user-info`, which is used by the frontend to check if the user is logged in. It works both with form logged user or OAuth2 user.

### MediaEntry Controller
- `/add`, simply adds a mediaEntry in the database, associating it with the logged in user;
- `/get-all-by-category-user`, returns a list of all the mediaEntries of the selected category to the user;
- `/update-rating`, updates the user rating of the selected mediaEntry;
- `/delete`, deletes the mediaEntry with the corrisponding id.

### S3Controller
- `/upload`, it upload the custom mediaEntry image to the S3 bucket. Necessary to create a custom entry from the user.

## Frontend Components
There are only two important pages to discuss: **App** and **MediaEntryPage**.
### APP
App has a method checkIfLoggedIn which returns a boolean that is passed to App's children. To create each category page, App loops through **categoriesData**, which contains the informations about the appearance(on the homepage) and the API used by each category.

### MediaEntryPage
MediaEntryPage uses the following props:
- `categoryName`, used to assign the category to a new mediaEntry;
- `headers, querySearchPrefix`, which are used to make the external API calls to search the data;
- `searchDataResultAdapter`, since each API is different from each other, this function tells us how to extract the needed data from the API call result;
- `mediaEntryFromApiAdapter`, as said before, since each API is different from each other, this function **adapts** the retrieved data to what the page needs to **map**, by creating an object which keys are the same for each category. This way it's not necessary to create a page for each category;
- `categoryName, categoryTitle, categoryBasedMessage`, these are used just to make the user understand which page they are on.

MediaEntry page has many React state elements, which are:
- `userMediaEntriesList`, used to display the mediaEntries the user has previously saved;
- `searchFormData`, the search bar content the user inserts for a new mediaEntry;
- `searchResults`, the results list of the user's query for a new mediaEntry;
- `searchFormMode, isSearchFormShown`, respectively the active mode of the searchForm(*search, add, addCustom or edit*) and a boolean that sets if the form is shown; 
- `newMediaEntryData`, the most important one, stores the data of a new mediaEntry to submit, both custom or from API;
- `mediaEntryToEdit`, the data of the existing mediaEntry the user chooses to edit(for rating only);
- `previewImageUrl`, needed to show the chosen image by the user for a new custom entry;

> [!NOTE]
> There are some things that are missing, like API tests, better responsive adaptation, etc. 
I know some of these aspects are important, but honestly I want to move on a new project. I've learned a lot from this one and going further atm feels so draining, so I prefer to start anew.
This doesn't mean the project is dead, just that I won't work on it for a while. So please still leave feedback on the form, it helps me a lot.

Thank you and have a wonderful day!  
Love,  
Dypa <3
