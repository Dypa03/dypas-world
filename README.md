Hi everyone, welcome to dypas-world/your-magic-world project! This project was made to let people(me) track the movies, TV series, books, albums, etc. they have watched/read/listened to. To do this I've used some external APIs to gain the data to search, Spring Boot for the backend and React for the frontend.

Before continuing I care to say that this project was(of course) made to practice and learn, so the commented code won't be removed because it may be helpful for reference in the future.
The most important thing is that if you have any feedback, both technical and non, PLSSSSS send your feedback in this little tiny form: https://forms.gle/L8SgW2MwXBFPkBEf9 
I really care about quality and improving so it would help me a lot, thanks.

The user action flow would be the following:
1. First the user register/logins, which can be done easily with OAuth2(Google);
2. Then the user chooses the category he's interested in, which are: movies, TV shows, animes, mangas, books and musci albums. Games and comics are disabled because I couldn't find any good APIs;
3. After choosing the category the corrispective page will open which the user will see the entries he previously saved. He can edit the entries rating and delete them;
4. To add an entry there are two buttons:
     "Add New" to search an entry, to then give it a rating, and save.
     "Add Custom" to add a custom entry in case they didn't find the one they were looking for. This is done by filling a short form.

Backend APIs:
