//
// Created by Tavi on 21.03.2021.
//

#include "generator.h"
#include <string>
#include <fstream>

using namespace std;

void generate(string &s,Repo &r)
{
    ofstream out(s);
    string title[]={"C++ Tutorial for Beginners - Full Course",
                    "C++ Programming Language Tutorial ",
                    "C++ Tutorial 2020",
                    "Introducere în programare - tutorial C++ - cursul 1",
                    "How to REALLY learn C++"};

    string presenter[]={"freeCodeCamp.org",
                                           "GeeksforGeeks","Derek Banas",
                                                           "Introducere în programare - tutorial C++ - cursul 1",
                                                           "The Cherno"};
    string duration[]={"12:45","2:28","2:21","15:52","8:12"};
    int nr_likes[]={132000,123,4900,2131,10000};
    string link[]={"www.youtube.com/watch?v=vLnPwxZdW4Y",
                   "www.youtube.com/watch?v=VcCRXrLFxyc",
                   "www.youtube.com/watch?v=6y0bp-mnYU0",
                   "www.youtube.com/watch?v=JjY9U9lu37I",
                   "www.youtube.com/watch?v=_zQqN5OYCCM"};

    for(int i=0;i<5;i++)
    {
        Tutorial t(title[i],presenter[i],duration[i],nr_likes[i],link[i]);
        r.push(t);

    }
}