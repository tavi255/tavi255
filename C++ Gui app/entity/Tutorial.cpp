//
// Created by Tavi on 20.03.2021.
//

#include "Tutorial.h"
#include <iostream>
#include <cstring>
#include <sstream>


Tutorial::Tutorial() {

    title.clear();
    presenter.clear();
    duration.clear();
    nrlikes=0;
    link.clear();

}
Tutorial::Tutorial(std::string &title,std::string &presenter,std::string &duration,int &nr_likes,std::string &link)
{
    this->title=title;
    this->presenter=presenter;
    this->duration=duration;
    this->nrlikes=nr_likes;
    this->link=link;
}
const std::string &Tutorial::get_title() const
{
    return title;
}
const std::string &Tutorial::get_presenter() const
{
    return presenter;
}
const std::string &Tutorial::get_link() const
{
    return link;
}
const std::string &Tutorial::get_duration() const
{
    return duration;
}
int Tutorial::get_likes() const
{
    return nrlikes;
}

void Tutorial::set_likes(int nr)
{
    nrlikes=nr;
}

std::ostream & operator <<(std::ostream &os,const Tutorial &k)
{
    os<<k.title<<";"<<k.presenter<<";"<<k.duration<<";"<<k.nrlikes<<";"<<k.link;
}

std::istream &operator >>(std::istream &is,Tutorial &k)
{


    is>>k.title;
    is>>k.presenter;
    is>>k.duration;

    is>>k.nrlikes;

    is>>k.link;

}

std::string Tutorial::to_string() {

    std::stringstream ss;
    std::string likes;
    ss<<nrlikes;
    ss>>likes;

    return "Title: " + title + " Presenter: " + presenter + " Duration: " + duration + " Nr_likes: " + likes + " Link: " + link;

}






