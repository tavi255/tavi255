//
// Created by Tavi on 20.03.2021.
//

#ifndef A45_TAVI255_TUTORIAL_H
#define A45_TAVI255_TUTORIAL_H

#include <string>
//using namespace std;

class Tutorial {

private:
    std::string title,presenter,link,duration;
    int nrlikes;

public:

    Tutorial(std::string &title,std::string &presenter,std::string &duration,int &nr_likes,std::string &link);

    Tutorial();

    const std::string &get_title() const;

    const std::string &get_presenter() const;

    const std::string &get_link() const;

    const std::string &get_duration() const;

    int get_likes() const;

    void set_likes(int nr);

    std::string to_string();



    friend std::ostream & operator <<(std::ostream &os,const Tutorial &k);
    friend std::istream &operator >>(std::istream &is,Tutorial &k);






};


#endif //A45_TAVI255_TUTORIAL_H
