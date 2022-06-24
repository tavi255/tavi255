//
// Created by Tavi on 21.03.2021.
//

#include "validator.h"
#include "../exceptions/exceptions.h"
#include <cstring>
#include <stdexcept>

void Validator::validate(Tutorial t)
{
    string s="";
    if(t.get_title()=="")
        s+="Invalid title!\n";


    if(t.get_presenter()=="")
        s+="Invalid name!\n";

    else
    {
        string p=t.get_presenter();
        if(p[0]<'A' || p[0]>'Z')
            s+="Invalid name!\n";
    }

    string k=t.get_duration();

    char u[k.size()+1];
    char list[4][k.size()+1];

    strcpy(u,k.c_str());

    char *pp=strtok(u,":");

    int nr=0;


    while(pp)
    {
        nr++;

        if(nr>2)
        {
            s+="Invalid duration!\n";
            break;
        }

        strcpy(list[nr],pp);
        pp=strtok(NULL,":");


    }

    if(nr==2)
    {
        int n=atoi(list[1]);
        int m=atoi(list[2]);

        if(n==0 ||m==0)
            s+="Invalid duration!\n";
    }

    if(t.get_likes()<0)
        s+="Invalid number of likes!\n";

    string q=t.get_link();

    if(q.rfind("www.",0)!=0)
        s+="Invalid link!\n";

    else if(q.rfind('.')<=3 || q.rfind('.')==q.size()-1)
        s+="Invalid link!\n";


    if(s.size()>0)
        throw InvalidTutorial(s);



}

int Validator::in_repo(Tutorial t,Repo *h)
{
    for(int i=0;i<h->size();i++)
        if(h->operator[](i).get_link()==t.get_link())
            return i;
    return -1;
}

int Validator::in_repo_l(string l,Repo *h)
{
    for(int i=0;i<h->size();i++)
       if(h->operator[](i).get_link()==l)
           return i;
    return -1;
}