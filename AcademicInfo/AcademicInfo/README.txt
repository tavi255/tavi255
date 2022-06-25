#System	for	Managing	Academic	Information

##Technologies

- Database server: Microsoft Sql
- Programming languages:
  - Front-end: Angular
  - Back-end: ASP.NET Core 6.0 
 
 
 
##List of detailed features:

- Login page:
- Contains a login form composed of:
  - 2 text inputs, one for the account id, and one for password
  - 1 button for login

- Template page:
  - This page composes the design of all pages
  - Features a  vertical navbar.


- Student profile info page:
  - In this page a student can update his name,department,year and group.
  When the year is changed all courses from the previous year are deleted and the new ones are automatically added.
  
- Student courses tab:
  - On this page a student can view all his courses.
  
- Student optional courses tab:
  - On this page a student can view all his optional courses.
  

- Professor profile info page:
 - On this page a professor can update his name and department.When the department is changed all the courses that he  teach will be removed.


- Proposed optionals tab
  - On this page a teacher can propose a new optional.The maximum number of optionals that a teacher can propose is 2.When the teacher tries to propose more than 2 optionals an error message is displayed on the screen.The list of optional courses proposed by the teacher is displayed on the bottom of the screen.
  
 - Grade students tab
  - On this page the teachers can grade students that are enrolled to their courses.First,a menu with all the courses that the teacher teaches is displayed.The teacher choses the course and a list of all students enrolled to that course is displayed.Then he clicks on a student a menu with a grade and weight is displayed.

- Chief Professor optionals tab:
  - Only accessible by the Chief of Department Professor
  - On this tab they can see the list of proposed optionals, set a max number of students that can attend each course, and approve  an optional.
  - Presents: a table with all the optional courses. In this tab the chief teacher can set the no of students and can approve the course.



- Staff View Students tab:
  - In this tab the staff can filter and sort the students by department, year, group, average grade, course
  - Presents a table that displays the filtered students and their average grade.

- Staff Add student page:
  - In this tab the staff can create account for students.After the account is created the student recives his/her credentials and is automaticly enrolled in the corresponding year ( all mandatory courses from the corresponding year are automatically added) 


- Staff profile page:
  - Features a window where the staff can update his/her name.



