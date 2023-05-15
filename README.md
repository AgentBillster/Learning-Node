# Backend for Nexus



## Endpoints
- [/api/auth](#/api/auth)
- [/api/books](#/api/books)
- [/api/reviews](#/api/reviews)
- [/api/users](#/api/users)
- [/api/wishlist](#/api/wishlist)

  ### /api/auth<a name="/api/auth"></a>
  | Method | Endpoint | Requires | Returns | Description |
  | ------ |:--------:|:--------:|:-----------:| -------:|
  | POST   | /login    | username, password | message: 'You are logged in', token, user_id | Used to login |
  | POST   | /register | name, username, password | 201 | Used to register |

  ### /api/books<a name="/api/books"></a>
  | Method | Endpoint | Requires | Returns | Description |
  | ------ |:--------:|:--------:|:-----------:| -------:|
  | GET    | /    | nothing | Array of all books | Used to get all books |
  | GET    | /:id | id | Single book | Get a single book |
  | POST   | /    | title, publisher, license, authors | New book | Adds a new book |
  | PUT    | /:id | id, title, publisher, license | Updated book | Updates an existing book |
  | DELETE | /:id | id | 204 | Deletes an existing book |
    - #### Data Structure
    ```javascript
     {
    "id": 1,
    "title": "Prealgebra",
    "publisher": "OpenStax",
    "license": "License v4.0",
    "access_link": "https://openstax.org/details/books/prealgebra",
    "thumbnail": "https://d3bxy9euw4e147.cloudfront.net/oscms-prodcms/media/documents/prealgebra_1.svg",
    "description": "Prealgebra is designed to meet scope and sequence requirements for a one-semester prealgebra course. The book’s organization makes it easy to adapt to a variety of course syllabi. The text introduces the fundamental concepts of algebra while addressing the needs of students with diverse backgrounds and learning styles. Each topic builds upon previously developed material to demonstrate the cohesiveness and structure of mathematics.",
    "tag": "Math",
    "reviews": [
      {
        "id": 1,
        "review": "Very detailed and thorough, the explanations in this book helped me understand JS. Finding this resource was like taking a breath of fresh air.",
        "stars": 5,
        "username": "admin",
        "name": "Henry Blevins"
      }
    ],
    "authors": [
      {
        "id": 1,
        "name": "Lynn Marecek"
      },
      {
        "id": 2,
        "name": "MaryAnne Anthony-Smith"
      }
    ],
    "stars": 5
  }
    ```

  ### /api/reviews<a name="/api/reviews"></a>
  | Method | Endpoint | Requires | Returns | Description |
  | ------ |:--------:|:--------:|:-----------:| -------:|
  | GET    | /    | nothing | Array of all reviews | Used to get all reviews |
  | POST   | /    | review, reviewer_id, book_id, stars | 201 | Adds a new review |
  | PUT    | /:id | id, review, reviewer_id, book_id, stars | Updated review | Updates an existing review |
  | DELETE | /:id | id | 204 | Deletes an existing review |
    - #### Data Structure
    ```javascript
    {
      id: 0,
      review: "",
      stars: 3,
      reviewer_id: 1,
      book_id: 2,
    }
    ```

  ### /api/users<a name="/api/users"></a>
  | Method | Endpoint | Requires | Returns | Description |
  | ------ |:--------:|:--------:|:-----------:| -------:|
  | GET    | /    | nothing | Array of all users | Used to get all users |
  | GET | /:id | id | Single user | Get a single user with its wishlist |
    - ### Data Structure
    ```javascript
    {
      id: 0,
      name: "John Doe",
      username: "jdoe1",
    }
    ```
    - GET user
    ```javascript
    {
        "id": 1,
        "name": "Henry Blevins",
        "username": "admin",
        "password": "$2a$16$zSuXI2ZzPhhhOSKhJguf.Oor37uO9BnPNbTPK7.Q6ILxnlyoJJYie",
        "books": [
            {
            "id": 1,
            "title": "Prealgebra",
            "publisher": "OpenStax",
            "license": "License v4.0",
            "access_link": "https://openstax.org/details/books/prealgebra",
            "thumbnail": "https://d3bxy9euw4e147.cloudfront.net/oscms-prodcms/media/documents/prealgebra_1.svg",
            "description": "Prealgebra is designed to meet scope and sequence requirements for a one-semester prealgebra course. The book’s organization makes it easy to adapt to a variety of course syllabi. The text introduces the fundamental concepts of algebra while addressing the needs of students with diverse backgrounds and learning styles. Each topic builds upon previously developed material to demonstrate the cohesiveness and structure of mathematics.",
            "tag": "Math",
            "reviews": [
                {
                "id": 1,
                "review": "Very detailed and thorough, the explanations in this book helped me understand JS. Finding this resource was like taking a breath of fresh air.",
                "stars": 5,
                "username": "admin",
                "name": "Henry Blevins"
                },
                {
                "id": 12,
                "review": "123",
                "stars": 4,
                "username": "melqui",
                "name": "melqui"
                }
            ],
            "authors": [
                {
                "id": 1,
                "name": "Lynn Marecek"
                },
                {
                "id": 2,
                "name": "MaryAnne Anthony-Smith"
                }
            ],
            "stars": 4.5
            },
            {
            "id": 2,
            "title": "Precalculus",
            "publisher": "OpenStax",
            "license": "License v4.0",
            "access_link": "https://openstax.org/details/books/precalculus",
            "thumbnail": "https://d3bxy9euw4e147.cloudfront.net/oscms-prodcms/media/documents/precalculus.svg",
            "description": "Precalculus is adaptable and designed to fit the needs of a variety of precalculus courses. It is a comprehensive text that covers more ground than a typical one- or two-semester college-level precalculus course. The content is organized by clearly-defined learning objectives and includes worked examples that demonstrate problem-solving approaches in an accessible way.",
            "tag": "Math",
            "reviews": [
                {
                "id": 2,
                "review": "I really appreciate the pragmatic approach to REST API's. The book really helped my understanding of REST and web API design in general. Easy read.",
                "stars": 4,
                "username": "admin",
                "name": "Henry Blevins"
                }
            ],
            "authors": [
                {
                "id": 3,
                "name": "Jay Abramson"
                }
            ],
            "stars": 4
            }
        ]
    }
    ```

  ### /api/wishlist<a name="/api/wishlist"></a>
  | Method | Endpoint | Requires | Returns | Description |
  | ------ |:--------:|:--------:|:-----------:| -------:|
  | GET    | /    | nothing     | Array of all users and their wishlist | Used to get all wishlists |
  | POST   | /    | book_id, user_id | 201 | Adds a new item |
  | DELETE | /:id | id | 204 | Deletes an existing item |
    - ### Data Structure
    ```javascript
    {
        id: 1,
        book_id: 1,
        user_id: 1
    }
    ```
