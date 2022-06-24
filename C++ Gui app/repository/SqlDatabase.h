////
//// Created by Tavi on 17.04.2021.
////
//
//#ifndef A45_TAVI255_SQLDATABASE_H
//#define A45_TAVI255_SQLDATABASE_H
//
//
//#include <mysql/mysql.h>
//#include "Repo.h"
//
//class SqlDatabase: public Repo {
//
//    private :
//    MYSQL *connection;
//    int state;
//
//    void read_database();
//    void write_database(Tutorial &t);
//
//
//public:
//
//    SqlDatabase(const string&watchlist,MYSQL *connection);
//
//    int size() override;
//    //return the number of rows in the database
//
//    vector<Tutorial>get_all() override;
//    //returns all the elements from the database
//
//    Tutorial operator [](int ind) override;
//    //returns the element on index ind from the database
//
//    void push(Tutorial elem) override;
//    //adds an element in the array
//    //param elem:an element of type T
//
//    void update(int ind,Tutorial elem) override;
//    //updates the number of likes of a Tutorial
//    //param elem (current element)
//    //param ind the index where the element will be inserted
//
//
//    void remove(int ind) override;
//    //removes an element from the array
//    //param ind(the index if the elem)
//
//
//    ~SqlDatabase() override;
//
//
//
//
//
//};
//
//
//#endif //A45_TAVI255_SQLDATABASE_H
