//
// Created by Tavi on 08.04.2021.
//
#include "Repo.h"
#include <fstream>
using namespace std;

Repo::Repo(const string &watchlist): watchlist{watchlist}
{

    v.clear();

}

int Repo::size()
{
    return v.size();
}



void Repo::push(Tutorial elem)
{
    v.push_back(elem);
}


void Repo::remove(int ind)
{
    if(size()<=ind)
        throw runtime_error("Invalid index!\n");
    v.erase(v.begin()+ind);
}


Tutorial Repo::operator [](int ind)
{
    return v[ind];
}


void Repo::update(int ind,Tutorial elem)
{
    v[ind]=elem;
}

vector<Tutorial>Repo::get_all() {

    return v;
}

void Repo::store()
{
    if(watchlist.find("html")!=string::npos)
        store_html();
    else
        store_csv();

}

void Repo::store_csv()
{
    ofstream out(watchlist);

    for(auto &t:v)
        out<<t.get_title()<<","<<t.get_presenter()<<","<<t.get_duration()<<","<<t.get_likes()<<","<<t.get_link()<<"\n";


}


void Repo::store_html() {
    ofstream out(watchlist);

    out << "<!DOCTYPE html>    <!-- write this exactly as it is here -->\n"
           "<html> <!-- write this exactly as it is here -->\n"
           "<head> <!--  write this exactly as it is here -->\n"
           "    <title>Playlist</title> <!-- replace “Playlist” with the title for your HTML -->\n"
           "</head> <!-- write this exactly as it is here (close head tag) -->\n"
           "<body> <!-- write this exactly as it is here -->\n"
           "<table border=\"1\"> <!-- write this exactly as it is here -->\n"
           "    <tr> <!-- tr = table row; 1 row for each entity -->\n"
           "        <td>Title</td> <!-- td = table data; 1 td for each attribute of the entity -->\n"
           "        <td>Presenter</td>\n"
           "        <td>Duration</td>\n"
           "        <td>Likes</td>\n"
           "        <td>Link</td>\n"
           "    </tr>\n";


    for(auto &elem:v)
    {
        out<<"<tr>\n"<<"<td>"<<elem.get_title()<<"</td>\n";
        out<<"<td>"<<elem.get_presenter()<<"</td>\n";
        out<<"<td>"<<elem.get_duration()<<"</td>\n";
        out<<"<td>"<<elem.get_likes()<<"</td>\n";
        out<<"<td>"<<"<a href="<<'"'<<"https://"<<elem.get_link()<<'"'<<">Link</a>"<<"</td>\n";
        out<<"</tr>\n";
    }



    out<<"</table>\n"
         "</body>\n"
         "</html>\n";



}

Repo::~Repo() {}

