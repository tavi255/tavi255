//
// Created by Tavi on 21.03.2021.
//

#include "UI administrator.h"
#include <iostream>
#include <limits>

using namespace std;

Console::Console(administrator *services)
{
    this->services=services;
}

void Console::print_menu()
{
    cout<<"1.Add a new tutorial\n";
    cout<<"2.Update a tutorial\n";
    cout<<"3.Delete a tutorial\n";
    cout<<"4.Print all\n";
    cout<<"5.Exit\n";

}

void Console::add()
{

    string title,presenter,duration,link;
    int nr_likes;


    cout<<"Enter the title!\n";

    cin>>title;

    cout<<"Enter the presenter!\n";
    cin>>presenter;

    cout<<"Enter the duration!\n";
    cin>>duration;

    cout<<"Enter the number of likes!\n";


    cin>>nr_likes;

    if(!cin)
    {
        cout<<"Invalid data!\n";
        return;
    }



    cout<<"Enter the link!\n";


    cin>>link;


    services->add_tutorial(title,presenter,duration,nr_likes,link);

}
void Console::update()
{
    string title,presenter,duration,link;
    int nr_likes;


    cout<<"Enter the title!\n";

    cin>>title;

    cout<<"Enter the presenter!\n";
    cin>>presenter;

    cout<<"Enter the duration!\n";
    cin>>duration;

    cout<<"Enter the number of likes!\n";


    cin>>nr_likes;

    if(!cin)
    {
        cout<<"Invalid data!\n";
        return;
    }



    cout<<"Enter the link!\n";


    cin>>link;


    services->update_tutorial(title,presenter,duration,nr_likes,link);




}
void Console::remove()
{

    string l;
    cout<<"Enter the link!\n";
    cin>>l;
    services->delete_tutorial(l);

}
void Console::print_all()
{


    if(services->size()==0)
        cout<<"No elements in the array!\n";


    for(auto elem:services->get_all())
        cout<<elem<<"\n";




}


void Console::run_console()
{
    bool ok=1;

    while(ok)
    {
        try
        {
            int opt;
            print_menu();
            cin>>opt;

            switch (opt) {

                case 1:
                {
                    add();
                    break;
                }
                case 2:
                {
                    update();
                    break;
                }
                case 3:
                {
                    remove();
                    break;
                }
                case 4:
                {
                    print_all();
                    break;
                }
                case 5:
                {
                    cout<<"Bye\n";
                    ok=0;
                    break;
                }
                default:
                {
                    cout<<"Invalid command!\n";
                    break;
                }

            }

        }

        catch (exception &ex)
        {
            cout<<ex.what()<<"\n";
        }

    }
}