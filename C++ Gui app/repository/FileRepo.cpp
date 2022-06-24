//
// Created by Tavi on 10.04.2021.
//

#include "FileRepo.h"
#include <iostream>
#include <fstream>
#include <string>
#include <cstring>


using namespace std;


FileRepo::FileRepo(string &f,string &watchlist):Repo{watchlist}, file{f}
{

    v.clear();


}

void FileRepo::read_file() {


    v.clear();
    ifstream in(file);

    char s[101][1001];
    char s2[10][1001];

    int nr=0,nr2=0;

    while(in.get(s[nr++],1001))
        in.get();




    nr--;

    for(int i=0;i<nr;i++)
    {
        nr2=0;
        char *p=strtok(s[i],";");

        while(p!=NULL)
        {
            strcpy(s2[nr2++],p);
            p=strtok(NULL,";");
        }

        string s1,s_2,s3,s4;
        int nr_likes;

        s1=string(s2[0]);
        s_2=string(s2[1]);
        s3=string(s2[2]);
        s4=string(s2[4]);
        nr_likes=atoi(s2[3]);

        Tutorial t(s1,s_2,s3,nr_likes,s4);

        v.push_back(t);
    }



}

void FileRepo::write_file()
{
    ofstream out(file);
    for(int j=0;j<v.size();j++)
        out<<v[j]<<"\n";

}

void FileRepo::append(Tutorial t)
{
    ofstream out(file,ios_base::app);
    out<<t<<"\n";
}

int FileRepo::size()
{
    read_file();
    return v.size();
}


Tutorial FileRepo::operator [](int ind)
{
    read_file();
    if(v.size()<=ind)
        throw runtime_error("Invalid index!\n");

    return v[ind];
}

void FileRepo::push(Tutorial elem)
{
    read_file();
    v.push_back(elem);
    append(elem);
}

void FileRepo::update(int ind,Tutorial elem)
{
    read_file();
    v[ind]=elem;
    write_file();
}


void FileRepo::remove(int ind)
{
    read_file();
    v.erase(v.begin()+ind);
    write_file();

}



vector<Tutorial>FileRepo::get_all()
{
    read_file();
    return v;
}



