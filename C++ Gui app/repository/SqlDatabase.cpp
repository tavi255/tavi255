////
//// Created by Tavi on 17.04.2021.
////
//
//#include <iostream>
//#include "SqlDatabase.h"
//#include <sstream>
//
//using namespace std;
//
//SqlDatabase::SqlDatabase(const string &watchlist,MYSQL *connection):Repo{watchlist},connection{connection}
//{
//    if(!connection)
//        throw runtime_error("No connection!\n");
//
//    //state=mysql_query(connection, "select * from Tutorial");
//
////    if(state!=0)
////        throw runtime_error("Error reading the data base!\n");
//
//}
//
//void SqlDatabase::read_database()
//{
//    v.clear();
//
//
//    MYSQL_ROW row;
//
//    mysql_query(connection, "select * from Tutorial");
//    MYSQL_RES *res=mysql_store_result(connection);
//
//
//    string title,presenter,duration,link;
//    int nr_likes;
//
//
//    while((row=mysql_fetch_row(res))!=NULL)
//    {
//        title=row[0];
//        presenter=row[1];
//        duration=row[2];
//        nr_likes=atoi(row[3]);
//        link=row[4];
//
//        Tutorial t(title,presenter,duration,nr_likes,link);
//        v.push_back(t);
//
//
//    }
//
//    mysql_free_result(res);
//
//
//}
//
//void SqlDatabase::write_database(Tutorial &t)
//{
//    string title,presenter,duration,link;
//    int nr_likes;
//
//    stringstream ss;
//    ss << t.get_likes();
//
//    string likesString = ss.str();
//
//
//    string insert="INSERT INTO Tutorial (Title, Presenter, Duration, NrLikes, Link) VALUES ( '"+t.get_title()+"', '"+t.get_presenter()+"', '"+t.get_duration()+"', '"+likesString+"', '"+t.get_link()+"')";
//
//    int state=mysql_query(connection, insert.c_str());
//
//
//
//    if(state!=0)
//    {
//        cout<<mysql_error(connection)<<"\n";
//    }
//
//
//}
//
//Tutorial SqlDatabase::operator [](int ind)
//{
//    read_database();
//    if(ind>=v.size())
//        throw runtime_error("Invalid index!\n");
//
//    return v[ind];
//}
//
//
//void SqlDatabase::push(Tutorial elem)
//{
//
//    write_database(elem);
//}
//
//
//void SqlDatabase::update(int ind,Tutorial elem)
//{
//
//    int nr_likes;
//
//    stringstream ss;
//    ss << elem.get_likes();
//
//    string likesString = ss.str();
//
//    string link=elem.get_link();
//
//    string update="UPDATE Tutorial SET Title = '"+elem.get_title()+"' WHERE Link = '"+link+"'";
//    mysql_query(connection,update.c_str());
//
//    update="UPDATE Tutorial SET Presenter = '"+elem.get_presenter()+"' WHERE Link = '"+link+"'";
//
//    mysql_query(connection,update.c_str());
//
//    update="UPDATE Tutorial SET Duration = '"+elem.get_duration()+"' WHERE Link = '"+link+"'";
//
//    mysql_query(connection,update.c_str());
//
//    update="UPDATE Tutorial SET NrLikes = '"+likesString+"' WHERE Link = '"+link+"'";
//
//    mysql_query(connection,update.c_str());
//
//
//
//}
//
//
//
//void SqlDatabase::remove(int ind)
//{
//
//    read_database();
//
//    string link=v[ind].get_link();
//
//    string command="DELETE FROM Tutorial WHERE Link = '"+link+"'";
//
//    int state=mysql_query(connection, command.c_str());
//
//    if(state!=0)
//    {
//        cout<<mysql_error(connection);
//    }
//
//}
//
//
//int SqlDatabase::size() {
//
//    read_database();
//
//    return v.size();
//
//}
//
//vector<Tutorial> SqlDatabase::get_all()
//{
//
//    read_database();
//    return v;
//}
//
//
//SqlDatabase::~SqlDatabase()
//{
//    mysql_close(connection);
//}